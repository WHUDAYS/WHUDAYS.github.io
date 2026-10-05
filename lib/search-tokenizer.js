import { create } from 'zbsearch';
import { tokenizer } from 'zbsearch/components';

/**
 * Keep Fumadocs' multilingual word matching, including Chinese/Japanese, while
 * also indexing non-word nickname glyphs such as ⑨ and 🐮. The exact same
 * tokenizer must run when building and querying a serialized database.
 * Displayed names and excerpts are never normalized or replaced.
 */
export function createSearchTokenizer() {
  const instance = tokenizer.createTokenizer({ language: 'multilingual' });
  const originalTokenize = instance.tokenize;
  const segmenter = typeof Intl.Segmenter === 'function'
    ? new Intl.Segmenter(undefined, { granularity: 'word' })
    : undefined;

  instance.tokenize = (raw, language, property, withCache) => {
    const words = originalTokenize(raw, language, property, withCache);
    if (typeof raw !== 'string') return words;
    const symbols = segmenter
      ? [...segmenter.segment(raw)].filter(part => !part.isWordLike && /[\p{L}\p{N}\p{S}]/u.test(part.segment)).map(part => part.segment)
      : raw.match(/[\p{N}\p{S}]/gu) ?? [];
    return words.concat(symbols.map(symbol => symbol.toLowerCase()).filter(symbol => !words.includes(symbol)));
  };
  return instance;
}

/** Fumadocs staticClient's supported initDB hook; load() supplies the schema. */
export function createSearchDatabase() {
  return create({ schema: { _: 'string' }, components: { tokenizer: createSearchTokenizer() } });
}
