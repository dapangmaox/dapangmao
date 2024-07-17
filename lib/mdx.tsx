import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import rehypeToc from '@/plugins/rehype-toc';

const Mdx = async ({ source }: { source: string }) => {
  const toc: any[] = [];

  const mdxContent = await MDXRemote({
    source,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
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
          [rehypePrettyCode, {}],
          [rehypeToc, { toc }],
        ] as any[],
      },
    },
  });

  return { mdxContent, toc };
};

export default Mdx;
