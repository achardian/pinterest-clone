"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import Image from "next/image";

const AuthModal = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dialogParams = searchParams.get("dialog");
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (dialogParams === "y") {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [dialogParams]);

  return (
    <dialog
      className='relative overflow-hidden border-none outline-none rounded-md w-full lg:w-2/5'
      onClick={() => router.push("/")}
      ref={dialogRef}
    >
      <div className='bg-white dark:bg-black p-5 shadow-sm flex flex-col justify-center items-center text-center'>
        <Image
          src='/pinterest-logo.svg'
          alt='Pinterest Logo'
          width={35}
          height={35}
          className='mb-5'
        />
        <h1 className='text-2xl font-bold'>Welcome to Pinterest</h1>
        <p className='italic'>Discover new ideas to try</p>
        <button className='flex items-center justify-center gap-3 w-full py-2 border border-gray-200 dark:border-gray-900 rounded-full mt-5'>
          Continue With Google
          <Image
            src='/google-icon.svg'
            alt='Google Icon'
            width={23}
            height={23}
          />
        </button>
      </div>
      <Link
        href='/'
        className='absolute top-0 right-0 p-2 rounded-full bg-gray-100 dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-950'
      >
        <X />
      </Link>
    </dialog>
  );
};

export default AuthModal;
