"use client";

import { Pin } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DeleteBtn, SaveBtn } from ".";
import { ExternalLink } from "lucide-react";

const Pin = ({ pin }: { pin: Pin }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/pin/${pin.id}`)}
      className='relative rounded-md overflow-clip group cursor-zoom-in'
    >
      <div className='absolute bg-gray-100 dark:bg-gray-900 inset-0 z-[-1]'></div>
      <Image
        src={pin.imageUrl}
        alt='pin-img'
        width={pin.imageWidth}
        height={pin.imageHeight}
        className='object-cover'
      />
      <div className='absolute inset-0 z-20 p-3 bg-black/50 hidden group-hover:flex flex-col justify-between'>
        <div className='flex justify-between items-center'>
          <DeleteBtn pinId={pin.id} userId={pin.userId} />
          <SaveBtn pinId={pin.id} saveIds={pin.saveIds} />
        </div>
        <div>
          {pin.destination && (
            <Link
              onClick={(e) => e.stopPropagation()}
              href={pin.destination}
              target='_blank'
              className='bg-gray-200 dark:bg-gray-900 gap-2 p-2 rounded-full flex items-center w-fit text-sm'
            >
              <ExternalLink width={20} height={20} />
              visit image
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pin;
