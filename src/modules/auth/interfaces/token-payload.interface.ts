import {ERoles} from "../../../enums/roles.enum";

export interface ITokenPayload {
    userId: string;
    role: ERoles;
}