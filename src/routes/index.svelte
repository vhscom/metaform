<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ url, fetch }) => {
		const response = await fetch(
			new URL('/Users_jos_Documents_Logseq_1651697499.json', url.href).href
		);

		if (response.ok) {
			return {
				status: 200,
				props: { logseqExport: await response.json() }
			};
		}

		return {
			status: 404,
			error: 'Big fail.'
		};
	};
</script>

<script lang="ts">
	import PageInfo from '$lib/PageInfo.svelte';

	export let logseqExport: LogseqExport;
</script>

<dl>
	{#each logseqExport.blocks as info}
		<PageInfo {info} />
	{/each}
</dl>
