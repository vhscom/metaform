import { supabase } from '$lib/core/services';
import type { RequestHandler } from '@sveltejs/kit';
import { containsEncodedComponents } from '$lib/utils/endpoint';

export const get: RequestHandler = async ({ params }) => {
	const id = containsEncodedComponents(params.id) ? decodeURIComponent(params.id) : params.id;

	const { data: pageBlock, error } = await supabase
		.from('page_block')
		.select('*')
		.eq('id', id)
		.single();

	if (error) {
		return { status: 400, body: { error } };
	}

	return {
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(pageBlock)
	};
};
