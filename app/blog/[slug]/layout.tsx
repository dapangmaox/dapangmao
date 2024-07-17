const PostPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="min-h-screen md:ml-auto md:mr-auto mx-4 max-w-5xl prose dark:prose-invert flex">
        {children}
      </main>
    </>
  );
};

export default PostPageLayout;
