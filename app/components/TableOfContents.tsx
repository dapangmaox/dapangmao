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
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="w-64 sticky top-32 h-96 flex-shrink-0 ml-4 border p-2 rounded">
      <div className="flex items-center justify-between">
        <div className="text-slate-500 text-xl">目录</div>
        <button
          className="text-sm text-blue-500"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? '收起' : '展开'}
        </button>
      </div>
      <div className="w-full border-b my-3"></div>
      {isExpanded && (
        <div className="overflow-y-auto h-80 text-sm">
          {toc.map((item) => (
            <div key={item.id} style={{ marginLeft: `${item.depth - 2}em` }}>
              <a
                href={`#${item.id}`}
                className="no-underline text-slate-500 my-2 block"
              >
                {item.title}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TableOfContents;
