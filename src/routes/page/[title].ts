import { supabase } from '$lib/core/services';
import type { RequestHandler } from '@sveltejs/kit';
import {
	containsEncodedComponents,
	namedEmbedsForPage,
	namedRefsForPage
} from '$lib/utils/endpoint';

export const get: RequestHandler = async ({ params, url }) => {
	const title = containsEncodedComponents(params.title)
		? decodeURIComponent(params.title)
		: params.title;

	const { data: page, error } = await supabase
		.from('page')
		.select('*')
		.eq('page-name', title)
		.single();

	if (error) {
		return { status: 400, body: { error } };
	}

	const uriByPageTitle = (title: string) => {
		return `${url.origin}/api/embed/${encodeURIComponent(title)}.json`;
	};

	const embeddedPagesForPage = async (page: Page, maxDepth = 2) => {
		const pages = await Promise.all(
			namedEmbedsForPage(page).pages.map(async (embedTitle) => {
				return await (await fetch(uriByPageTitle(embedTitle))).json();
			})
		);

		if (maxDepth > 1) {
			const embedded = await Promise.all(
				pages.map(async (page) => await embeddedPagesForPage(page, --maxDepth))
			);
			embedded.forEach((subpages) => pages.push(...subpages));
		}

		return pages;
	};

	const embeds: Embeds = { pages: await embeddedPagesForPage(page), blocks: [] };

	return { body: { page, embeds, refs: namedRefsForPage(page) } };
};
