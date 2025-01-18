import Header from "../components/header";
import ThemeProvider from "../components/theme-provider";
import "./globals.css";

export const metadata = {
  title: "大胖猫",
  description: "大胖猫的个人网站",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning={true}>
      <body className="flex flex-col items-center bg-background text-foreground">
        <ThemeProvider>
          <Header />
          <main className="prose w-full max-w-3xl px-4 pt-16 dark:prose-invert sm:px-8">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
