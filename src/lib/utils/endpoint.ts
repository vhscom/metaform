import { findByExpression } from '$lib/utils/graph';
import { pageEmbed, blockEmbed, pageRef, blockRef } from '$lib/utils/regex';

/**
 * Check if path part contains URI encoded characters.
 *
 * @param path Component piece of a URI string
 * @returns True if the path part contains URI-encoded pieces
 */
export function containsEncodedComponents(path: string) {
	// ie ?,=,&,/ etc
	return decodeURI(path) !== decodeURIComponent(path);
}

/**
 * Get named embeds for page.
 *
 * @param page Page to search
 * @returns Object containing lists of page and block embed names
 */
export function namedEmbedsForPage(page: Page): NamedEmbeds {
	return {
		pages: findByExpression(page, pageEmbed, 'title'),
		blocks: findByExpression(page, blockEmbed, 'uuid')
	};
}

/**
 * Get named references for page.
 *
 * @param page Page to search for refs
 * @returns Object containing lists of page and block reference names
 */
export function namedRefsForPage(page: Page): NamedReferences {
	return {
		pages: findByExpression(page, pageRef, 'title'),
		blocks: findByExpression(page, blockRef, 'uuid')
	};
}
