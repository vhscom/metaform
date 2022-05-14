<script lang="ts" context="module">
	import { supabase } from '$lib/core/services';
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ params }) => {
		const { data: page, error } = await supabase
			.from('page')
			.select('*')
			.filter('id', 'eq', params.id)
			.single();

		if (error) {
			return { status: 404, error: 'Error fetching page reported by server.' };
		}

		return { props: { page } };
	};
</script>

<script lang="ts">
	import PageContent from '$lib/PageContent.svelte';

	export let page: Page;
</script>

<PageContent format={page.format} blocks={page.children} />
