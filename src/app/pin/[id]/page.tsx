import { ChevronBtn, Comment, CommentForm } from "@/components";
import fetchData from "@/lib/fetch-data";
import { PinData } from "@/types";
import { ChevronUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const getPin = async (id: string) => {
  const data = await fetchData(`/pin/${id}`, "GET", "", "no-cache");
  return data;
};

const PinDetail = async ({ params }: { params: { id: string } }) => {
  const { pin, comments }: PinData = await getPin(params.id);

  return (
    <div className='w-full h-fit py-5'>
      <div className='w-full h-full bg-white dark:bg-gray-950 md:w-4/5 flex flex-col md:flex-row mx-auto rounded-xl overflow-clip shadow-md'>
        <div className='flex-1'>
          <Image
            src={pin.imageUrl}
            alt='pin-img'
            width={pin.imageWidth}
            height={pin.imageHeight}
          />
        </div>
        <div className='relative flex-1 pt-2 lg:pt-8 flex flex-col gap-3'>
          <h1 className='text-2xl lg:text-3xl font-bold px-5'>{pin.title}</h1>
          <p className='px-5'>{pin.description}</p>
          <div className='flex items-center gap-3 flex-wrap mt-3 px-5'>
            {pin.tags?.map((tag) => (
              <Link
                key={tag}
                href={`/pins?tag=${tag}`}
                className='px-5 py-2 rounded-full bg-gray-50 dark:bg-gray-800'
              >
                {tag}
              </Link>
            ))}
          </div>
          <Link
            href={`/user/${pin.user.id}`}
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
          <div className='px-5 mt-4'>
            <div className='flex items-center gap-2'>
              <h1>{comments.length > 1 ? "Comments" : "Comment"}</h1>
              {comments.length > 0 && (
                <ChevronBtn commentsLength={comments.length} />
              )}
            </div>
            <div>
              {comments.length === 0 && <small>There is no comment yet!</small>}
              {comments.length > 0 &&
                comments.map((comment) => <Comment comment={comment} />)}
            </div>
          </div>
          <CommentForm pinId={pin.id} />
        </div>
      </div>
    </div>
  );
};

export default PinDetail;
