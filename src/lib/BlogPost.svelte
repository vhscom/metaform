<script lang="ts">
	import { marked } from 'marked';
	export let children: any[];

	const parse = (md: string) => marked.parse(md);

	const buffer = (blocks: any[]) => {
		let str = '';
		blocks.forEach((block) => {
			if (block.content) {
				str += parse(block.content);
			} else if (block.children.length) {
				str += buffer(block.children);
			}
		});
		return str;
	};

	const html = buffer(children);
</script>

<hr />
{@html html}
