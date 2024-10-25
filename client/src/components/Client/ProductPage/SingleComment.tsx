import { deleteComment } from "@/src/api/CommentApi";
import { Comment } from "@/src/types/Comment";
import { user } from "@/src/types/User";
import Image from "next/image";
import React from "react";
type PropType = {
  comment: Comment;
  currentUser: user;
  setComments: React.Dispatch<React.SetStateAction<[] | Comment[]>>;
};
export default function SingleComment({
  comment,
  currentUser,
  setComments,
}: PropType) {
  return (
    <div
      key={comment.id}
      className="w-full flex items-start justify-center rounded-lg flex-col py-2 gap-2"
    >
      <div className="w-full flex items-center justify-center">
        <div className="w-full flex items-start justify-start gap-2 ">
          <Image
            src={"/icons/homepage/user.png"}
            width={25}
            height={25}
            alt="user photo"
          />
          <p className="font-semibold text-sm text-black">
            {comment.user?.fullname}
          </p>
        </div>
        <div className="flex-shrink-0 flex items-start justify-center h-full gap-3 cursor-pointer">
          <p className="text-xs ">
            {comment.createdAt.toLocaleString().slice(0, 10)}
          </p>
          {currentUser.role === "ADMIN" && (
            <Image
              onClick={async () => {
                await deleteComment({ id: comment.id });
                setComments((prev) =>
                  prev.filter((el) => el.id !== comment.id)
                );
              }}
              src={"/icons/adminPanel/delete.png"}
              width={20}
              height={20}
              alt="deleteComment"
            />
          )}
        </div>
      </div>
      <p className="text-black">{comment.content}</p>
    </div>
  );
}
