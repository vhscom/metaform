<script lang="ts">
	import { marked } from 'marked';

	export let format: string | undefined;
	export let blocks: PageFragment[];

	const parse = (md: string) => marked.parse(md);

	const htmlFromBlocks = (blocks: PageFragment[], tag?: string) => {
		let str = '';
		blocks.forEach((block) => {
			if (block.content) {
				if (tag) str += `<${tag}>`;
				str += format === 'markdown' ? parse(block.content) : block.content;
				if (tag) str += `</${tag}>`;
			}
			if (block.children.length) {
				str += `<ul>${htmlFromBlocks(block.children, 'li')}</ul>`;
			}
		});

		return str;
	};
</script>

{@html htmlFromBlocks(blocks)}
