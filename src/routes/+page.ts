import type { PageLoad, PageServerData } from './$types';

export const load: PageLoad = async ({ parent, data }): Promise<PageServerData> => {
	await parent();
	return { logseqExport: data.logseqExport };
};
