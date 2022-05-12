<script lang="ts">
	import { marked } from 'marked';

	export let properties: PageProperties | undefined;
	export let block: PageFragment | undefined;

	export let display: 'block' | 'none';

	function fence(code: object) {
		return marked('```json\n' + JSON.stringify(code, null, 2) + '\n```');
	}
</script>

<aside style:display>
	<strong>properties</strong>
	{@html (properties && fence(properties)) ?? undefined}
	<strong>block</strong>
	{@html (block && fence(block)) ?? undefined}
</aside>
