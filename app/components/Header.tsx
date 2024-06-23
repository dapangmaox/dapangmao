import Link from 'next/link';
import React from 'react';
import ThemeSwitcher from './ThemeSwitcher';

const Header = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-16 border-b border-slate-900/10 dark:border-slate-50/[0.06] bg-white/95 supports-backdrop-blur:bg-white/60 dark:bg-transparent">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex items-center justify-center">
            <Link href={'/'}>
              <span className="font-bold text-xl text-gray-900 dark:text-slate-50">
                大胖猫 ♥ Web
              </span>
            </Link>
          </div>
          <div className="flex items-center">
            <Link
              href={'/type-challenges'}
              className="mr-6 text-gray-900 dark:text-slate-100 dark:hover:text-slate-300 hover:text-gray-500"
            >
              type-challenges
            </Link>
            <Link
              href={'/projects'}
              className="mr-6 text-gray-900 dark:text-slate-100 dark:hover:text-slate-300 hover:text-gray-500"
            >
              Projects
            </Link>
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
