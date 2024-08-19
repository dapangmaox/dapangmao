'use client';

import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme: activeTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div>
      {mounted && activeTheme === 'dark' ? (
        <SunIcon
          className="h-6 w-6 cursor-pointer text-yellow-400"
          onClick={() => setTheme('light')}
        />
      ) : (
        <MoonIcon
          className="h-6 w-6 cursor-pointer text-slate-700"
          onClick={() => setTheme('dark')}
        />
      )}
    </div>
  );
};

export default ThemeSwitcher;
