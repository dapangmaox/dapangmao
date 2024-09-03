const TypeChallengesPageLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <div className="mx-auto max-w-5xl  prose dark:prose-invert">
        {children}
      </div>
    </>
  );
};

export default TypeChallengesPageLayout;
