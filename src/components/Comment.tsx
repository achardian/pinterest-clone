import { CommentWithUser } from "@/types";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";

const Comment = ({ comment }: { comment: CommentWithUser }) => {
  return (
    <div className='mb-2'>
      <div className='flex items-center gap-2'>
        <Image
          src={comment.user.image as string}
          alt='user-img'
          width={25}
          height={25}
          className='rounded-full'
        />
        <div className='flex flex-col'>
          <Link
            href={`/user/${comment.user.id}?variant=created`}
            className='text-[14px] font-semibold'
          >
            {comment.user.name}
          </Link>
          <small className='text-gray-400 text-[12px]'>
            {moment(comment.createdAt).fromNow()}
          </small>
        </div>
      </div>
      <p className='ml-8 text-[13px]'>{comment.comment}</p>
    </div>
  );
};

export default Comment;
