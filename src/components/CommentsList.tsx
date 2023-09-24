"use client";

import useOpenCommentStore from "@/store/open-comment-store";
import { CommentWithUser } from "@/types";
import { ChevronBtn, Comment } from ".";

const CommentsList = ({ comments }: { comments: CommentWithUser[] }) => {
  const { isOpen } = useOpenCommentStore();

  return (
    <div className='px-5 mt-4'>
      <div className='flex items-center gap-2'>
        <h1>
          {comments.length > 1 ? `${comments.length} Comments` : "1 Comment"}
        </h1>
        {comments.length > 0 && <ChevronBtn />}
      </div>
      <div className={`${isOpen ? "block" : "hidden"}`}>
        {comments.length === 0 && <small>There is no comment yet!</small>}
        {comments.length > 0 &&
          comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
      </div>
    </div>
  );
};

export default CommentsList;
