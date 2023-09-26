import { CommentForm, CommentsList, DeleteBtn, SaveBtn } from "@/components";
import fetchData from "@/lib/fetch-data";
import { PinData } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ExternalLink } from "lucide-react";

const getPin = async (id: string) => {
  const data = await fetchData(`/pin/${id}`, "GET", "", "no-cache");
  return data;
};

const PinDetail = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions);
  const { pin, comments }: PinData = await getPin(params.id);

  return (
    <div className='w-full h-fit py-5'>
      <div className='w-full h-full bg-white dark:bg-gray-950 md:w-4/5 flex flex-col md:flex-row mx-auto rounded-xl overflow-clip shadow-md'>
        <div className='flex-1 relative h-fit group'>
          <Image
            src={pin.imageUrl}
            alt='pin-img'
            width={pin.imageWidth}
            height={pin.imageHeight}
          />
          <Link
            href={pin.imageUrl}
            target='_blank'
            className='p-3 absolute top-3 left-3 bg-black z-10 rounded-full hidden items-center gap-3 group-hover:flex'
          >
            <ExternalLink />
            Visit image
          </Link>
        </div>
        <div className='relative flex-1 pt-2 lg:pt-8 flex flex-col gap-3'>
          <div className='ml-auto px-5 flex gap-3'>
            {pin.user.id === session?.user.id && (
              <DeleteBtn pinId={pin.id} userId={session.user.id} />
            )}
            <SaveBtn saveIds={pin.saveIds} pinId={pin.id} />
          </div>
          <h1 className='text-2xl capitalize lg:text-3xl font-bold px-5'>
            {pin.title}
          </h1>
          <p className='px-5 normal-case'>{pin.description}</p>
          <div className='flex items-center gap-3 flex-wrap mt-3 px-5'>
            {pin.tags?.map((tag) => (
              <Link
                key={tag}
                href={`/search?query=${tag}`}
                className='px-5 py-2 rounded-full capitalize bg-gray-50 dark:bg-gray-800 text-[13px]'
              >
                {tag}
              </Link>
            ))}
          </div>
          <Link
            href={`/user/${pin.user.id}?variant=created`}
            className='mt-10 flex gap-3 items-center px-5'
          >
            <Image
              src={pin.user.image as string}
              alt='user-img'
              width={40}
              height={40}
              className='rounded-full'
            />
            <h2>{pin.user.name}</h2>
          </Link>
          <CommentsList comments={comments} />
          <CommentForm pinId={pin.id} likeIds={pin.likeIds} />
        </div>
      </div>
    </div>
  );
};

export default PinDetail;
