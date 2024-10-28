import { updateUserApi } from "@/src/api/UsersApi";
import ProductInput from "@/src/components/Admin/RightPanel/AdminSections/Products/CreateProduct/ProductInput";
import { UpdateUserType, updateUser } from "@/src/utils/auth";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import AddressApiModal from "../Addresses/AddressApiModal";
import { user } from "@/src/types/User";

type PropType = {
  user: user | null;
};

export default function Settings({ user }: PropType) {
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
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
    <div className="w-full h-full flex items-start justify-start p-3">
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
    </div>
  );
}
