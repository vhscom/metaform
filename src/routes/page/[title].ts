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

	const promises = namedEmbedsForPage(page).pages.map(async (embedTitle) => {
		const res = await fetch(`${url.origin}/api/embed/${encodeURIComponent(embedTitle)}.json`);
		return await res.json();
	});
	const embeds: Embeds = { pages: [...(await Promise.all(promises))], blocks: [] };

	return { body: { page, embeds, refs: namedRefsForPage(page) } };
};
