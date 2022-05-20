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

	const getEmbeddedPagePromises = (page: Page) =>
		namedEmbedsForPage(page).pages.map(async (embedTitle) => {
			const res = await fetch(`${url.origin}/api/embed/${encodeURIComponent(embedTitle)}.json`);
			return await res.json();
		});

	const embeddedPages = [...(await Promise.all(getEmbeddedPagePromises(page)))];
	const embeds: Embeds = { pages: embeddedPages, blocks: [] };

	const embeddedPagesBySubpage = await Promise.all(
		embeds.pages.map(async (page) => await Promise.all(getEmbeddedPagePromises(page)))
	);
	embeddedPagesBySubpage.forEach((pagesForSubpage) => {
		embeds.pages.push(...pagesForSubpage);
	});

	return { body: { page, embeds, refs: namedRefsForPage(page) } };
};
