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

/**
 * Get embedded pages for page.
 *
 * @param page Page to search for embedded pages
 * @param pageForTitle Helper to resolve page given a title
 * @param maxDepth Depth of search
 * @returns List of embedded pages
 */
export async function pageEmbedsForPage(
	page: Page,
	pageForTitle: (title: string) => Promise<Page>,
	maxDepth = 6
): Promise<Array<Page>> {
	const titles = findByExpression(page, pageEmbed, 'title');
	const pages: Page[] = await Promise.all(titles.map(async (title) => await pageForTitle(title)));

	if (maxDepth <= 1) return pages;

	const subpages: Page[] = await pages.reduce(
		async (deferredPages, page) =>
			[
				...(await deferredPages),
				...(await pageEmbedsForPage(page, pageForTitle, --maxDepth))
			] as Page[],
		Promise.resolve([]) as Promise<Page[]>
	);

	return pages.concat(...subpages);
}

/**
 * Get embedded blocks for page.
 *
 * @param page Page to search for embedded blocks
 * @param blockForUuid Helper to resolve block given a UUID
 * @param maxDepth Depth of search
 * @returns List of embedded blocks
 */
export async function blockEmbedsForPage(
	page: Page,
	blockForUuid: (uuid: string) => Promise<PageBlock>,
	maxDepth = 1
): Promise<Array<PageBlock>> {
	const uuids = findByExpression(page, blockEmbed, 'uuid');
	const blocks: PageBlock[] = await Promise.all(
		uuids.map(async (uuid) => await blockForUuid(uuid))
	);

	if (maxDepth <= 1) return blocks;

	const subblocks: PageBlock[] = await blocks.reduce(
		async (deferredBlocks, block) =>
			[
				...(await deferredBlocks),
				...(await blockEmbedsForPage(block, blockForUuid, --maxDepth))
			] as PageBlock[],
		Promise.resolve([]) as Promise<PageBlock[]>
	);

	return blocks.concat(...subblocks);
}
