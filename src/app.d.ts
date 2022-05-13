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
	properties?: object;
	format: string;
	children: PageFragment[];
	content?: string;
}

interface PageProperties {
	public?: boolean;
	draft?: boolean;
}

interface Page {
	id: string;
	'page-name'?: string;
	properties?: PageProperties;
	format?: string;
	children: PageFragment[];
}

interface LogseqExport {
	version: number;
	blocks: Page[];
}

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
	// interface Locals {}
	// interface Platform {}
	// interface Session {}
	// interface Stuff {}
}
