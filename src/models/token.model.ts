import {IToken} from "../interfaces/jwt/token.interface";
import {model, Schema} from "mongoose";
import {User} from "./user.model";

const tokenSchema = new Schema(
    {
        accessToken: { type: String, required: true },
        refreshToken: { type: String, required: true },
        _userId: { type: Schema.Types.ObjectId, required: true, ref: User },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const Token = model<IToken>("tokens", tokenSchema);