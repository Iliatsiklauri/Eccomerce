import { CreateProductType } from "@/src/types/Product";
import { createProductValidation } from "@/src/utils/CreateProductValidation";
import { Control, Controller, FieldErrors } from "react-hook-form";
import ProductInput from "./ProductInput";

type PropType = {
  control: Control<CreateProductType>;
  errors: FieldErrors<CreateProductType>;
};

export default function FormAmountPart({ control, errors }: PropType) {
  return (
    <div className="w-[30%] flex justify-between items-start flex-col gap-8">
      <Controller
        name={"inStock"}
        rules={createProductValidation.inStock}
        control={control}
        render={({ field }) => (
          <ProductInput field={field} error={errors.inStock} label="inStock" />
        )}
      />
      <Controller
        name={"price"}
        rules={createProductValidation.price}
        control={control}
        render={({ field }) => (
          <ProductInput error={errors.price} label="price" field={field} />
        )}
      />
      <Controller
        name={"salePrice"}
        rules={createProductValidation.salePrice}
        control={control}
        render={({ field }) => (
          <ProductInput
            error={errors.salePrice}
            label="Sale Price"
            field={field}
          />
        )}
      />
    </div>
  );
}
