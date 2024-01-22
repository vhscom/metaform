import { error, json } from '@sveltejs/kit';
import { supabase } from '$lib/server';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const limit = Number(url.searchParams.get('limit') ?? Number.POSITIVE_INFINITY);
	const order = url.searchParams.get('order') ?? '';

	const { data: pages, error: err } = await supabase
		.from('page')
		.select('*')
		.limit(limit)
		.order('page-name', { ascending: order === 'asc' })
		.returns<Page[]>();

	err && error(400, { message: err.message });
	return json({ pages, url });
};
