import { compileMDX } from 'next-mdx-remote/rsc';
import { JSXElementConstructor, ReactElement } from 'react';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';

type Filetree = {
  tree: {
    path: string;
  }[];
};

type QuestionMeta = {
  id: string;
  title: string;
};

type Question = {
  meta: QuestionMeta;
  content: ReactElement<any, string | JSXElementConstructor<any>>;
};

const Difficulty = ['easy', 'medium', 'hard'] as const;

async function getQuestionContent(
  fileName: string
): Promise<string | undefined> {
  const url = `https://api.github.com/repos/dapangmaox/type-challenges-solutions/contents/${fileName}`;
  const res = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github.v3.raw',
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  });

  if (!res.ok) {
    console.error(`Failed to fetch ${fileName}: ${res.statusText}`);
    return undefined;
  }

  return res.text();
}

export async function getQuestionByName(
  fileName: string
): Promise<Question | undefined> {
  const rawMDX = await getQuestionContent(fileName);
  if (!rawMDX || rawMDX === '404: Not Found') return undefined;

  const { frontmatter, content } = await compileMDX<{
    title: string;
  }>({
    source: rawMDX,
    components: {},
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              properties: {
                className: ['anchor'],
              },
            },
            { behaviour: 'wrap' },
          ],
          rehypeCodeTitles,
          [rehypePrettyCode as any, {}],
        ],
      },
    },
  });

  const match = fileName.match(/^questions\/[^/]+\/([^/]+)\/README\.md$/);
  const id = match ? match[1] : fileName.replace(/\.mdx$/, '');

  return {
    meta: {
      id,
      title: frontmatter.title,
    },
    content,
  };
}

async function fetchRepoFileTree(): Promise<Filetree | undefined> {
  const url =
    'https://api.github.com/repos/dapangmaox/type-challenges-solutions/git/trees/main?recursive=1';
  const res = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });

  if (!res.ok) {
    console.error(`Failed to fetch file tree: ${res.statusText}`);
    return undefined;
  }

  return res.json();
}

export async function getQuestionsMeta(): Promise<
  | {
      difficulty: (typeof Difficulty)[number];
      questions: QuestionMeta[];
    }[]
  | undefined
> {
  const repoFiletree = await fetchRepoFileTree();
  if (!repoFiletree) return undefined;

  const questions: {
    difficulty: (typeof Difficulty)[number];
    questions: QuestionMeta[];
  }[] = [];

  await Promise.all(
    Difficulty.map(async (difficulty) => {
      const regex = new RegExp(`^questions/${difficulty}/[^/]+/README\\.md$`);
      const filesArray = repoFiletree.tree
        .filter((obj) => regex.test(obj.path))
        .map((obj) => obj.path);

      const questionPromises = filesArray.map((file) =>
        getQuestionByName(file)
      );

      const questionResults = await Promise.all(questionPromises);

      const metaList = questionResults
        .filter((post): post is Question => post !== undefined)
        .map((post) => post.meta);

      if (metaList.length > 0) {
        questions.push({
          difficulty,
          questions: metaList,
        });
      }
    })
  );

  return questions;
}
