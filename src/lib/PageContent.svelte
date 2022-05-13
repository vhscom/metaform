<script lang="ts">
	import { marked } from 'marked';

	export let format: string | undefined;
	export let blocks: PageFragment[];

	const parse = (md: string) => marked.parse(md);

	function definesProperties(block: PageFragment) {
		return block.properties && Reflect.ownKeys(block.properties).length;
	}

	const htmlForBlocks = (blocks: PageFragment[], tag?: string) => {
		let str = '';

		blocks.forEach((block) => {
			if (definesProperties(block)) return;

			if (block.content) {
				if (tag) str += `<${tag}>`;
				str += format === 'markdown' ? parse(block.content) : block.content;
				if (tag) str += `</${tag}>`;
			}

			if (block.children.length) {
				str += `<ul>${htmlForBlocks(block.children, 'li')}</ul>`;
			}
		});

		return str;
	};
</script>

{@html htmlForBlocks(blocks)}
