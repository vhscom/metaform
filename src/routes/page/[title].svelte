<script lang="ts">
	import BlogPost from '$lib/BlogPost.svelte';

	export let page: PageInfo;
</script>

<h1>{page['page-name']}</h1>
<BlogPost items={page.children} format={page.format} />
