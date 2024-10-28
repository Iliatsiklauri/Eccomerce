import { AppDataSource } from "../db/database-connect";
import { Address } from "../db/entities/Address";
import { User } from "../db/entities/User";
import { UserService } from "./user.service";

export class AddressService {
  private readonly AddressRepository = AppDataSource.getRepository(Address);
  private readonly UsersRepository = AppDataSource.getRepository(User);
  private usersService = new UserService();

  async getAll() {
    const adresses = await this.AddressRepository.find();
    return adresses;
  }

  async getOne(id) {
    try {
      const adresses = await this.AddressRepository.findOneBy({ id });
      return adresses;
    } catch (er) {
      console.log(er, "error while fetching single address");
    }
  }

  async createAddress(id, createAddressDTo: Address) {
    try {
      const user: User = await this.usersService.getUserById(id);
      const createdAddress = await this.AddressRepository.save(
        createAddressDTo
      );
      user.Address = createdAddress;

      await this.UsersRepository.save(user);

      return createdAddress;
    } catch (er) {
      console.log(er, "Error while adding Address");
    }
  }

  async updateAddress(id, updateAddress: Address) {
    try {
      let address = await this.AddressRepository.findOneBy({ id });
      if (!address) return 404;
      address = {
        ...address,
        ...updateAddress,
      };
      const savedAddress = await this.AddressRepository.save(address);
      return savedAddress;
    } catch (er) {
      console.log(er, "Error while updating product");
      return null;
    }
  }

  async deleteAddress(id) {
    try {
      const deletedAddress = await this.AddressRepository.delete({ id });
      if (deletedAddress.affected === 0) return null;
      return deletedAddress;
    } catch (er) {
      console.log(er, "error while deleting product");
      return null;
    }
  }
}
