import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import rehypeToc from '@/plugins/rehype-toc';
import { visit } from 'unist-util-visit';

const repoUrl =
  'https://raw.githubusercontent.com/dapangmaox/type-challenges-solutions/main';

const relativeToAbsolute = (replaceImageUrl: boolean) => {
  return () => (tree: any) => {
    visit(tree, 'image', (node) => {
      if (replaceImageUrl && node.url.startsWith('/')) {
        node.url = `${repoUrl}${node.url}`;
      }
    });
  };
};

const Mdx = async ({
  source,
  replaceImageUrl = false,
}: {
  source: string;
  replaceImageUrl: boolean;
}) => {
  const toc: any[] = [];

  const mdxContent = await MDXRemote({
    source,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm, relativeToAbsolute(replaceImageUrl)],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              properties: {
                className: ['anchor'],
              },
            },
            { behaviour: 'wrap' },
          ],
          rehypeCodeTitles,
          [rehypePrettyCode as any, {}],
          [rehypeToc, { toc }],
        ],
      },
    },
  });

  return { mdxContent, toc };
};

export default Mdx;
