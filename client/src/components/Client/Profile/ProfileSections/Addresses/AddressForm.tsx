import ProductInput from "@/src/components/Admin/RightPanel/AdminSections/Products/CreateProduct/ProductInput";
import { Address } from "@/src/types/Address";
import { createAddressValidation } from "@/src/utils/CreateAddressValidation";
import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import AdditionalInfoInput from "./AdditionalInfoInput";

type PropType = {
  handleSubmit: () => Promise<void>;
  control: Control<Address>;
  errors: FieldErrors<Address>;
};

export default function AddressForm({
  handleSubmit,
  control,
  errors,
}: PropType) {
  return (
    <form
      className="w-[40%] h-full flex flex-col items-center justify-start p-3 gap-6"
      onSubmit={handleSubmit}
    >
      <Controller
        name="name"
        control={control}
        rules={createAddressValidation.name}
        render={({ field }) => (
          <ProductInput label="Name" field={field} error={errors.name} />
        )}
      />

      <Controller
        name="additionalInfo"
        rules={createAddressValidation.additionalInfo}
        control={control}
        render={({ field }) => (
          <AdditionalInfoInput
            error={errors?.additionalInfo}
            field={field}
            label="Additional Information"
          />
        )}
      />

      <button className="w-full btn btn-success">Submit</button>
    </form>
  );
}
