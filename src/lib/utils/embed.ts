/**
 * Empty page block with nil identifier.
 */
const nilPageBlock: PageBlock = {
	id: '00000000-0000-0000-0000-000000000000',
	format: 'markdown',
	children: [],
	content: ''
};

/**
 * Empty page with nil identifier.
 */
const nilPage: Page = {
	id: '00000000-0000-0000-0000-000000000000',
	'page-name': '',
	format: 'markdown',
	children: [nilPageBlock]
};

/**
 * Create skeleton page block from title.
 *
 * @returns Skeleton page block
 */
export function skeletonPageBlockFromUuid(uuid: string) {
	const block = nilPageBlock;
	if (uuid) {
		block.id = uuid;
	}

	return block;
}

/**
 * Create skeleton page from tagged embed.
 *
 * @param content Text containing single named page embed tag
 * @param matcher Expression matching page title with named capture group
 * @returns Skeleton page with tagged title and status content
 */
export function skeletonForPageEmbed(content: string, matcher: RegExp) {
	const page = nilPage;
	const matches = content.match(matcher);
	if (matches && matches.groups) {
		const [group] = Reflect.ownKeys(matches.groups) as string[];
		page['page-name'] = matches.groups[group];
	} else {
		page['page-name'] = content;
	}
	const [contentBlock] = page.children;
	contentBlock.content = '_Page not loaded or unavailable._';

	return page;
}

/**
 * Create skeleton page block from tagged embed.
 *
 * @param content Text containing single page block embed tag
 * @param matcher Expression matching block identifier with named capture group
 * @returns Skeleton page block with status content
 */
export function skeletonForBlockEmbed(content: string, matcher: RegExp) {
	const block = nilPageBlock;
	const matches = content.match(matcher);
	if (matches && matches.groups) {
		const [group] = Reflect.ownKeys(matches.groups) as string[];
		block.id = matches.groups[group];
	}
	block.content = '_Block not loaded or unavailable._';

	return block;
}

/**
 * Get embedded content.
 *
 * @param content Text containing a page or page block embed tag
 * @param matcher Expression matching tag identifier with named capture group
 * @param embeds Embeds for current page
 * @returns Page or page block for embedded content, otherwise undefined
 */
export function blockForEmbed(content: string, matcher: RegExp, embeds: Embeds) {
	const matches = content.match(matcher);
	if (matches && matches.groups) {
		const [group] = Reflect.ownKeys(matches.groups) as string[];
		const term = matches.groups[group];

		return group === 'title'
			? embeds.pages.find((embed) => embed['page-name'] === term)
			: embeds.blocks.find((embed) => embed.id === term);
	}
}
