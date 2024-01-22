import { error, json } from '@sveltejs/kit';
import { supabase } from '$lib/server';
import type { RequestHandler } from './$types';
import {
	containsEncodedComponents,
	namedRefsForPage,
	pageEmbedsForPage,
	blockEmbedsForPage
} from '$lib/utils/endpoint';

export const GET: RequestHandler = async ({ params, url }) => {
	const title = containsEncodedComponents(params.title)
		? decodeURIComponent(params.title)
		: params.title;
	const { data: page, error: err } = await supabase
		.from('page')
		.select('*')
		.eq('page-name', title)
		.single<Page>();
	err && error(400, { message: err.message });
	const pageForTitle = async (title: string): Promise<Page> => {
		return await (
			await fetch(`${url.origin}/api/v1/embeds/${encodeURIComponent(title)}.json`)
		).json();
	};
	const blockForUuid = async (uuid: string): Promise<PageBlock> => {
		return await (await fetch(`${url.origin}/api/v1/embeds/${uuid}.json`)).json();
	};
	const awaitEmbeds = (
		pageEmbedsForPageDeferred: Promise<Array<Page>>,
		blockEmbedsForPageDeferred: Promise<Array<PageBlock>>
	) => {
		return Promise.all([pageEmbedsForPageDeferred, blockEmbedsForPageDeferred]);
	};
	const [pages, blocks] = await awaitEmbeds(
		pageEmbedsForPage(page!, pageForTitle),
		blockEmbedsForPage(page!, blockForUuid)
	);
	const embeds: Embeds = { pages, blocks };
	return json({ page, embeds, refs: namedRefsForPage(page!) });
};
