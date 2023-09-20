"use client";

import { UploadCloud } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRef } from "react";

const PinBuilder = () => {
  const { data: session } = useSession();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className='w-full h-screen bg-gray-200 dark:bg-gray-950 flex items-center justify-center'>
      <div className='w-full lg:w-3/5 p-5 bg-white dark:bg-gray-900 rounded-lg flex flex-col lg:flex-row gap-5'>
        <div className='flex-1'>
          <div className='w-full h-[450px] bg-gray-100 dark:bg-gray-800 p-3 rounded-lg'>
            <div className='w-full h-full rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-900 flex items-center justify-center'>
              <button className='flex flex-col justify-center items-center text-gray-500 w-full h-full'>
                <UploadCloud />
                Click to upload
              </button>
            </div>
          </div>
          <input
            type='url'
            placeholder='add image url'
            className='mt-3 w-full rounded-full outline-none border-none py-2 px-3 bg-gray-100 dark:bg-gray-800'
          />
        </div>
        <form className='w-full lg:w-3/5 flex flex-col lg:pr-5'>
          <input type='file' hidden ref={fileInputRef} accept='image/*' />
          <input
            type='text'
            placeholder='Add title'
            className='create-input text-3xl font-bold p-2 lg:mt-5'
          />
          <div className='flex items-center gap-3 my-10 px-3'>
            <Image
              src={session?.user.image as string}
              alt='user-img'
              width={40}
              height={40}
              className='rounded-full'
            />
            <p>{session?.user.name}</p>
          </div>
          <input
            type='text'
            placeholder='Tell people what your pin is about'
            className='create-input text-basis p-2 lg:mt-5'
          />
          <input
            type='text'
            placeholder='Add destination link'
            className='create-input text-basis p-2 lg:mt-auto'
          />
          <button className='px-5 py-2 mt-3 ml-auto bg-red-600 hover:bg-red-500 text-white rounded-full'>
            Publish
          </button>
        </form>
      </div>
    </div>
  );
};

export default PinBuilder;
