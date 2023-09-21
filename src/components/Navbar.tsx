"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import { DropdownMenu, SearchBar, ThemeToggle } from ".";

const Navbar = () => {
  const links = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Create",
      path: "/pin-builder",
    },
  ];

  const pathName = usePathname();
  const { data: session } = useSession();

  return (
    <nav className='flex items-center gap-2 py-2 px-5 sticky top-0 z-50 bg-white dark:bg-[#040D12]'>
      {/* logo */}
      <Link
        href='/'
        className='p-3 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800'
      >
        <Image
          src='/pinterest-logo.svg'
          alt='pinterest logo'
          width={25}
          height={25}
          className='rounded-full'
        />
      </Link>
      {/* links: home, create */}
      <div className='hidden lg:flex items-center gap-2'>
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.path}
            className={`${
              link.path === pathName
                ? "bg-black dark:bg-gray-800 text-white rounded-full"
                : ""
            } font-semibold py-2 px-5`}
          >
            {link.name}
          </Link>
        ))}
      </div>
      {/* search */}
      <SearchBar />
      <ThemeToggle />
      {session?.user ? (
        <div className='flex'>
          {/* profile */}
          <div className='p-2 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 rounded-full'>
            <Image
              src={session.user.image as string}
              alt='user-img'
              width={25}
              height={25}
              className='rounded-full'
            />
          </div>
          {/* dropdown menu */}
          <DropdownMenu />
        </div>
      ) : (
        <Link
          href='/?dialog=y'
          className='py-2 px-6 rounded-full bg-red-600 hover:bg-red-500 text-white'
        >
          Sign In
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
