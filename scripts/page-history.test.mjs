import assert from 'node:assert/strict';
import test from 'node:test';
import path from 'node:path';
import { createHistoryReader, mapAuthor } from 'fumadocs-page-history/git';
import { remarkGitChangelog } from 'fumadocs-page-history/remark';
import config from '../source.config.ts';
import { buildAuthorMappings } from '../lib/people.js';

const historyOptions = config.mdxOptions.remarkPlugins([])
  .find(plugin => Array.isArray(plugin) && plugin[0] === remarkGitChangelog)[1];

test('页面迁移和分支合并后仍保留原作者的建页提交', async () => {
  const commits = await createHistoryReader(historyOptions).read('docs/about/hq/2026.mdx');
  assert.ok(commits.some(commit => commit.sha === '53bb76a4bd4ab090f11316c0b31d7adc257f019c'));
  assert.ok(!commits.some(commit => commit.sha === 'c15f32d9f6be6e0004561ba67aa77c8ba7e9a822'));
  assert.ok(!commits.some(commit => commit.sha === 'a6e9f74403d54826fc1a9863c54ca455fdb39cac'));
  assert.equal(new Set(commits.map(commit => commit.sha)).size, commits.length);
});

test('纯 PR 合并不重复展示分支中已有的页面修改', async () => {
  const commits = await createHistoryReader(historyOptions).read('docs/about/index.mdx');
  assert.ok(commits.some(commit => commit.sha === '3e4cca360820fd50c9d83a8a3961bd537cef8662'));
  assert.ok(!commits.some(commit => commit.sha === 'ffa9eed871cb7da9c262d7f694de9ea089fa8c6b'));
});

test('读取迁移后的社团介绍时包含原 Markdown 的修改记录', async () => {
  const commits = await createHistoryReader(historyOptions).read('docs/about/introduction.mdx');
  assert.ok(commits.some(commit => commit.sha === '3ea598a9739b3bd400efebab86f1392a5f611765'));
});

test('标准插件可单独关闭历史，并继续显示贡献者', async () => {
  const tree = { type: 'root', children: [] };
  const transform = remarkGitChangelog({ ...historyOptions, display: { hideContributorsHeader: true } });
  await transform(tree, {
    path: path.resolve('docs/about/introduction.mdx'),
    data: { frontmatter: { gitChangelog: { disableChangelog: true }, authors: ['shenxianovo'] } },
  });
  assert.equal(tree.children[0].data.estree.body[0].specifiers[0].imported.name, 'GitContributors');
  const props = Object.fromEntries(tree.children.at(-1).attributes.map(attr => [attr.name, JSON.parse(attr.value.value)]));
  assert.equal(props.authors[0].name, '-QuQ-');
  assert.ok(!tree.children.some(node => node.type === 'heading'));
  assert.ok(!JSON.stringify(props).includes('mapByEmailAliases'));
});

test('标准插件尊重整页关闭历史和贡献者的设置', async () => {
  const tree = { type: 'root', children: [] };
  await remarkGitChangelog(historyOptions)(tree, {
    path: path.resolve('docs/about/hq/2025.mdx'),
    data: { frontmatter: { gitChangelog: false } },
  });
  assert.deepEqual(tree.children, []);
});

test('Git 姓名与邮箱别名使用站内显示名称，保留 GitHub 链接', () => {
  const mappings = buildAuthorMappings();
  for (const [name, email] of [
    ['shenxianovo', 'unknown@example.invalid'],
    ['Other Name', 'shenxianovo@gmail.com'],
    ['Other Name', 'shenxianovo@outlook.com'],
    ['shenxianovo', '123+shenxianovo@users.noreply.github.com'],
  ]) {
    assert.deepEqual(mapAuthor(name, email, mappings), {
      name: '-QuQ-', avatarUrl: '/avatars/-QuQ-.jpeg', url: 'https://github.com/shenxianovo',
    });
  }
});
