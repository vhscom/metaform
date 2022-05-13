<script lang="ts">
	import ContentBlock from './ContentBlock.svelte';

	export let format: string | undefined;
	export let blocks: PageFragment[];

	function definesProperties(block: PageFragment) {
		return block.properties && Reflect.ownKeys(block.properties).length;
	}
</script>

{#each blocks as block}
	{#if !definesProperties(block)}
		<ContentBlock {format} {block} />
	{/if}
{/each}
