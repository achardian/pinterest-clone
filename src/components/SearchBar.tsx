"use client";

import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <form className='flex items-center gap-2 flex-1 bg-gray-100 rounded-full px-3 py-2'>
      <Search className='text-gray-300' />
      <input
        type='text'
        placeholder='search'
        className='outline-none border-nonen bg-transparent w-full'
      />
    </form>
  );
};

export default SearchBar;
