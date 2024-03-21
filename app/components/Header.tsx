import Link from 'next/link';
import React from 'react';
import ThemeSwitcher from './ThemeSwitcher';

const Header = () => {
  return (
    <div className="lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] bg-white/95 supports-backdrop-blur:bg-white/60 dark:bg-transparent">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex items-center justify-center">
            <Link href={'/'}>
              <span className="font-bold text-xl text-gray-900 dark:text-slate-50">
                大胖猫 ♥ Web
              </span>
            </Link>
          </div>
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
};

export default Header;
