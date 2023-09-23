"use client";

import { ChevronDown, ChevronUp } from "lucide-react";

const ChevronBtn = ({ commentsLength }: { commentsLength: number }) => {
  return (
    <button className='p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full'>
      <ChevronDown />
    </button>
  );
};

export default ChevronBtn;
