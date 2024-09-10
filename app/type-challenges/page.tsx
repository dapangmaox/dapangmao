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
        <h1 className="text-3xl text-center">Type Challenges Solutions</h1>
        <p>
          <a
            href="https://github.com/type-challenges/type-challenges"
            className="text-blue-600 hover:text-blue-800 no-underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Type Challenges
          </a>{' '}
          是一个开源项目，旨在通过一系列的 TypeScript
          类型体操挑战来帮助开发者更好地理解和掌握 TypeScript
          的类型系统。这个项目包含了各种难度的挑战，从基础到高级，涵盖了
          TypeScript 类型系统的各个方面。
        </p>
        <p>
          这个页面记录了我刷的一些题目，不止是简单的给出答案，也包括具体的思考过程、踩的坑和每道题用到的
          TypeScript 知识点。希望这些解答能帮助你更好地理解 TypeScript
          类型系统。
        </p>
      </div>
      <section className="mt-6">
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
