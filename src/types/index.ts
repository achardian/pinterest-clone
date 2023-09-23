import { Comment, Pin, User } from "@prisma/client";

type PinWithUser = Omit<Pin, "pin"> & {
  user: User;
};

type CommentWithUser = Omit<Comment, "comment"> & {
  user: User;
};

export type PinData = {
  pin: PinWithUser;
  comments: CommentWithUser[];
};
