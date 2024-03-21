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

  return (
    <>
      <img
        className="w-full rounded-xl"
        src={`../cover/${cover}.jpg`}
        alt="cover"
      />
      <h1 className="text-center">{title}</h1>
      <Mdx source={body} />
    </>
  );
};

export default PostPage;
