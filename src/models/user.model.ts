import {model, Schema} from "mongoose";
import {ERoles} from "../enums/roles.enum";
import {EAccountTypes} from "../enums/account-types.enum";
import {IUser} from "../interfaces/user.interface";

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true, select: false },
        role: { type: String, enum: ERoles, required: true},
        accountType: { type: String, enum: EAccountTypes, default: EAccountTypes.BASIC },
        isVerified: { type: Boolean, default: false },
        isDeleted: { type: Boolean, default: false },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const User = model<IUser>("users", userSchema);