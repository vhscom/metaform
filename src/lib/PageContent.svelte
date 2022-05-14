<script lang="ts">
	import ContentBlock from './ContentBlock.svelte';
	import { definesProperties } from '$lib/utils/graph';

	export let format: string | undefined;
	export let blocks: PageFragment[];
</script>

{#each blocks as block}
	{#if !definesProperties(block)}
		<ContentBlock {format} {block} />
	{/if}
{/each}
