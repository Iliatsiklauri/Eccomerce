import { createComment } from "@/src/api/CommentApi";
import { Comment, commentForm } from "@/src/types/Comment";
import { Product } from "@/src/types/Product";
import { createCommentValidation } from "@/src/utils/CreateCommentValidation";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SingleComment from "./SingleComment";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import { user } from "@/src/types/User";

type PropType = {
  product: Product | null;
  id: string;
};
export default function ProductComments({ product, id }: PropType) {
  const [comments, setComments] = useState<Comment[] | []>([]);

  useEffect(() => {
    if (product?.comments) {
      setComments(product.comments);
    }
  }, [product]);

  const user = useSelector((state: RootState) => state.auth);
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<commentForm>({ defaultValues: { content: "" } });

  const handleCommentSubmit = async (data: commentForm) => {
    const currentUser = user as unknown as user | null;
    const newComment = {
      id: 1,
      content: data.content,
      user: currentUser,
      product,
      createdAt: new Date().toLocaleString().slice(0, 10),
    };
    setComments((prevComments) => [...prevComments, newComment]);

    await createComment({ id, content: data.content });
    reset();
  };

  return (
    <div className="flex items-start justify-center flex-col w-1/2 gap-4">
      <h2 className="text-black text-2xl font-medium">Comments</h2>
      <div className="w-full h-[1px] bg-black bg-opacity-15"></div>
      <div className="w-full flex items-start justify-center flex-col gap-2">
        {comments.length !== 0 &&
          comments.map((el: Comment) => (
            <SingleComment
              setComments={setComments}
              comment={el}
              key={el.id}
              currentUser={user as unknown as user}
            />
          ))}
      </div>
      <form className="w-full" onSubmit={handleSubmit(handleCommentSubmit)}>
        <Controller
          name="content"
          control={control}
          rules={createCommentValidation.content}
          render={({ field }) => (
            <div className="w-full relative">
              <input
                {...field}
                type="text"
                placeholder={`${
                  comments.length === 0
                    ? "Be first to comment !"
                    : "Add a comment !"
                }`}
                className={` w-full rounded-lg h-[50px] bg-lightWhite px-4 focus:outline-none text-black ${
                  errors.content?.message && "border-red-500 border-[1px]"
                } `}
              />
              <p className="absolute right-0 text-xs text-red-500 font-normal">
                {errors.content?.message && errors.content?.message}
              </p>
            </div>
          )}
        />
      </form>
    </div>
  );
}
