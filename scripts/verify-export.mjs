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
  for (const [tag, query] of [['about', '九尾晨'], ['activity', '春日'], ['department', '演音'],
    ['group', '初音'], ['message-box', '漫协'], ['maintainer', '贡献']]) {
    const filtered = staticClient({ from: `data:application/json;base64,${Buffer.from(serialized).toString('base64')}`, initDB: createSearchDatabase, tag });
    const hits = await filtered.search(query);
    if (!hits.length || hits.some(hit => new URL(hit.url, origin).pathname.split('/')[1] !== tag)) {
      throw new Error(`Search section filter failed: ${tag} (${query})`);
    }
  }
  console.log(`Fumadocs search verified: ${pages.size} pages, ${records.count} records, ${members.size} distinct member names, 9 content queries and 6 section filters.`);
}

/** Check discoverability in the actual static output, including component text. */
function verifyDiscovery(outDir) {
  const index = readFileSync(path.join(outDir, 'llms.txt'), 'utf8');
  const full = readFileSync(path.join(outDir, 'llms-full.txt'), 'utf8');
  const sitemap = new Set([...readFileSync(path.join(outDir, 'sitemap.xml'), 'utf8').matchAll(/<loc>(.*?)<\/loc>/g)]
    .map(match => new URL(match[1].replace(/&apos;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&')).href));
  const descriptions = new Set();
  const images = new Set();
  let breadcrumbs = 0;
  const files = walk(path.join(repoRoot, 'docs')).filter(file => file.endsWith('.mdx'));
  if (!index.startsWith('# 武汉大学动漫协会') || !index.includes(`${origin}/llms-full.txt`)) throw new Error('LLM index is missing site information');
  for (const file of files) {
    const source = path.relative(path.join(repoRoot, 'docs'), file).split(path.sep).join('/');
    const canonical = '/' + source.replace(/index\.mdx$/, '').replace(/\.mdx$/, '');
    const basename = canonical.replace(/\/$/, '') || '/index';
    const markdownPath = `/markdown${basename}.txt`;
    const imagePath = `/og${basename}.png`;
    const html = readFileSync(outputFile(outDir, canonical), 'utf8');
    const { tags, members } = inspectHtml(html);
    const meta = (name) => tags.find(tag => tag.tag === 'meta' && (tag.name === name || tag.property === name))?.content;
    const description = meta('description');
    if (!description || description.length < 10 || descriptions.has(description)) throw new Error(`Missing or duplicated description: ${canonical}`);
    descriptions.add(description);
    for (const name of ['og:description', 'twitter:description']) {
      if (meta(name) !== description) throw new Error(`Share description differs from page description: ${canonical}`);
    }
    const image = meta('og:image');
    if (image !== `${origin}${encodeURI(imagePath)}` || meta('twitter:image') !== image || meta('twitter:card') !== 'summary_large_image' || images.has(image)) {
      throw new Error(`Missing or duplicated page share image: ${canonical}`);
    }
    images.add(image);
    const png = readFileSync(path.join(outDir, imagePath));
    if (png.toString('hex', 0, 8) !== '89504e470d0a1a0a' || png.readUInt32BE(16) !== 1200 || png.readUInt32BE(20) !== 630) {
      throw new Error(`Share image must be a 1200×630 PNG: ${canonical}`);
    }
    const text = readFileSync(path.join(outDir, markdownPath), 'utf8');
    const sourceMarker = `<!-- Source: ${origin}${canonical} -->`;
    if (!text.startsWith(sourceMarker) || !full.includes(text) || !index.includes(`${origin}${markdownPath}`)) {
      throw new Error(`LLM index/full text is missing a page: ${canonical}`);
    }
    const prose = text.replace(/```[\s\S]*?```/g, '').replace(/`[^`\n]*`/g, '');
    if (/^import |^export const |searchComponentBindings|<[\w.]*TeamMembers\b|<iframe\b|style=\{\{/m.test(prose)) {
      throw new Error(`Unprocessed MDX leaked into LLM text: ${canonical}`);
    }
    for (const { name } of members) {
      if (!text.includes(name)) throw new Error(`LLM text lost member card content: ${name} at ${canonical}`);
    }
    if (!sitemap.has(new URL(canonical, origin).href)) throw new Error(`Sitemap lost a content page: ${canonical}`);
    function visit(node) {
      if (node.tagName === 'script' && node.attrs.some(attr => attr.name === 'type' && attr.value === 'application/ld+json')) {
        const schema = JSON.parse(node.childNodes.map(child => child.value ?? '').join(''));
        if (schema['@type'] === 'BreadcrumbList') {
          breadcrumbs++;
          const items = schema.itemListElement;
          if (items.length < 2 || new URL(items.at(-1).item).pathname !== encodeURI(`${basename === '/index' ? '' : basename}/`)) throw new Error(`Breadcrumb has wrong final page: ${canonical}`);
          items.forEach((item, position) => {
            if (item.position !== position + 1 || !item.name || !outputFile(outDir, new URL(item.item).pathname)) {
              throw new Error(`Breadcrumb has an invalid item: ${canonical}`);
            }
          });
        }
      }
      node.childNodes?.forEach(visit);
    }
    visit(parse(html));
  }
  if ((full.match(/<!-- Source: /g) ?? []).length !== files.length || breadcrumbs < 1) throw new Error('Incomplete LLM or breadcrumb export');
  const introduction = readFileSync(path.join(outDir, 'markdown/about/introduction.txt'), 'utf8');
  if (!introduction.includes('WHUDAYS……其实是故意的') || introduction.includes('页面历史')) throw new Error('LLM export lost chat content or included generated history');
  if (!readFileSync(path.join(outDir, 'markdown/activity/2025/game-dev.txt'), 'utf8').includes('/activity/2025/game-dev/选手手册.pdf')) throw new Error('LLM export lost embedded PDF access');
  console.log(`Discovery verified: ${files.length} descriptions, processed texts and share images; ${breadcrumbs} breadcrumb schemas; complete llms.txt, llms-full.txt and sitemap.`);
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
    if (route === '/about/') {
      const html = readFileSync(file, 'utf8');
      if (html.includes('ffa9eed871cb7da9c262d7f694de9ea089fa8c6b') || !html.includes('3e4cca360820fd50c9d83a8a3961bd537cef8662')) {
        fail('stale-history', route, 'Rendered page history must retain the original edit and exclude its pure PR merge. Clear generated build caches after upgrading the history compiler plugin.');
      }
    }
    if (route === '/') {
      for (const tag of document.tags.filter(tag => tag.tag === 'a' && /\b(?:hero-action|home-feature)\b/.test(tag.class ?? ''))) {
        const url = new URL(tag.href, origin);
        if (url.origin === origin && !url.pathname.endsWith('/') && existsSync(path.join(outDir, decodeURL(url.pathname).slice(1), 'index.html'))) {
          fail('home-route-redirect', route, `Home entry should link directly to its directory URL: ${tag.href}`);
        }
      }
    }
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
  if (report.passed) {
    await verifySearch(outDir);
    verifyDiscovery(outDir);
  }
  if (reportIndex >= 0) writeFileSync(path.resolve(process.argv[reportIndex + 1]), JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify(report.counts, null, 2));
  for (const error of report.errors) console.error(`[${error.kind}] ${error.source}: ${error.message}`);
  console.log(report.passed ? 'Static export checks passed.' : `Static export checks failed: ${report.errors.length} error(s).`);
  process.exitCode = report.passed ? 0 : 1;
}
