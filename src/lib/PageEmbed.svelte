<script lang="ts">
	import PageContent from './PageContent.svelte';
	import { blocksForPage } from '$lib/utils/graph';

	export let page: Page;
	export let embeds: Embeds;

	const [_, ...contentBlocks] = blocksForPage(page);
</script>

<aside>
	<h1>{page['page-name']}</h1>
	<hr />
	<PageContent blocks={contentBlocks} {embeds} />
</aside>

<style>
	aside {
		margin: 0.5rem 0 0.5rem;
		padding: 1.5rem;
		border: 1px dashed magenta;
	}
	aside h1 {
		font-size: large;
		margin-top: 0;
	}
	:global(p:last-of-type) {
		margin-bottom: 0;
	}
</style>
