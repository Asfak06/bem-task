import React, { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();

  const isActive = (pathname: string) => router.pathname === pathname;

  return (
    <div>
      <nav className="bg-gray-800 text-white p-4">
        <ul className="flex space-x-4 justify-center text-lg">
          <li className={ isActive('/') ? 'font-bold' : ''}>
            <Link href="/">
              <span className={`hover:text-gray-300 ${ isActive('/') ? 'underline' : ''}`}>Home</span>
            </Link>
          </li>
          <li className={isActive('/profile') ? 'font-bold' : ''}>
            <Link href="/profile">
              <span className={`hover:text-gray-300 ${isActive('/profile') ? 'underline' : ''}`}>Profile</span>
            </Link>
          </li>
        </ul>
      </nav>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
