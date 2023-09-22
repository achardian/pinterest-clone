import { Pin } from "@prisma/client";
import Image from "next/image";

const Pin = ({ pin }: { pin: Pin }) => {
  return (
    <div className='relative rounded-md overflow-clip'>
      <div></div>
      <Image
        src={pin.imageUrl}
        alt='pin-img'
        width={400}
        height={pin.imageHeight}
        className='object-cover'
      />
    </div>
  );
};

export default Pin;
