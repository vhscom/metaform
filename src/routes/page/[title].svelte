<script lang="ts">
	import Page from '$lib/Page.svelte';

	export let page: PageInfo;
</script>

<h1>{page['page-name']}</h1>
<Page format={page.format} fragments={page.children} />
