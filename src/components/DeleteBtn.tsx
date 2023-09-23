"use client";

import { Trash } from "lucide-react";
import { useSession } from "next-auth/react";

const DeleteBtn = ({ userId }: { userId: string }) => {
  const { data: session } = useSession();

  if (session?.user.id !== userId) return null;

  return (
    <button className='p-2 rounded-full bg-red-600 text-white'>
      <Trash />
    </button>
  );
};

export default DeleteBtn;
