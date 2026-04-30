import type { Root } from 'hast';
import { visit } from 'unist-util-visit';

// 存在 bug
export default function rehypeFixImageHeights() {
	return (tree: Root) => {
		visit(tree, 'element', (node) => {
			if (node.tagName === 'img' && node.properties?.height) {
				const height = node.properties.height;
				const heightValue =
					typeof height === 'number'
						? `${height}px`
						: /^\d+$/.test(height as string)
							? `${height}px`
							: (height as string);

				// 设置内联样式，覆盖 Starlight 的 height: auto
				node.properties.style = `height: ${heightValue}; width: auto;`;
				// 删除 height 属性，避免重复
				delete node.properties.height;
			}
		});
	};
}
