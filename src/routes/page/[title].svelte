<script lang="ts">
	import PageContent from '$lib/PageContent.svelte';

	export let page: PageInfo;

	const [_, ...blocks] = page.children;
</script>

<h1>{page['page-name']}</h1>
<PageContent format={page.format} {blocks} />
