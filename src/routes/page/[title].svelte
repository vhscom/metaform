<script lang="ts">
	import PageContent from '$lib/PageContent.svelte';
	import PageMeta from '$lib/PageMeta.svelte';

	export let page: Page;

	const [propertiesBlock, ...contentBlocks] = page.properties
		? page.children
		: ([undefined, ...page.children] as PageFragment[]);
</script>

<h1>{page['page-name']}</h1>
<PageMeta properties={page.properties} block={propertiesBlock} display="block" />
<PageContent format={page.format} blocks={contentBlocks} />
