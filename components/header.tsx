import Link from "next/link";
import React from "react";
import ThemeSwitcher from "./theme-switcher";

const Header = () => {
  return (
    <div className="fixed left-0 top-0 h-16 w-full bg-background/95 shadow-md">
      <div className="mx-auto max-w-7xl px-4">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex items-center justify-center">
            <Link href={"/"}>
              <span className="text-xl font-bold">大胖猫 ♥ Web</span>
            </Link>
          </div>
          <div className="flex items-center">
            {/* <Link
              href={"/"}
              className="mr-6 hover:text-gray-500 dark:hover:text-slate-300"
            >
              Posts
            </Link>
            <Link
              href={"/projects"}
              className="mr-6 hover:text-gray-500 dark:hover:text-slate-300"
            >
              Projects
            </Link>
            <Link
              href={"/type-challenges"}
              className="mr-6 hover:text-gray-500 dark:hover:text-slate-300"
            >
              Type-Challenges
            </Link> */}
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
