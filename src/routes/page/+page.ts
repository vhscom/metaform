import { error, json } from '@sveltejs/kit';
import type { PageLoad, PageParentData } from './$types';

interface PageData extends PageParentData {
	pages: Page[];
	url: URL;
}

export const load: PageLoad = async ({ url, fetch }): Promise<PageData> => {
	const res = await fetch(new URL(`${url.origin}/api/v1/pages`));
	if (res.ok) {
		const { pages } = await res.json();
		return { pages, url };
	}
	error(404, 'Big fail.');
};
