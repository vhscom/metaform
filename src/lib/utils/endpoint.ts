import { findByExpression } from '$lib/utils/graph';

/**
 * Check if path part contains URI encoded characters.
 *
 * @param path Component piece of a URI string
 * @returns True if the path part contains URI-encoded pieces
 */
export function containsEncodedComponents(path: string): boolean {
	// ie ?,=,&,/ etc
	return decodeURI(path) !== decodeURIComponent(path);
}

/**
 * Get embeds for page.
 *
 * @param page Page to search for embeds
 * @returns JSON object containing arrays of list of page and block embeds
 */
export function embedsForPage(page: Page): Embeds {
	const pageEmbed = /{{embed \[\[(?<title>.*)\]\]}}/;
	const blockEmbed =
		/{{embed \(\((?<uuid>[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\)\)}}/;

	return {
		page: findByExpression(page, pageEmbed, 'title'),
		block: findByExpression(page, blockEmbed, 'uuid')
	};
}

/**
 * Get references for page.
 *
 * @param page Page to search for refs
 * @returns JSON object containing arrays of page and block references
 */
export function refsForPage(page: Page): References {
	const pageRef = /(?<!embed\s)\[\[(?<title>.*)\]\]/;
	const blockRef =
		/(?<!embed\s)\(\((?<uuid>[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\)\)/;

	return {
		page: findByExpression(page, pageRef, 'title'),
		block: findByExpression(page, blockRef, 'uuid')
	};
}
