"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { Heart } from "lucide-react";
import { SyntheticEvent, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import useOpenCommentStore from "@/store/open-comment-store";

const CommentForm = ({
  pinId,
  likeIds,
}: {
  pinId: string;
  likeIds: string[];
}) => {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const { setIsOpen } = useOpenCommentStore();
  const router = useRouter();
  const isLiked = likeIds.includes(session?.user.id as string);

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

  const handleLike = async () => {
    try {
      const res = await fetch("/api/pin/favorites", {
        method: isLiked ? "DELETE" : "POST",
        body: JSON.stringify({ pinId, userId: session?.user.id }),
      });

      router.refresh();
    } catch (error) {
      toast.error("Failed to like this pin!");
    }
  };

  if (!session?.user) return null;

  return (
    <form
      onSubmit={handleSubmit}
      className='static lg:sticky bottom-0 pt-5 pb-14 lg:py-5 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-700 mt-auto px-5 flex flex-col'
    >
      <div className='mb-3 flex justify-between'>
        <h3>What's your thought?</h3>
        <button
          type='button'
          onClick={handleLike}
          className='text-red-600 flex items-center gap-2'
        >
          {likeIds.length > 0 && (
            <small className='text-black dark:text-white'>
              {likeIds.length}
            </small>
          )}

          <Heart fill={isLiked ? "#C51605" : "transparent"} />
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
