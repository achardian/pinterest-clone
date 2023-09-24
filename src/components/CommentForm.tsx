"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { Heart } from "lucide-react";
import { SyntheticEvent, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import useOpenCommentStore from "@/store/open-comment-store";

const CommentForm = ({ pinId }: { pinId: string }) => {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const { setIsOpen } = useOpenCommentStore();
  const router = useRouter();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/pin/comment", {
        method: "POST",
        body: JSON.stringify({ pinId, comment, userId: session?.user.id }),
      });

      const data = await res.json();
      router.refresh();
      setIsOpen(true);
      setComment("");
    } catch (error) {
      toast.error("Comment Failed!");
    }
  };

  if (!session?.user) return null;

  return (
    <form
      onSubmit={handleSubmit}
      className='static lg:sticky bottom-0 py-5 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-700 mt-auto px-5 flex flex-col'
    >
      <div className='mb-3 flex justify-between'>
        <h3>What's your thought?</h3>
        <button className='text-red-600'>
          <Heart />
        </button>
      </div>
      <div className='flex items-center gap-2'>
        <Image
          src={session?.user.image as string}
          alt='user-img'
          width={27}
          height={27}
          className='rounded-full'
        />
        <input
          type='text'
          placeholder='add comment'
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          className='flex-1 py-2 px-3 outline-none border-none bg-gray-100 dark:bg-gray-800 rounded-full'
        />
      </div>
    </form>
  );
};

export default CommentForm;
