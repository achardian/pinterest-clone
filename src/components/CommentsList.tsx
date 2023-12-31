"use client";

import useOpenCommentStore from "@/store/open-comment-store";
import { CommentWithUser } from "@/types";
import { ChevronBtn, Comment } from ".";

const CommentsList = ({ comments }: { comments: CommentWithUser[] }) => {
  const { isOpen } = useOpenCommentStore();

  return (
    <div className='px-5 mt-4 mb-12 lg:mb-2'>
      <div className='flex items-center gap-2'>
        <h1>
          {comments.length > 1
            ? `${comments.length} Comments`
            : `${comments.length === 1 ? "1 Comment" : "Comment"}`}
        </h1>
        {comments.length > 0 && <ChevronBtn />}
      </div>
      {comments.length === 0 && <small>There is no comment yet!</small>}
      <div className={`${isOpen ? "block" : "hidden"}`}>
        {comments.length > 0 &&
          comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
      </div>
    </div>
  );
};

export default CommentsList;
