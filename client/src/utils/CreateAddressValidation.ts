export const createAddressValidation = {
  name: {
    required: "name is required",
    maxLength: { value: 50, message: "Maximum 50 characters" },
  },
  additionalInfo: {
    required: "Additional information is required",
    maxLength: { value: 300, message: "Maximum 300 characters" },
  },
};
