"use client";

import { Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { MouseEvent } from "react";

const DeleteBtn = ({ userId, pinId }: { userId: string; pinId: string }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    router.push(`${pathname}?pin_id=${pinId}&delete_modal=y`);
  };

  if (session?.user.id !== userId) return null;

  return (
    <button
      onClick={handleClick}
      className='p-2 rounded-full bg-red-600 text-white'
    >
      <Trash />
    </button>
  );
};

export default DeleteBtn;
