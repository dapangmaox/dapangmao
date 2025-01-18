import TableOfContents from '@/components/table-of-contents';
import { getPost, getPosts } from '@/lib/get-posts';
import Mdx from '@/lib/mdx';
import Link from 'next/link';

export const revalidate = 3600;

type Props = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const posts = await getPosts();

  if (!posts) return [];

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

const PostPage = async ({ params }: Props) => {
  const post = await getPost(params.slug);
  if (!post) {
    return <div>Post not found!</div>;
  }
  const { body, title, tags } = post;
  const { mdxContent, toc } = await Mdx({ source: body });

  return (
    <div>
      <h1 className="text-center mt-8">{title}</h1>
      <TableOfContents toc={toc} />
      <div className="mt-4">
        <div className="flex flex-wrap gap-4">
          {tags.map((tag) => (
            <span key={tag}>
              <Link href={`/tags/${tag}`}>#{tag}</Link>
            </span>
          ))}
        </div>
      </div>
      <section>{mdxContent}</section>
    </div>
  );
};

export default PostPage;
