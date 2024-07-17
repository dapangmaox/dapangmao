import dayjs from 'dayjs';
import fs from 'fs/promises';
import matter from 'gray-matter';
import path from 'path';

export type Blog = {
  title: string;
  slug: string;
  tags: string[];
  description: string;
  body: string;
  cover: string;
  createdDate: Date;
  lastModified?: number;
  views?: number;
};

export type Metadata = {
  slug: string;
  title: string;
  date: string;
  created: string;
  tags: string[];
};

export const getBlogs = async () => {
  const blogs = await fs.readdir('blogs/');

  return Promise.all(
    blogs
      .filter((file) => path.extname(file) === '.mdx')
      .map(async (file) => {
        const filePath = `blogs/${file}`;
        const blogContent = await fs.readFile(filePath, 'utf8');
        const { data, content } = matter(blogContent);

        return {
          ...data,
          body: content,
          createdDate: dayjs(file.substring(0, 10), 'YYYY-MM-DD').toDate(),
        } as Blog;
      })
  );
};

export const getBlog = async (slug: string): Promise<Blog | undefined> => {
  const blogs = await fs.readdir('blogs/');

  const blogFile = blogs.find(
    (file) => path.extname(file) === '.mdx' && file.includes(slug)
  );

  if (!blogFile) {
    return undefined;
  }

  const filePath = `blogs/${blogFile}`;
  const blogContent = await fs.readFile(filePath, 'utf8');
  const { data, content } = matter(blogContent);

  return {
    ...data,
    body: content,
    createdDate: dayjs(blogFile.substring(0, 10), 'YYYY-MM-DD').toDate(),
  } as Blog;
};
