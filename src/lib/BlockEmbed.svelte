<script lang="ts">
	import ContentBlock from './ContentBlock.svelte';
	import { blockRefCruft } from '$lib/utils/regex';

	export let block: PageBlock;
	export let embeds: Embeds;

	if (blockRefCruft.test(block.content)) {
		const matches = block.content.match(blockRefCruft);
		matches &&
			matches.forEach((match) => {
				block.content = block.content.replace(match, '');
			});
	}
</script>

<aside>
	<ContentBlock {block} {embeds} />
</aside>

<style>
	aside {
		margin: 0.5rem 0 0.5rem;
		padding: 1.5rem;
		border: 1px dashed magenta;
	}
	:global(ul:last-of-type) {
		margin-bottom: 0;
	}
</style>
