"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";
import toast from "react-hot-toast";

const SaveBtn = ({ pinId, saveIds }: { pinId: string; saveIds: string[] }) => {
  const { data: session } = useSession();
  const isSaved = saveIds.includes(session?.user.id as string);
  const router = useRouter();

  const handleSave = async (e: MouseEvent) => {
    e.stopPropagation();
    try {
      await fetch("/api/pin/save", {
        method: isSaved ? "DELETE" : "POST",
        body: JSON.stringify({ pinId, userId: session?.user.id }),
      });

      router.refresh();
    } catch (error) {
      toast.error("Failed to save this pin!");
    }
  };

  return (
    <button
      onClick={handleSave}
      className={`px-5 py-2 rounded-full ${
        isSaved
          ? "bg-gray-800 hover:bg-gray-700"
          : "bg-red-600 hover:bg-red-500"
      } text-white`}
    >
      {isSaved ? "Saved" : "Save"}
    </button>
  );
};

export default SaveBtn;
