'use client';

import React, { useState } from 'react';

type TocItem = {
  id: string;
  title: string;
  depth: number;
};

type Props = {
  toc: TocItem[];
};

const TableOfContents: React.FC<Props> = ({ toc }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex-shrink-0 border pl-2 rounded border-slate-300 dark:border-slate-700">
      <div className="flex items-center justify-between my-1">
        <div className="text-slate-500 dark:text-slate-300">目录</div>
        <button
          onClick={toggleExpand}
          className="text-slate-500 dark:text-slate-300 text-sm mr-2"
        >
          {isExpanded ? '折叠' : '展开'}
        </button>
      </div>
      <div className={`text-sm ${isExpanded ? 'block' : 'hidden'}`}>
        <div className="w-full border-b my-2 border-slate-300 dark:border-slate-700"></div>
        {toc.map((item) => (
          <div key={item.id} style={{ marginLeft: `${item.depth - 2}em` }}>
            <a
              href={`#${item.id}`}
              className="no-underline text-slate-500 dark:text-slate-300 my-2 block"
            >
              {item.title}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOfContents;
