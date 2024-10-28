import React, { useState } from "react";
import TableHeader from "./TableHeader";
import SingleProduct from "./SingleProduct";
import { Product } from "@/src/types/Product";
import AddressApiModal from "@/src/components/Client/Profile/ProfileSections/Addresses/AddressApiModal";
type PropType = {
  products: [] | Product[];
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
};
export default function ProductsTable({
  products,
  loading,
  setLoading,
}: PropType) {
  const [modal, setModal] = useState(false);
  const [resp, setResp] = useState<{
    status: number;
    success?: {
      message: string;
    };
    error?: {
      message: string;
    };
  } | null>(null);
  return (
    <div className="w-full flex items-center justify-center">
      {modal && (
        <AddressApiModal loading={loading} setModal={setModal} res={resp} dif />
      )}
      <table className="table">
        <TableHeader />
        <tbody>
          {products?.map((el, key) => (
            <SingleProduct
              product={el}
              key={key}
              setLoading={setLoading}
              setModal={setModal}
              setRes={setResp}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
