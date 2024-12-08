import PostList from './components/post-list';
import Footer from './components/footer';
import { getPosts } from '@/lib/get-posts';

export default async function Home() {
  const posts = (await getPosts()).sort(
    (a, b) => b.createdDate.getTime() - a.createdDate.getTime()
  );

  return (
    <>
      <PostList posts={posts} />
      <Footer />
    </>
  );
}
