import TableOfContents from '@/app/components/table-of-contents';
import { getBlog, getBlogs } from '@/lib/getBlogs';
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
  const blog = await getBlog(params.slug);
  if (!blog) {
    return <div>Blog not found!</div>;
  }
  const { body, title } = blog;
  const { mdxContent, toc } = await Mdx({ source: body });

  return (
    <div className="flex">
      <div className="flex-1">
        <h1 className="text-center mt-8">{title}</h1>
        <TableOfContents toc={toc} />
        <section className="pl-3 pr-3">{mdxContent}</section>
      </div>
    </div>
  );
};

export default PostPage;
