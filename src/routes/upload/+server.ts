import { json, error } from '@sveltejs/kit';
import { supabase } from '$lib/server';
import { type ExportPayload, payloadForExport } from '$lib/utils/upload';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const { data: exports, error: err } = await supabase
		.from('export')
		.select('name,size,inserted_at')
		.order('inserted_at', { ascending: false })
		.limit(10);
	err && error(400, { message: err.message });
	return json({ uploads: exports });
};

/**
 * Page endpoint left unused though could be delegated to
 * from the Svelte form action with the proper request text.
 */
export const POST = async ({ request }) => {
	const text = await request.clone().text();
	const formData = await request.formData();
	const file = formData.get('file') as File;

	const payload: ExportPayload = await payloadForExport(file, text);

	if (!payload.data) {
		error(422, {
			message: 'Unable to prepare file upload data for server.'
		});
	}
	if (payload.data.version !== 1) {
		error(400, {
			message: 'Cannot handle file. Expected export version 1.'
		});
	}

	const { data: body, error: err } = await supabase.from('export').insert(payload);
	err && error(400, { message: err.message });

	return json(body, { status: 201 });
};
