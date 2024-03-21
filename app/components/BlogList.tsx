import { getBlogs } from '@/lib/getBlogs';
import dayjs from 'dayjs';
import Link from 'next/link';

const BlogList = async () => {
  const posts = await getBlogs();

  return (
    <div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 pt-10 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="flex max-w-xl flex-col items-start justify-between"
            >
              <Link href={`blog\\${post.slug}`}>
                <img
                  className="w-full rounded-xl"
                  src={`cover/${post.cover}.jpg`}
                  alt="cover"
                />
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
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogList;
