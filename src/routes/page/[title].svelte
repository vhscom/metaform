<script lang="ts">
	import PageContent from '$lib/PageContent.svelte';
	import PageMeta from '$lib/PageMeta.svelte';
	import { blocksForPage } from '$lib/utils/graph';

	export let page: Page;
	export let embeds: Embeds;
	export let refs: NamedReferences;

	const [propertiesBlock, ...contentBlocks] = blocksForPage(page);
</script>

<h1>{page['page-name']}</h1>
<PageMeta properties={page.properties} block={propertiesBlock} {embeds} {refs} display="block" />
<PageContent blocks={contentBlocks} {embeds} />
