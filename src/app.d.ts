/// <reference types="@sveltejs/kit" />
/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_SUPABASE_PUBLIC_ANON_KEY: string;
	readonly VITE_SUPABASE_PROJECT_URL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

interface PageFragment {
	id: string;
	properties?: JSON;
	format: string;
	children: PageFragment[];
	content?: string;
}

interface PageProps {
	public?: boolean;
	draft?: boolean;
}

interface PageInfo {
	id: string;
	'page-name'?: string;
	properties?: PageProps;
	format?: string;
	children: PageFragment[];
}

interface LogseqExport {
	version: number;
	blocks: PageInfo[];
}

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
	// interface Locals {}
	// interface Platform {}
	// interface Session {}
	// interface Stuff {}
}
