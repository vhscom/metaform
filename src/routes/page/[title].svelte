<script lang="ts">
	import PageContent from '$lib/PageContent.svelte';
	import PageMeta from '$lib/PageMeta.svelte';

	export let page: Page;
	export let embeds: Embeds;
	export let refs: References;

	const [propertiesBlock, ...contentBlocks] = page.properties
		? page.children
		: ([undefined, ...page.children] as PageFragment[]);
</script>

<h1>{page['page-name']}</h1>
<PageMeta properties={page.properties} block={propertiesBlock} {embeds} {refs} display="block" />
<PageContent format={page.format} blocks={contentBlocks} />
