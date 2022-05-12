<script lang="ts">
	import PageContent from '$lib/PageContent.svelte';
	import PageMeta from '$lib/PageMeta.svelte';

	export let page: Page;

	let propertiesBlock: PageFragment | undefined;
	let contentBlocks: PageFragment[];

	if (page.properties) {
		[propertiesBlock, ...contentBlocks] = page.children;
	} else {
		propertiesBlock = undefined;
		contentBlocks = page.children;
	}
</script>

<h1>{page['page-name']}</h1>
<PageMeta properties={page.properties} block={propertiesBlock} display="block" />
<PageContent format={page.format} blocks={contentBlocks} />
