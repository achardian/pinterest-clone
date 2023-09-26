"use client";

import { LogOut, MoreHorizontal } from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";

const DropdownMenu = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className='relative'
    >
      <button className='text-gray-900 dark:text-gray-50 rounded-full hover:bg-gray-50 hover:dark:bg-gray-800 p-3'>
        <MoreHorizontal width={20} height={20} />
      </button>
      {isHovered && (
        <div className='absolute z-30 top-10 right-0 p-2 border border-gray-100 dark:border-gray-900 dark:bg-gray-950 bg-white w-[200px] rounded-md shadow-sm'>
          <button
            onClick={() => signOut()}
            className='flex gap-3 text-red-600 w-full'
          >
            <LogOut />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
