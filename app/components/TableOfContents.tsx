import React from 'react';

type TocItem = {
  id: string;
  title: string;
  depth: number;
};

type Props = {
  toc: TocItem[];
};

const TableOfContents: React.FC<Props> = ({ toc }) => {
  return (
    <div className="w-64 sticky top-32 h-96 flex-shrink-0 ml-4 border pl-2 rounded border-slate-300 dark:border-slate-700">
      <div className="flex items-center justify-between mt-2">
        <div className="text-slate-500 dark:text-slate-300 text-xl">目录</div>
      </div>
      <div className="w-full border-b my-2 border-slate-300 dark:border-slate-700"></div>
      <div className="overflow-y-auto h-80 text-sm">
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
