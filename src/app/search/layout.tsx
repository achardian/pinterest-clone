import { SearchBar } from "@/components";

const SearchLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className='block lg:hidden'>
        <SearchBar />
      </div>
      {children}
    </div>
  );
};

export default SearchLayout;
