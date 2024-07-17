import { getBlogs } from '@/lib/getBlogs';
import dayjs from 'dayjs';
import Link from 'next/link';

const BlogList = async () => {
  const posts = (await getBlogs()).sort(
    (a, b) => b.createdDate.getTime() - a.createdDate.getTime()
  );

  return (
    <div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          {posts.map((post) => (
            <div
              key={post.slug}
              className="flex flex-col items-start justify-between"
            >
              <Link
                href={`blog\\${post.slug}`}
                className="flex flex-col justify-between h-full"
              >
                <div>
                  <div>
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 dark:text-slate-100 dark:hover:text-slate-300 hover:text-gray-500">
                      {post.title}
                    </h3>
                    <p className="mt-5 line-clamp-2 text-sm leading-6 text-gray-600 dark:text-slate-400">
                      {post.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-x-4 text-xs mt-2">
                    <time
                      dateTime={dayjs(post.createdDate).format('YYYY-MM-DD')}
                      className="text-gray-500"
                    >
                      {dayjs(post.createdDate).format('YYYY-MM-DD')}
                    </time>
                  </div>
                </div>
              </Link>
              <div className="w-full border-b mt-4"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogList;
