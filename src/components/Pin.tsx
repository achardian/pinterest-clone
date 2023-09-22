import { Pin } from "@prisma/client";
import Image from "next/image";

const Pin = ({ pin }: { pin: Pin }) => {
  return (
    <div className='relative rounded-md overflow-clip'>
      <div className='absolute bg-gray-100 dark:bg-gray-900 inset-0 z-[-1]'></div>
      <Image
        src={pin.imageUrl}
        alt='pin-img'
        width={pin.imageWidth}
        height={pin.imageHeight}
        className='object-cover'
      />
    </div>
  );
};

export default Pin;
