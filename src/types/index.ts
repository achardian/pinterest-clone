import { Comment, Pin, User } from "@prisma/client";

type PinWithUser = Omit<Pin, "pin"> & {
  user: User;
};

export type CommentWithUser = Omit<Comment, "commentData"> & {
  user: User;
};

export type PinData = {
  pin: PinWithUser;
  comments: CommentWithUser[];
};
