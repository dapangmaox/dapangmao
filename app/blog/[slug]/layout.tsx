const PostPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="flex min-h-screen flex-col ml-auto mr-auto max-w-3xl prose dark:prose-invert">
        <article>{children}</article>
      </main>
    </>
  );
};

export default PostPageLayout;
