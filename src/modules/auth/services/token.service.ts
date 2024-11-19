import * as jsonwebtoken from "jsonwebtoken";
import {ITokenPayload} from "../interfaces/token-payload.interface";
import {ITokenPair} from "../interfaces/token-pair.interface";
import {envConfig} from "../../../configs/env.config";

export class TokenService {
    public generateTokens(payload: ITokenPayload): ITokenPair {
        const accessToken = jsonwebtoken.sign(payload, envConfig.JWT_ACCESS_SECRET, {
            expiresIn: envConfig.JWT_ACCESS_EXPIRATION,
        });

        // і так само рефреш
        const refreshToken = jsonwebtoken.sign(
            payload,
            envConfig.JWT_REFRESH_SECRET,
            { expiresIn: envConfig.JWT_REFRESH_EXPIRATION },
        );

        return { accessToken, refreshToken };
    }

    // public verifyToken(
    //     token: string,
    //     tokenType: TokenType | EActionTokenType,
    // ): ITokenPayload {
    //     let secret: string;
    //     try {
    //         switch (tokenType) {
    //             case TokenType.ACCESS:
    //                 secret = configs.JWT_ACCESS_SECRET;
    //                 break;
    //             case TokenType.REFRESH:
    //                 secret = configs.JWT_REFRESH_SECRET;
    //                 break;
    //             case EActionTokenType.FORGOT_PASSWORD:
    //                 secret = configs.ACTION_FORGOT_PASSWORD_SECRET;
    //                 break;
    //             case EActionTokenType.VERIFY_EMAIL:
    //                 secret = configs.ACTION_VERIFY_EMAIL_SECRET;
    //                 break;
    //             default:
    //                 throw new ApiError("Invalid token type", 400);
    //         }
    //
    //         return jsonwebtoken.verify(token, secret) as ITokenPayload;
    //     } catch {
    //         throw new ApiError("Invalid token", 401);
    //     }
    // }
    //
    // public generateActionTokens(
    //     payload: ITokenPayload,
    //     tokenType: EActionTokenType,
    // ): string {
    //     let secret: string;
    //     let expiration: string;
    //     switch (tokenType) {
    //         case EActionTokenType.FORGOT_PASSWORD:
    //             secret = configs.ACTION_FORGOT_PASSWORD_SECRET;
    //             expiration = configs.ACTION_FORGOT_PASSWORD_EXPIRATION;
    //             break;
    //         case EActionTokenType.VERIFY_EMAIL:
    //             secret = configs.ACTION_VERIFY_EMAIL_SECRET;
    //             expiration = configs.ACTION_VERIFY_EMAIL_EXPIRATION;
    //             break;
    //         default:
    //             throw new ApiError("Invalid token type", 400);
    //     }
    //
    //     return jsonwebtoken.sign(payload, secret, {
    //         expiresIn: expiration,
    //     });
    // }
}