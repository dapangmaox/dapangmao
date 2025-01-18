import { Post } from "@/lib/get-posts";
import PostItem from "./post-item";

const PostList = ({ posts }: { posts: Post[] }) => {
  return (
    <div>
      {posts.map((post) => (
        <PostItem key={post.slug} post={post} />
      ))}
    </div>
  );
};

export default PostList;
