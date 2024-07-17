// plugins/rehype-toc.js
import { visit } from 'unist-util-visit';

const rehypeToc = (options = {}) => {
  return (tree) => {
    const toc = [];

    visit(tree, 'element', (node) => {
      if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(node.tagName)) {
        let title = '';

        // 获取标题文本，考虑到标题节点内可能包含其他节点
        if (node.children && node.children.length > 0) {
          node.children.forEach((child) => {
            if (child.type === 'text') {
              title += child.value;
            } else if (child.type === 'element' && child.children) {
              child.children.forEach((nestedChild) => {
                if (nestedChild.type === 'text') {
                  title += nestedChild.value;
                }
              });
            }
          });
        }

        toc.push({
          id: node.properties.id,
          title: title.trim(),
          depth: parseInt(node.tagName[1]),
        });
      }
    });

    options.toc.push(...toc);
  };
};

export default rehypeToc;
