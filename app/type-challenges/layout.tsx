const TypeChallengesPageLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <div className="mx-auto max-w-5xl px-6 lg:px-8 text-slate-950 prose dark:prose-invert">
        {children}
      </div>
    </>
  );
};

export default TypeChallengesPageLayout;
