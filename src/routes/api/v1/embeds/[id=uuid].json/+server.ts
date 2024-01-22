import { error, json } from '@sveltejs/kit';
import { supabase } from '$lib/server';
import type { RequestHandler } from './$types';
import { containsEncodedComponents } from '$lib/utils/endpoint';

export const GET: RequestHandler = async ({ params }) => {
	const id = containsEncodedComponents(params.id) ? decodeURIComponent(params.id) : params.id;
	const { data: pageBlock, error: err } = await supabase
		.from('page_block')
		.select('*')
		.eq('id', id)
		.single<PageBlock>();
	err && error(400, { message: err.message });
	return json(pageBlock);
};
