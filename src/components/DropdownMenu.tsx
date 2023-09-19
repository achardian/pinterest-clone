"use client";

import { MoreHorizontal } from "lucide-react";
import { useState } from "react";

const DropdownMenu = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className='relative'
    >
      <button className='text-gray-900 rounded-full hover:bg-gray-50 p-3'>
        <MoreHorizontal width={20} height={20} />
      </button>
      {isHovered && (
        <div className='absolute top-10 right-0 p-2 border border-gray-100 bg-white w-[200px] rounded-md shadow-sm'>
          test
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
