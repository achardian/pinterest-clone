"use client";

import useMounted from "@/hooks/use-mounted";
import { MoonStar, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const isMounted = useMounted();

  const changeTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!isMounted) return null;

  return (
    <button
      onClick={changeTheme}
      className='p-2 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 ml-auto'
    >
      {theme === "dark" ? <MoonStar /> : <Sun />}
    </button>
  );
};

export default ThemeToggle;
