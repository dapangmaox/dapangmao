import PostItem from '@/components/post-item';
import { getPosts } from '@/lib/get-posts';
import Link from 'next/link';

export const revalidate = 3600;

type Props = {
  params: {
    tag: string;
  };
};

export async function generateStaticParams() {
  const posts = await getPosts();

  if (!posts) return [];

  const tags = new Set(posts.map((post) => post.tags).flat());

  return Array.from(tags).map((tag) => ({ tag }));
}

const TagsPage = async ({ params: { tag } }: Props) => {
  const posts = await getPosts();

  if (!posts)
    return <p className="mt-10 text-center">抱歉，没有可用的文章。</p>;

  const tagPosts = posts.filter((post) => post.tags.includes(tag));

  if (!tagPosts.length) {
    return (
      <div className="text-center">
        <p className="mt-10">抱歉，没有相关文章。</p>
        <Link href="/">返回首页</Link>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-3xl mt-4 mb-0">#{tag}</h2>
      <section className="mt-6">
        <ul className="w-full list-none p-0">
          {tagPosts.map((post) => (
            <PostItem key={post.slug} post={post} />
          ))}
        </ul>
      </section>
    </>
  );
};

export default TagsPage;
