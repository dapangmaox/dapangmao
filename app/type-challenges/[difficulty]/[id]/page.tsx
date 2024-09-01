import { getQuestionByName, getQuestionsMeta } from '@/lib/questions';

interface QuestionPageProps {
  params: {
    difficulty: string;
    id: string;
  };
}

export default async function QuestionPage({
  params: { difficulty, id },
}: QuestionPageProps) {
  const question = await getQuestionByName(
    `questions/${difficulty}/${id}/README.md`
  );

  if (!question) {
    return <div>Error loading content</div>;
  }
  const { meta, content } = question;
  return (
    <>
      <h2 className="text-3xl mt-4 mb-0">{meta.title}</h2>
      <article>{content}</article>
    </>
  );
}

export async function generateStaticParams() {
  const questions = await getQuestionsMeta();

  if (!questions) return [];

  const params = [];

  for (const question of questions) {
    for (const q of question.questions) {
      params.push({
        difficulty: question.difficulty,
        id: q.id,
      });
    }
  }

  return params;
}

// export async function generateMetadata({
//   params: { difficulty, id },
// }: QuestionPageProps) {
//   const question = await getQuestionContent(
//     `questions/${difficulty}/${id}/README.md`
//   );

//   if (!question) {
//     return {
//       title: 'Post Not Found',
//     };
//   }

//   return {
//     title: id,
//   };
// }
