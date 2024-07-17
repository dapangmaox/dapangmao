import TableOfContents from '@/app/components/TableOfContents';
import { getBlogs, Blog, getBlog } from '@/lib/getBlogs';
import Mdx from '@/lib/mdx';

export const revalidate = 10;

type Props = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const blogs = await getBlogs();

  if (!blogs) return [];

  return blogs.map((post) => ({
    slug: post.slug,
  }));
}

const PostPage = async ({ params }: Props) => {
  const { body, cover, title } = (await getBlog(params.slug)) as Blog;
  const { mdxContent, toc } = await Mdx({ source: body });

  return (
    <div className="flex">
      <div className="flex-1">
        <h1 className="text-center mt-8">{title}</h1>
        <section className="pl-3 pr-3">{mdxContent}</section>
      </div>
      <TableOfContents toc={toc} />
    </div>
  );
};

export default PostPage;
