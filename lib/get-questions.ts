import matter from 'gray-matter';

type Filetree = {
  tree: {
    path: string;
  }[];
};

type Question = {
  id: string;
  title: string;
  content: string;
};

const Difficulty = ['easy', 'medium', 'hard', 'extreme'] as const;

async function fetchFromGitHub(
  url: string,
  headers: HeadersInit
): Promise<Response> {
  const res = await fetch(url, { headers });
  if (!res.ok) {
    console.error(`Failed to fetch ${url}: ${res.statusText}`);
    throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
  }
  return res;
}

async function getQuestionContent(
  filepath: string
): Promise<string | undefined> {
  const url = `https://api.github.com/repos/dapangmaox/type-challenges-solutions/contents/${filepath}`;
  const headers = {
    Accept: 'application/vnd.github.v3.raw',
    Authorization: `Bearer ${process.env.MY_GITHUB_TOKEN}`,
  };
  try {
    const res = await fetchFromGitHub(url, headers);
    return res.text();
  } catch {
    return undefined;
  }
}

export async function getQuestionByName(
  filepath: string
): Promise<Question | undefined> {
  const fileContent = await getQuestionContent(filepath);
  if (!fileContent || fileContent === '404: Not Found') return undefined;

  const { data, content } = matter(fileContent);
  const match = filepath.match(/^questions\/[^/]+\/([^/]+)\/README\.md$/);
  const id = match ? match[1] : filepath.replace(/\.mdx$/, '');

  return {
    id,
    title: data.title,
    content,
  };
}

async function fetchRepoFileTree(): Promise<Filetree | undefined> {
  const url =
    'https://api.github.com/repos/dapangmaox/type-challenges-solutions/git/trees/main?recursive=1';
  const headers = {
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${process.env.MY_GITHUB_TOKEN}`,
    'X-GitHub-Api-Version': '2022-11-28',
  };
  try {
    const res = await fetchFromGitHub(url, headers);
    return res.json();
  } catch {
    return undefined;
  }
}

export async function getQuestions(): Promise<
  | {
      difficulty: (typeof Difficulty)[number];
      questions: Question[];
    }[]
  | undefined
> {
  const repoFiletree = await fetchRepoFileTree();
  if (!repoFiletree) return undefined;

  const questionPromises = Difficulty.map(async (difficulty) => {
    const regex = new RegExp(`^questions/${difficulty}/[^/]+/README\\.md$`);
    const filesArray = repoFiletree.tree
      .filter((obj) => regex.test(obj.path))
      .map((obj) => obj.path);

    const questionResults = await Promise.all(
      filesArray.map((filepath) => getQuestionByName(filepath))
    );

    const metaList = questionResults.filter(
      (question): question is Question => question !== undefined
    );

    return {
      difficulty,
      questions: metaList,
    };
  });

  const questions = (await Promise.all(questionPromises)).sort(
    (a, b) =>
      Difficulty.indexOf(a.difficulty) - Difficulty.indexOf(b.difficulty)
  );

  return questions;
}
