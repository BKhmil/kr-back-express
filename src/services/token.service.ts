import * as jsonwebtoken from "jsonwebtoken";
import {ITokenPayload} from "../interfaces/jwt/token-payload.interface";
import {ITokenPair} from "../interfaces/jwt/token-pair.interface";
import {envConfig} from "../configs/env.config";
import {ApiError} from "../errors/api.error";
import {ETokenTypes} from "../enums/token-types";
import {STATUS_WITH_MESSAGE_CONSTANT} from "../constants/status-with-message.constant";

class TokenService {
    public generateTokens(payload: ITokenPayload): ITokenPair {
        const accessToken = jsonwebtoken.sign(payload, envConfig.JWT_ACCESS_SECRET, {
            expiresIn: envConfig.JWT_ACCESS_EXPIRATION,
        });

        const refreshToken = jsonwebtoken.sign(
            payload,
            envConfig.JWT_REFRESH_SECRET,
            { expiresIn: envConfig.JWT_REFRESH_EXPIRATION },
        );

        return { accessToken, refreshToken };
    }

    public verifyToken(
        token: string,
        tokenType: ETokenTypes,
    ): ITokenPayload {
        let secret: string;
        try {
            switch (tokenType) {
                case ETokenTypes.ACCESS:
                    secret = envConfig.JWT_ACCESS_SECRET;
                    break;
                case ETokenTypes.REFRESH:
                    secret = envConfig.JWT_REFRESH_SECRET;
                    break;
                default:
                    throw new ApiError(
                        STATUS_WITH_MESSAGE_CONSTANT.BAD_REQUEST.messages.invalid_token_type,
                        STATUS_WITH_MESSAGE_CONSTANT.BAD_REQUEST.code
                    );
            }

            return jsonwebtoken.verify(token, secret) as ITokenPayload;
        } catch(err) {
            throw err;
        }
    }
}

export const tokenService = new TokenService();