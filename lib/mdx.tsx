import 'highlight.js/styles/atom-one-dark-reasonable.css';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';

const Mdx = async ({ source }: { source: string }) => {
  return (
    <section className="pl-3 pr-3">
      <MDXRemote
        source={source}
        options={{
          mdxOptions: {
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
            ] as any[],
          },
        }}
      />
    </section>
  );
};

export default Mdx;
