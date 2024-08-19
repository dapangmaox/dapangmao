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
  createdDate: Date;
  lastModified?: number;
  views?: number;
};

const BLOGS_DIR = 'blogs/';

const parseBlogFile = async (file: string): Promise<Blog> => {
  const filePath = path.join(BLOGS_DIR, file);
  const blogContent = await fs.readFile(filePath, 'utf8');
  const { data, content } = matter(blogContent);

  return {
    ...data,
    slug: file.substring(0, file.lastIndexOf('.')).substring(11),
    body: content,
    createdDate: dayjs(file.substring(0, 10), 'YYYY-MM-DD').toDate(),
  } as Blog;
};

export const getBlogs = async (): Promise<Blog[]> => {
  const files = await fs.readdir(BLOGS_DIR);
  const blogFiles = files.filter((file) => path.extname(file) === '.mdx');
  return Promise.all(blogFiles.map(parseBlogFile));
};

export const getBlog = async (slug: string): Promise<Blog | undefined> => {
  const files = await fs.readdir(BLOGS_DIR);

  const blogFile = files.find(
    (file) => path.extname(file) === '.mdx' && file.includes(slug)
  );

  if (!blogFile) {
    return undefined;
  }

  return parseBlogFile(blogFile);
};
