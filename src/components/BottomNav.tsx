import { Home, PenBox, Search } from "lucide-react";
import Link from "next/link";

const BottomNav = () => {
  return (
    <nav className='flex items-center justify-around z-50 lg:hidden px-5 py-3 fixed bottom-0 inset-x-0 bg-gray-50 dark:bg-gray-950'>
      <Link href='/'>
        <Home width={30} height={30} />
      </Link>
      <Link href='/search'>
        <Search width={30} height={30} />
      </Link>
      <Link href='/pin-builder'>
        <PenBox />
      </Link>
    </nav>
  );
};

export default BottomNav;
