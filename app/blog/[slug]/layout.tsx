const PostPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="flex min-h-screen flex-col md:ml-auto md:mr-auto mx-4 max-w-3xl prose dark:prose-invert">
        <article>{children}</article>
      </main>
    </>
  );
};

export default PostPageLayout;
