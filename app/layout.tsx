import Footer from './components/Footer';
import Header from './components/Header';
import ThemeProvider from './components/ThemeProvider';
import './globals.css';

export const metadata = {
  title: '大胖猫',
  description: 'Liangxwei的个人博客',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning={true}>
      <body className="text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 flex flex-col min-h-screen">
        <ThemeProvider>
          <Header />
          <div className="grow">{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
