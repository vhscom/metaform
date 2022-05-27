/**
 * @returns First match for page or block embed.
 */
export const embedTagSplitter =
	/(?<tag>{{\s?embed\s(?:\[\[.*\]\]|\(\((?:[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\)\))\s?}})/;

/**
 * @returns First match for page embed tag with named capture group
 */
export const pageEmbedTag = /(?<tag>{{\s?embed\s\[\[.*\]\]\s?}})/;

/**
 * @returns First match for block embed tag with named capture group
 */
export const blockEmbedTag =
	/(?<tag>{{\s?embed\s\(\((?<uuid>[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\)\)\s?}})/;

/**
 * @returns First match for page embed with named capture group
 */
export const pageEmbed = /{{\s?embed\s\[\[(?<title>.*)\]\]\s?}}/;

/**
 * @returns First match for block embed with named capture group
 */
export const blockEmbed =
	/{{embed \(\((?<uuid>[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\)\)\s?}}/;

/**
 * @returns First match for page reference with named capture group
 */
export const pageRef = /(?<!embed\s)\[\[(?<title>.*)\]\]/;

/**
 * @returns First match for block reference with named capture group
 */
export const blockRef =
	/(?<!embed\s)\(\((?<uuid>[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\)\)/;

/**
 * @returns First match for block reference metadata
 * @see {@link https://github.com/logseq/logseq/issues/5453|Block reference metadata leaks into content}
 */
export const blockRefCruft = /\nid:: [0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;
