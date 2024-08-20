type FileTree = {
  tree: [
    {
      path: string;
    }
  ];
};

type Meta = {
  filename: string;
};

export async function getQuestionsMeta(): Promise<Meta[] | undefined> {
  const res = await fetch(
    'https://api.github.com/repos/dapangmaox/type-challenges/git/trees/master?recursive=1',
    {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'X-GitHub-Api-Version': '2022-11-28',
      },
    }
  );

  if (!res.ok) return undefined;

  const repoFileTree: FileTree = await res.json();

  const filesArray = repoFileTree.tree
    .map((obj) => obj.path)
    .filter((path) => path.endsWith('.md'));

  const files: Meta[] = [];

  for (const file of filesArray) {
    files.push({ filename: file });
  }

  return files;
}
