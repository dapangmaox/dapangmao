'use client';

import Link from 'next/link';

const Footer = () => {
  return (
    <div className="flex justify-center">
      <span>© 2023 大胖猫</span>
      <span className="ml-2 mr-2">|</span>
      <Link
        className="text-blue-400 hover:text-blue-500"
        href="https://beian.miit.gov.cn/"
        target="_blank"
      >
        冀ICP备2023022931号
      </Link>
    </div>
  );
};

export default Footer;
