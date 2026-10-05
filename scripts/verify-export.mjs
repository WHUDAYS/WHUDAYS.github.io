import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { parse } from 'parse5';
import { load, search } from 'zbsearch';
import { staticClient } from 'fumadocs-core/search/client/orama-static';
import { createSearchDatabase } from '../lib/search-tokenizer.js';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const origin = 'https://whudays.org';
const decodeURL = (text) => { try { return decodeURIComponent(text); } catch { return text; } };

/** Read rendered HTML once for links, anchors and searchable member cards. */
export function inspectHtml(html) {
  const tags = [], ids = new Set(), anchors = new Map(), members = [];
  const attrs = node => Object.fromEntries((node.attrs ?? []).map(attr => [attr.name, attr.value]));
  const classes = (node, name) => (attrs(node).class ?? '').split(/\s+/).includes(name);
  const excluded = node => ['script', 'style', 'svg', 'button'].includes(node.tagName)
    || classes(node, 'sr-only') || attrs(node).hidden !== undefined || attrs(node)['aria-hidden'] === 'true'
    || /(?:^|;)\s*(?:display\s*:\s*none|visibility\s*:\s*hidden)/i.test(attrs(node).style ?? '');
  const textOf = node => excluded(node) ? '' : node.nodeName === '#text' ? node.value
    : (node.childNodes ?? []).map(textOf).join(' ').replace(/\s+/g, ' ').trim();
  function visit(node, visible = true, inContent = false, target) {
    const attributes = attrs(node);
    if (node.tagName) tags.push({ tag: node.tagName, ...attributes });
    if (attributes.id) ids.add(attributes.id);
    if (node.tagName === 'a' && attributes.name) ids.add(attributes.name);
    visible &&= !excluded(node);
    inContent ||= attributes['data-search-content'] !== undefined;
    target = attributes.id ?? target;
    if (visible && inContent) {
      if (attributes.id) anchors.set(attributes.id, textOf(node));
      if (classes(node, 'member-name') || classes(node, 'name') && classes(node.parentNode, 'data')) {
        const name = textOf(node);
        if (name) members.push({ name, id: target });
      }
    }
    for (const child of node.childNodes ?? []) visit(child, visible, inContent, target);
  }
  visit(parse(html));
  return { tags, ids, anchors, members,
    sources: tags.flatMap(tag => [tag.src, tag.poster, tag.tag === 'object' ? tag.data : undefined]).filter(Boolean) };
}

/** Validate the framework's exported index; never rebuild or overwrite it. */
async function verifySearch(outDir) {
  const serialized = readFileSync(path.join(outDir, 'search-index.json'), 'utf8');
  const db = await createSearchDatabase();
  load(db, JSON.parse(serialized));
  const records = await search(db, { term: '', limit: 100000 });
  if (records.hits.length !== records.count) throw new Error('Search index exceeds verification limit');
  const pages = new Map(), members = new Map();
  for (const { document } of records.hits.filter(hit => hit.document.type === 'page')) {
    const url = decodeURI(document.url).replace(/\/$/, '') || '/';
    const file = outputFile(outDir, url);
    if (!file) throw new Error(`Search page does not exist: ${url}`);
    const rendered = inspectHtml(readFileSync(file, 'utf8'));
    pages.set(url, rendered);
    for (const { name, id } of rendered.members) {
      if (!id) throw new Error(`Member has no search target: ${name} at ${url}`);
      if (!members.has(name)) members.set(name, new Set());
      members.get(name).add(`${url}#${id}`);
    }
  }
  for (const { document } of records.hits) {
    const [url, id] = decodeURI(document.url).split('#');
    if (id && !pages.get(url.replace(/\/$/, '') || '/')?.anchors.has(id)) {
      throw new Error(`Search target is missing or hidden: ${document.url}`);
    }
  }
  const client = staticClient({ from: `data:application/json;base64,${Buffer.from(serialized).toString('base64')}`, initDB: createSearchDatabase });
  for (const [name, targets] of members) {
    if (!(await client.search(name)).some(hit => hit.type !== 'page' && targets.has(decodeURI(hit.url).replace('/#', '#')))) {
      throw new Error(`Search cannot locate member card: ${name}`);
    }
  }
  for (const [query, page] of [['⑨', '/about/hq/2013'], ['九尾晨', '/about/hq/2025'], ['拝啓 未来の私', '/about/hq/2025'],
    ['邪恶的人看啥都是邪恶的', '/about/introduction'], ['绘画苦手', '/group/vocaloid-utau-fans'],
    ['WHUDAYS-放课后', '/about/annual-group'], ['初音未来', '/group/vocaloid-utau-fans/events/miku16th'],
    ['电脑端', '/about'], ['页面选项里可以切换浅色', '/about']]) {
    const hits = await client.search(query);
    if (!hits.some(hit => {
      const [url, id] = decodeURI(hit.url).split('#');
      return id && url.replace(/\/$/, '') === page && pages.get(page)?.anchors.get(id)?.includes(query);
    })) throw new Error(`Search cannot locate content: ${query} at ${page}`);
  }
  console.log(`Fumadocs search verified: ${pages.size} pages, ${records.count} records, ${members.size} distinct member names and 9 content queries.`);
}

export function outputFile(outDir, pathname) {
  const decoded = decodeURL(pathname);
  const relative = decoded.replace(/^\/+/, '');
  const exact = path.resolve(outDir, relative);
  if (!exact.startsWith(path.resolve(outDir) + path.sep) && exact !== path.resolve(outDir)) return undefined;
  const candidates = decoded.endsWith('/') ? [path.join(exact, 'index.html')] : [exact, `${exact}.html`, path.join(exact, 'index.html')];
  return candidates.find(file => existsSync(file) && statSync(file).isFile());
}

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)]);
}

export function verifyExport({ outDir = path.join(repoRoot, 'out') } = {}) {
  const errors = [];
  const fail = (kind, source, message) => errors.push({ kind, source, message });
  if (!existsSync(outDir)) return { passed: false, errors: [{ kind: 'build', source: outDir, message: 'Static export is missing. Run pnpm build first.' }], counts: {} };
  const parsed = new Map();
  const inspect = (file) => {
    if (!parsed.has(file)) parsed.set(file, inspectHtml(readFileSync(file, 'utf8')));
    return parsed.get(file);
  };
  // Inspect every exported HTML document, including aliases and custom/error pages.
  const htmlFiles = walk(outDir).filter(file => file.endsWith('.html'));
  let checkedLinks = 0;
  for (const file of htmlFiles) {
    const route = '/' + path.relative(outDir, file).split(path.sep).join('/').replace(/index\.html$/, '');
    const document = inspect(file);
    const references = [
      ...document.tags.filter(tag => tag.href && ['a', 'link'].includes(tag.tag) && !['canonical', 'preconnect', 'dns-prefetch'].includes(tag.rel)).map(tag => ({ value: tag.href, fragment: tag.tag === 'a' })),
      ...document.sources.map(value => ({ value, fragment: false })),
    ];
    for (const reference of references) {
      let url;
      try { url = new URL(reference.value, `${origin}${route}`); } catch { continue; }
      if (url.origin !== origin || !['http:', 'https:'].includes(url.protocol)) continue;
      checkedLinks++;
      const target = outputFile(outDir, url.pathname);
      if (!target) { fail('dead-link', route, `Missing internal target ${reference.value}`); continue; }
      if (reference.fragment && url.hash && target.endsWith('.html') && !/^#:~:text=/.test(url.hash)) {
        const fragment = decodeURL(url.hash.slice(1));
        if (!inspect(target).ids.has(fragment)) fail('dead-fragment', route, `Missing fragment target ${reference.value}`);
      }
    }
  }
  return { passed: errors.length === 0, counts: { htmlFiles: htmlFiles.length, checkedInternalReferences: checkedLinks }, errors };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const outIndex = process.argv.indexOf('--out');
  const reportIndex = process.argv.indexOf('--report');
  const outDir = outIndex >= 0 ? path.resolve(process.argv[outIndex + 1]) : path.join(repoRoot, 'out');
  const report = verifyExport({ outDir });
  if (report.passed) await verifySearch(outDir);
  if (reportIndex >= 0) writeFileSync(path.resolve(process.argv[reportIndex + 1]), JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify(report.counts, null, 2));
  for (const error of report.errors) console.error(`[${error.kind}] ${error.source}: ${error.message}`);
  console.log(report.passed ? 'Static export checks passed.' : `Static export checks failed: ${report.errors.length} error(s).`);
  process.exitCode = report.passed ? 0 : 1;
}
