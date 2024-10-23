import { Request, Response } from "express";
import { AddressService } from "../services/address.service";
import { UserService } from "../services/user.service";
import {
  createAddressSchema,
  ErrorRes,
  SuccessRes,
  updateAddressSchema,
} from "../utils/validation";

const AddressServices = new AddressService();
const UsersService = new UserService();

export const getAllAddresses = async (req: Request, res: Response) => {
  const adresses = await AddressServices.getAll();

  return res.json(adresses);
};

export const getSingleAddress = async (req: Request, res: Response) => {
  const address = await AddressServices.getOne(req.params.id);

  if (!address)
    return res.status(404).json(new ErrorRes(404, "Address not found"));
  return res.json(address);
};

export const createAddress = async (req: Request, res: Response) => {
  const user = await UsersService.getUserById(req.params.id);
  if (user.Address)
    return res
      .status(400)
      .json(new ErrorRes(400, "Address for this user already exists"));

  if (!user) return res.status(404).json(new ErrorRes(404, "User not found"));

  const { error } = createAddressSchema.validate(req.body);

  if (error) {
    return res.status(400).json(
      new ErrorRes(
        400,
        error.details.map((detail) =>
          detail.message.replace(/\\n/g, " ").replace(/\"/g, "")
        )
      )
    );
  }

  const address = await AddressServices.createAddress(req.params.id, req.body);

  if (!address)
    return res
      .status(400)
      .json(new ErrorRes(400, "Error while creating product"));

  return res
    .status(201)
    .json(new SuccessRes(201, "Address created successfully"));
};

export const updateAddress = async (req: Request, res: Response) => {
  const { error } = updateAddressSchema.validate(req.body);

  if (error) {
    return res.status(400).json(
      new ErrorRes(
        400,
        error.details.map((detail) =>
          detail.message.replace(/\\n/g, " ").replace(/\"/g, "")
        )
      )
    );
  }

  const udpatedAddress = await AddressServices.updateAddress(
    req.params.id,
    req.body
  );

  if (udpatedAddress === 404)
    return res.status(404).json(new ErrorRes(404, "Address not found"));
  if (!udpatedAddress)
    return res.status(404).json(new ErrorRes(400, "Cannot update product"));

  return res.json(updateAddress);
};

export const deleteAddress = async (req: Request, res: Response) => {
  const deletedAddress = await AddressServices.deleteAddress(req.params.id);

  if (!deletedAddress)
    return res.status(404).json(new ErrorRes(404, "Could not find Address"));

  return res
    .status(201)
    .json(new SuccessRes(201, "Address deleted succesfully"));
};
