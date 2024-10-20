export const createProductValidation = {
  title: {
    required: "Title is required",
    minLength: { value: 3, message: "Minimum 3 characters" },
    maxLength: { value: 50, message: "Maximum 50 characters" },
  },
  brand: {
    required: "Brand is required",
    minLength: { value: 3, message: "Minimum 3 characters" },
    maxLength: { value: 50, message: "Maximum 50 characters" },
  },
  category: {
    required: "Category is required",
  },
  description: {
    required: "Description is required",
    maxLength: { value: 300, message: "Maximum 300 characters" },
  },
  price: {
    required: "Price is required",
    min: { value: 1, message: "Invalid price" },
    pattern: {
      value: /^\d+(\.\d{1,2})?$/,
      message: "Invalid price format",
    },
  },
  salePrice: {
    required: "Sale price is required",
    min: { value: 1, message: "Invalid sale price" },
    pattern: {
      value: /^\d+(\.\d{1,2})?$/,
      message: "Invalid sale price format",
    },
  },
  inStock: {
    required: "Amount is required",
    min: { value: 1, message: "Invalid amount" },
    pattern: {
      value: /^\d+$/,
      message: "Invalid amount,must be a whole number",
    },
  },
  pinned: {
    required: "Pinned status is required",
    pattern: {
      value: /^(true|false)$/,
      message: "Pinned must be true or false",
    },
  },
  image: {
    required: "Image is required",
  },
  pinnedImage: {
    required: "Pinned mage is required",
  },
};
