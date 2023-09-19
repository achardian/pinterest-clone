"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserCircle2 } from "lucide-react";

import { DropdownMenu, SearchBar } from ".";

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
  const user = false;

  return (
    <nav className='flex items-center py-2 px-5'>
      {/* logo */}
      <div className='p-3 rounded-full hover:bg-gray-50'>
        <Image
          src='/pinterest-logo.svg'
          alt='pinterest logo'
          width={25}
          height={25}
          className='rounded-full'
        />
      </div>
      {/* links: home, create */}
      <div className='flex items-center gap-2'>
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.path}
            className={`${
              link.path === pathName
                ? "bg-black text-white font-semibold rounded-full"
                : ""
            } py-2 px-5`}
          >
            {link.name}
          </Link>
        ))}
      </div>
      {/* search */}
      <SearchBar />
      {user ? (
        <div>
          {/* profile */}
          <div className='p-3 hover:bg-gray-50 rounded-full'>
            <UserCircle2 height={25} width={25} />
          </div>
          {/* dropdown menu */}
          <DropdownMenu />
        </div>
      ) : (
        <button className='py-2 px-6 rounded-full bg-red-600 hover:bg-red-500 text-white'>
          Sign In
        </button>
      )}
    </nav>
  );
};

export default Navbar;
