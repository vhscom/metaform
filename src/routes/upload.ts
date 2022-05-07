import type { RequestHandler } from '@sveltejs/kit';
import { supabase } from '$lib/core/services';

export const get: RequestHandler = async () => {
	const { data: exports, error } = await supabase
		.from('export')
		.select('name,size,inserted_at')
		.order('inserted_at', { ascending: false })
		.limit(10);

	if (error) {
		return {
			status: 404,
			body: 'Big fail.'
		};
	}

	return {
		body: { uploads: exports }
	};
};

interface ExportPayload {
	name: string;
	type: string;
	size: number;
	last_modified: number;
	data: LogseqExport;
}

export const post: RequestHandler = async ({ request }) => {
	const formData = await request.formData();
	const file = formData.get('file') as File;

	const payload: ExportPayload = {
		name: file.name,
		type: file.type,
		size: file.size,
		last_modified: file.lastModified,
		data: JSON.parse(await file.text())
	};

	const { data: body, error } = await supabase.from('export').insert(payload);

	if (error) {
		return { status: 404, body: 'Error inserting export reported by server.' };
	}

	return { status: 201, body };
};
