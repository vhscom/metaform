/**
 * @returns First match for page embed with named capture group
 */
export const pageEmbed = /{{embed \[\[(?<title>.*)\]\]}}/;

/**
 * @returns First match for page embed tag with named capture group
 */
export const pageEmbedTag = /(?<tag>{{embed \[\[.*\]\]}})/;

/**
 * @returns First match for block embed with named capture group
 */
export const blockEmbed =
	/{{embed \(\((?<uuid>[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\)\)}}/;

/**
 * @returns First match for page reference with named capture group
 */
export const pageRef = /(?<!embed\s)\[\[(?<title>.*)\]\]/;

/**
 * @returns First match for block reference with named capture group
 */
export const blockRef =
	/(?<!embed\s)\(\((?<uuid>[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\)\)/;
