import { supabase } from '$lib/core/services';
import type { RequestHandler } from '@sveltejs/kit';
import {
	containsEncodedComponents,
	namedRefsForPage,
	pageEmbedsForPage
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

	const pageForTitle = async (title: string) => {
		return await (await fetch(`${url.origin}/api/embed/${encodeURIComponent(title)}.json`)).json();
	};
	const embeds: Embeds = { pages: await pageEmbedsForPage(page, pageForTitle), blocks: [] };

	return { body: { page, embeds, refs: namedRefsForPage(page) } };
};
