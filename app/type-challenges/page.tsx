import { getQuestionsMeta } from '@/lib/questions';
import Link from 'next/link';

export async function generateMetadata() {
  return {
    title: 'Type Challenges Solutions',
    description: 'Type Challenges Solutions',
    slug: 'type-challenges',
  };
}

const TypeChallengesPage = async () => {
  const questionsGroup = await getQuestionsMeta();

  if (!questionsGroup) {
    return <p className="mt-10 text-center">Sorry, no question available.</p>;
  }

  return (
    <div>
      <div className="mt-6">
        <h1 className="text-3xl">Type Challenges Solutions</h1>
      </div>
      <div className="text-2xl font-bold">问题列表</div>
      <section className="mt-6 mx-auto max-w-2xl">
        {questionsGroup.map((group) => (
          <div key={group.difficulty}>
            <h2 className="text-xl font-bold">{group.difficulty}</h2>
            <ul className="mt-2">
              {group.questions.map((question) => (
                <li key={question.id}>
                  <Link
                    href={`/type-challenges/${group.difficulty}/${question.id}`.replace(
                      '/README.md',
                      ''
                    )}
                  >
                    {question.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
};

export default TypeChallengesPage;
