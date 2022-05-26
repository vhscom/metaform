const nilPageBlock: PageBlock = {
	id: '00000000-0000-0000-0000-000000000000',
	format: 'markdown',
	content: '',
	children: []
};

const nilPage: Page = {
	id: '00000000-0000-0000-0000-000000000000',
	'page-name': '',
	format: 'markdown',
	children: [nilPageBlock]
};

/**
 * Create skeleton page from title.
 *
 * @param title Page name
 * @returns Skeleton page block
 */
export function skeletonPageFromTitle(title: string) {
	const page = nilPage;
	if (title) {
		page['page-name'] = title;
	}

	return page;
}
