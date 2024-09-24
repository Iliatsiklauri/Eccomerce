import Image from "next/image";
import { useRef } from "react";
import CreateUser from "../../../modals/CreateUser";

export default function ProductSectionHeader() {
  const createModalRef = useRef<HTMLDialogElement>(null);
  return (
    <div className="w-full flex items-start justify-between p-4 bg bg-white rounded-xl h-[14%]">
      <h2 className=" text-white font-sans font-bold">Products</h2>
      <button
        className="btn text-white px-3 flex items-center justify-center gap-2"
        onClick={() => createModalRef.current?.showModal()}
      >
        <Image
          alt="plus"
          src={"/icons/adminPanel/plus.png"}
          width={30}
          height={30}
        />
        Add Product
      </button>
      <CreateUser createModalRef={createModalRef} />
    </div>
  );
}
