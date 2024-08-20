import { getQuestionsMeta } from '@/lib/questions';

const TypeChallengesPage = async () => {
  const questions = await getQuestionsMeta();

  if (!questions) {
    return <p className="mt-10 text-center">Sorry, no question available.</p>;
  }

  return (
    <div>
      <div className="mt-6">
        <h1 className="text-3xl">Type Challenges Solutions</h1>
      </div>
      <div>分类：按顺序，按难度</div>
      <div>Question List</div>
      <section className="mt-6 mx-auto max-w-2xl">
        <ul className="w-full list-none p-0">
          {questions.map((question) => (
            <span key={question.filename}>{question.filename}</span>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default TypeChallengesPage;
