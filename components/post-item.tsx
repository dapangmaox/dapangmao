import { Post } from "@/lib/get-posts";
import dayjs from "dayjs";
import Link from "next/link";

type PostItemProps = {
  post: Post;
};

const PostItem = ({ post }: PostItemProps) => {
  return (
    <div className="flex flex-col items-start">
      <Link
        href={`/post/${post.slug}`}
        className="flex flex-col justify-between no-underline"
      >
        <div>
          <div>
            <h3 className="mt-3 text-lg font-semibold leading-6 hover:text-gray-600 dark:hover:text-slate-400">
              {post.title}
            </h3>
            <p className="mt-5 line-clamp-2 text-sm leading-6 text-gray-900 dark:text-slate-300">
              {post.description}
            </p>
          </div>
        </div>
      </Link>
      <div className="flex items-center gap-x-4 text-xs">
        <time
          dateTime={dayjs(post.createdDate).format("YYYY-MM-DD")}
          className="text-gray-500 dark:text-slate-400"
        >
          {dayjs(post.createdDate).format("YYYY-MM-DD")}
        </time>
      </div>
      <div className="mt-4 w-full border-b"></div>
    </div>
  );
};

export default PostItem;
