import {ERoles} from "../enums/roles.enum";
import {EAccountTypes} from "../enums/account-types.enum";

export interface IUser {
    _id?: string;
    name: string;
    email: string;
    password: string;
    role: ERoles;
    accountType: EAccountTypes;
    isVerified: boolean;
    isDeleted: boolean;
    createdAt?: string;
    updatedAt?: string;
}