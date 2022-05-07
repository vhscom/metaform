import type { RequestHandler } from '@sveltejs/kit';
import { supabase } from '$lib/core/services';

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
		console.table(error);
		return { status: 404, body: 'Error inserting export reported by server.' };
	}

	return { status: 201, body };
};
