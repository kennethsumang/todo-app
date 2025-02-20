import { inject, injectable } from "inversify";
import UserRepository from "../repositories/user.repository";
import BadRequestError from "../exceptions/badRequest.error";

interface UserDataInterface {
  id: string;
  username: string;
  createdAt: Date;
  updatedAt: Date|null;
}

@injectable()
export default class UserService {
  constructor(@inject(UserRepository) private readonly userRepository: UserRepository) {}

  async fetchCurrentUserDetails(userId: string): Promise<UserDataInterface> {
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      throw new BadRequestError('User not found.');
    }

    return user;
  }
}