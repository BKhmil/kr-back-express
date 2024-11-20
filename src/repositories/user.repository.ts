import {IUser} from "../interfaces/user.interface";
import {User} from "../models/user.model";

class UserRepository {
    public async create(dto: IUser): Promise<IUser> {
        return await User.create(dto);
    }

    public async getByEmail(email: string): Promise<IUser | null> {
        return await User.findOne({ email }).select("+password");
    }

    public async getById(userId: string): Promise<IUser | null> {
        return await User.findById(userId).select("+password");
    }
}

export const userRepository = new UserRepository();