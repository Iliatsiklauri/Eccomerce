import { getAllUsersFromMessages } from "@/src/api/MessagesApi";
import { userType } from "@/src/store/features/usersSlice";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function LeftUsers() {
  const [chatUsers, setChatUsers] = useState<null | userType[]>(null);

  useEffect(() => {
    const getUsers = async () => {
      const users = await getAllUsersFromMessages();
      setChatUsers(users);
    };

    getUsers();
  }, []);

  const params = useSearchParams();
  const id = params.get("id");
  const router = useRouter();

  useEffect(() => {
    if (
      !id &&
      chatUsers &&
      chatUsers.length > 0 &&
      chatUsers[0].id !== undefined
    ) {
      router.push(`/admin/Messages?id=${chatUsers[0].id}`);
    }
  }, [id, router, chatUsers]);

  return (
    <div className="h-full overflow-y-auto flex-shrink-0 w-[25%] 2xl:w-[20%] border-black border-2 rounded-xl flex flex-col gap-3 p-2">
      {chatUsers &&
        chatUsers?.map((user: userType, key) => (
          <Link
            key={user.id}
            href={`/admin/Messages?id=${user.id}`}
            className={` w-full flex flex-col gap-3 `}
          >
            <div
              className={` w-full h-[55px] ${
                Number(id) === user.id ? "bg-slate-300" : "bg-slate-100 "
              } bg-slate-100 rounded-xl text-black p-2 flex items-center justify-start gap-3  text-sm`}
            >
              <Image
                src={"/icons/homepage/user.png"}
                alt="user"
                width={26}
                height={26}
              />
              <div className="flex flex-col">
                <p>
                  <span className="font-semibold">Fullname: </span>
                  {user.fullname}
                </p>
                <p>
                  <span className="font-semibold">Email: </span>
                  {user.email}
                </p>
              </div>
            </div>
            {key !== chatUsers.length - 1 && " border-b-2   border-b-black" && (
              <div className="w-ful h-[1px] bg-black bg-opacity-15"></div>
            )}
          </Link>
        ))}
    </div>
  );
}
