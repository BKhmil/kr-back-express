import {IToken} from "./interfaces/token.interface";
import {Token} from "../../models/token.model";

export class TokenRepository {
    public async create(dto: Partial<IToken>): Promise<IToken> {
        return await Token.create(dto);
    }
}