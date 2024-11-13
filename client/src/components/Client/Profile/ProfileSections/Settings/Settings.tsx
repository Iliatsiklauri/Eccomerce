import { deleteUserApi, updateUserApi } from "@/src/api/UsersApi";
import ProductInput from "@/src/components/Admin/RightPanel/AdminSections/Products/CreateProduct/ProductInput";
import { UpdateUserType, updateUser } from "@/src/utils/auth";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import AddressApiModal from "../Addresses/AddressApiModal";
import { user } from "@/src/types/User";
import { useRouter } from "next/navigation";

type PropType = {
  user: user | null;
};

export default function Settings({ user }: PropType) {
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userModal, setUserModal] = useState(false);
  const [userModalLoading, setUserModalLoading] = useState(false);
  const [response, setResponse] = useState<null | {
    status: number;
    success?: {
      message: string;
    };
    error?: {
      message: string;
    };
  }>(null);

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<UpdateUserType>({
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  useEffect(() => {
    reset({
      email: user?.email,
      fullname: user?.fullname,
      password: "********",
    });
  }, [user, reset]);

  const handleSubmition = async (data: UpdateUserType) => {
    let newData = data;
    if (data.password === "********") {
      newData = {
        email: data.email,
        fullname: data.fullname,
      };
    }
    let res;
    setLoading(true);
    console.log(newData);
    if (user?.id) {
      res = await updateUserApi(user.id, newData);
    }
    setLoading(false);
    setResponse(res);
    setModal(true);
  };

  return (
    <div className="w-full h-full flex items-start justify-start p-3 flex-col gap-10">
      {modal && (
        <AddressApiModal loading={loading} setModal={setModal} res={response} />
      )}
      <form
        className="w-1/2 flex items-center justify-center flex-col gap-10"
        onSubmit={handleSubmit(handleSubmition)}
      >
        <Controller
          name="fullname"
          control={control}
          rules={updateUser.fullname}
          render={({ field }) => (
            <ProductInput
              field={field}
              label="Fullname"
              error={errors.fullname}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          rules={updateUser.email}
          render={({ field }) => (
            <ProductInput field={field} label="Email" error={errors.email} />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={updateUser.password}
          render={({ field }) => (
            <ProductInput
              field={field}
              label="New password"
              error={errors.password}
            />
          )}
        />
        <button className="w-full btn btn-success text-white text-2xl font-medium font-sans">
          SAVE
        </button>
      </form>
      <div
        className="w-1/2 h-[60px] btn btn-error text-xl text-white bg-red-500 hover:bg-red-600"
        onClick={() => {
          setUserModal(true);
        }}
      >
        Delete Account
      </div>
      {userModal && (
        <div className="w-full h-full fixed top-0 left-0 z-10 flex items-center justify-center">
          <div
            className="absolute w-full h-full bg-black bg-opacity-25"
            onClick={() => setUserModal(false)}
          ></div>
          <div className="w-[400px] mb-40 h-[200px] bg-slate-800 z-10 modal-box flex items-center justify-between flex-col">
            {userModalLoading ? (
              <div className="spinner"></div>
            ) : (
              <>
                <h1 className="text-white text-xl text-center">
                  Are you sure You want to delete your account ?{" "}
                </h1>
                <div className="w-full flex items-center justify-between ">
                  <button
                    className="btn w-[45%] text-white font-medium text-lg"
                    onClick={() => setUserModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn w-[45%] btn-error bg-red-500 text-white font-medium text-lg"
                    onClick={async () => {
                      setUserModalLoading(true);
                      if (user) {
                        await deleteUserApi(Number(user.id));
                      }
                      setUserModalLoading(false);
                      router.push("/auth");
                    }}
                  >
                    delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
