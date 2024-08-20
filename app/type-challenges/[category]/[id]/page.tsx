import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote/rsc';
import matter from 'gray-matter';
import path from 'path';
import fs from 'fs';

interface QuestionPageProps {
  params: {
    category: string;
    id: string;
  };
}

export default async function QuestionPage({ params }: QuestionPageProps) {
  const { category, id } = params;

  const url = `https://raw.githubusercontent.com/dapangmaox/type-challenges-fork/main/questions/${category}/${id}/README.md`;

  const response = await fetch(url);
  if (!response.ok) {
    return <div>Error loading content</div>;
  }
  const fileContent = await response.text();

  const { content } = matter(fileContent);
  const mdxSource = await serialize(content);

  return <MDXRemote source={mdxSource} />;
}

export async function generateStaticParams() {
  const baseDir = path.join(process.cwd(), 'questions');

  // Ensure the directory exists
  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
  }

  const categories = fs.readdirSync(baseDir);
  let paths: { category: string; id: string }[] = [];

  categories.forEach((category) => {
    const categoryDir = path.join(baseDir, category);
    const ids = fs.readdirSync(categoryDir);

    ids.forEach((id) => {
      paths.push({ category, id });
    });
  });

  return paths;
}
