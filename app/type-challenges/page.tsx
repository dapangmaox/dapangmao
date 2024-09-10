import { getQuestions } from '@/lib/get-questions';
import Link from 'next/link';

export const revalidate = 3600;

const difficultyMap = {
  easy: '简单',
  medium: '中等',
  hard: '困难',
  extreme: '地狱',
};

export async function generateMetadata() {
  return {
    title: 'Type Challenges Solutions',
    description: 'Type Challenges Solutions',
    slug: 'type-challenges',
  };
}

const TypeChallengesPage = async () => {
  const questionsGroup = await getQuestions();

  if (!questionsGroup) {
    return <p className="mt-10 text-center">Sorry, no question available.</p>;
  }

  return (
    <div>
      <div className="mt-6">
        <h1 className="text-3xl">Type Challenges Solutions</h1>
      </div>
      <section className="mt-6 mx-auto max-w-2xl">
        {questionsGroup.map((group) => (
          <div key={group.difficulty}>
            <h2 className="text-xl font-bold">
              {difficultyMap[group.difficulty]}
            </h2>
            <div className="mt-2">
              {group.questions.map((question, index) => (
                <div key={question.id} className="flex items-center">
                  <span
                    className="mr-2"
                    style={{ minWidth: '2rem', textAlign: 'right' }}
                  >
                    {index + 1}.
                  </span>
                  <Link
                    href={`/type-challenges/${group.difficulty}/${question.id}`.replace(
                      '/README.md',
                      ''
                    )}
                  >
                    {question.title}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default TypeChallengesPage;
