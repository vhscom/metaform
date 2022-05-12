import { supabase } from '$lib/core/services';
import type { RequestHandler } from '@sveltejs/kit';
import { containsEncodedComponents } from '$lib/utils/endpoint';

export const get: RequestHandler = async ({ params }) => {
	const title = containsEncodedComponents(params.title)
		? decodeURIComponent(params.title)
		: params.title;

	const { data: page, error } = await supabase
		.from('page')
		.select('*')
		.eq('page-name', title)
		.single();

	if (error) {
		return { status: 404, error: 'Error fetching page reported by server.' };
	}

	return { body: { page } };
};
