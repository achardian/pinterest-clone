"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

const DeleteModal = () => {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const deleteModal = searchParams.get("delete_modal");
  const pinId = searchParams.get("pin_id");

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/pin/${pinId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      toast.success("Successfully Delete Pin!");
    } catch (error) {
      toast.error("Failed to delete this pin!");
    } finally {
      router.push(pathname);
      router.refresh();
    }
  };

  useEffect(() => {
    if (deleteModal === "y") {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [deleteModal]);

  return (
    <dialog
      ref={modalRef}
      className='border-none outline-none bg-white dark:bg-gray-950 p-5 rounded-md'
    >
      <h1 className='text-xl font-bold'>
        Are you sure, You want to delete this pin?
      </h1>
      <div className='flex justify-end gap-5 items-center mt-6'>
        <button
          onClick={() => router.push(`${pathname}`)}
          className='p-3 border border-gray-200 dark:border-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md font-semibold'
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          className='py-3 px-5 rounded-md bg-red-600 hover:bg-red-500 text-white font-semibold'
        >
          Yes
        </button>
      </div>
    </dialog>
  );
};

export default DeleteModal;
