import dayjs from 'dayjs';
import fs from 'fs/promises';
import matter from 'gray-matter';
import path from 'path';

export type Post = {
  title: string;
  slug: string;
  tags: string[];
  description: string;
  body: string;
  createdDate: Date;
  lastModified?: number;
  views?: number;
};

const POSTS_DIR = 'posts/';

const parsePostFile = async (file: string): Promise<Post> => {
  const filePath = path.join(POSTS_DIR, file);
  const postContent = await fs.readFile(filePath, 'utf8');
  const { data, content } = matter(postContent);

  return {
    ...data,
    slug: file.substring(0, file.lastIndexOf('.')).substring(11),
    body: content,
    createdDate: dayjs(file.substring(0, 10), 'YYYY-MM-DD').toDate(),
    tags: data.tags || [],
  } as Post;
};

export const getPosts = async (): Promise<Post[]> => {
  const files = await fs.readdir(POSTS_DIR);
  const postFiles = files.filter((file) => path.extname(file) === '.mdx');
  return Promise.all(postFiles.map(parsePostFile));
};

export const getPost = async (slug: string): Promise<Post | undefined> => {
  const files = await fs.readdir(POSTS_DIR);

  const postFile = files.find(
    (file) => path.extname(file) === '.mdx' && file.includes(slug)
  );

  if (!postFile) {
    return undefined;
  }

  return parsePostFile(postFile);
};
