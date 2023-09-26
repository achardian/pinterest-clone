"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";

const SearchBar = () => {
  const [text, setText] = useState("");
  const router = useRouter();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    router.push(`/search?query=${text.toLowerCase()}`);
    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='hidden lg:flex items-center gap-2 flex-1 bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-2'
    >
      <Search className='text-gray-300' />
      <input
        type='text'
        placeholder='search'
        className='outline-none border-nonen bg-transparent w-full'
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
    </form>
  );
};

export default SearchBar;
