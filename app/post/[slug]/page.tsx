import TableOfContents from '@/app/components/table-of-contents';
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
    <div className="flex">
      <div className="flex-1">
        <h1 className="text-center mt-8">{title}</h1>
        <TableOfContents toc={toc} />
        <div className="mt-4">
          <h2 className="text-xl">Tags:</h2>
          <ul className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <li key={tag}>
                <Link href={`/tags/${tag}`}>#{tag}</Link>
              </li>
            ))}
          </ul>
        </div>
        <section className="pl-3 pr-3">{mdxContent}</section>
      </div>
    </div>
  );
};

export default PostPage;
