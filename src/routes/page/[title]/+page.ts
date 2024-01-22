import type { PageLoad, PageParentData } from './$types';
import { containsEncodedComponents } from '$lib/utils/endpoint';

interface PageData extends PageParentData {
	page: Page;
	embeds: Embeds;
	refs: NamedReferences;
}

export const load: PageLoad = async ({ url, fetch, params }): Promise<PageData> => {
	const title = containsEncodedComponents(params.title)
		? decodeURIComponent(params.title)
		: params.title;
	return (await fetch(`${url.origin}/page/${title}`)).json();
};
