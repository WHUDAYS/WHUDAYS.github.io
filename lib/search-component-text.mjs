const fields = ['name', 'title', 'desc', 'description', 'nickname', 'message', 'org', 'orgDesc', 'text', 'lead'];

function visibleText(value) {
  if (typeof value === 'string') return value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  if (Array.isArray(value)) return value.map(visibleText).join(' ');
  if (value && typeof value === 'object' && value.props) return visibleText(value.props.children);
  return '';
}

/** Only index rendered component bindings, with their actual card/section IDs. */
export function collectComponentText(exports) {
  const contents = [];
  const seen = new Set();
  function add(value, heading) {
    const content = visibleText(value);
    const key = `${heading}\0${content}`;
    if (content && !seen.has(key)) { seen.add(key); contents.push({ heading, content }); }
  }
  for (const binding of exports.searchComponentBindings ?? []) {
    if (Array.isArray(binding.members)) {
      binding.members.forEach((member, index) => {
        for (const field of fields) add(member[field], `${binding.id}-member-${index}`);
      });
    }
    for (const field of fields) add(binding[field], binding.id);
  }
  return contents;
}
