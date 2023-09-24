"use client";

import useOpenCommentStore from "@/store/open-comment-store";
import { ChevronDown, ChevronUp } from "lucide-react";

const ChevronBtn = () => {
  const { isOpen, setIsOpen } = useOpenCommentStore();

  return (
    <button
      onClick={() => setIsOpen(isOpen ? false : true)}
      className='p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full'
    >
      {isOpen ? <ChevronUp /> : <ChevronDown />}
    </button>
  );
};

export default ChevronBtn;
