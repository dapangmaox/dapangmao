import Header from './components/header';
import ThemeProvider from './components/theme-provider';
import './globals.css';

export const metadata = {
  title: '大胖猫',
  description: '大胖猫的个人网站',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning={true}>
      <body className="text-slate-500 dark:text-slate-400 bg-white dark:bg-gray-900 flex flex-col items-center">
        <ThemeProvider>
          <Header />
          <main className="pt-16 px-4 sm:px-8 w-full max-w-3xl prose dark:prose-invert">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
