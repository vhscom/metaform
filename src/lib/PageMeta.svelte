<script lang="ts">
	import { marked } from 'marked';

	export let properties: PageProperties | undefined;
	export let block: PageFragment | undefined;
	export let embeds: Embeds;
	export let refs: NamedReferences;

	export let display: 'block' | 'none';

	function fence(code: object) {
		return marked('```json\n' + JSON.stringify(code, null, 2) + '\n```');
	}
</script>

<details style:display style="margin-bottom:1rem;cursor:pointer">
	<summary>Expand to view page meta</summary>
	<strong>references:</strong>
	{@html (refs && fence(refs)) ?? undefined}
	<strong>embeds:</strong>
	{@html (embeds && fence(embeds)) ?? undefined}
	<strong>properties</strong>
	{@html (properties && fence(properties)) ?? undefined}
	<strong>block</strong>
	{@html (block && fence(block)) ?? undefined}
</details>
