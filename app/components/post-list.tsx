import { getPosts } from '@/lib/get-posts';
import PostItem from './post-item';

const PostList = async () => {
  const posts = (await getPosts()).sort(
    (a, b) => b.createdDate.getTime() - a.createdDate.getTime()
  );

  return (
    <div>
      {posts.map((post) => (
        <PostItem key={post.slug} post={post} />
      ))}
    </div>
  );
};

export default PostList;
