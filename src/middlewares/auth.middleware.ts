import {NextFunction, Request, Response} from "express";
import {ApiError} from "../errors/api.error";
import {tokenService} from "../services/token.service";
import {tokenRepository} from "../repositories/token.repository";
import {ETokenTypes} from "../enums/token-types";
import {REGEX_CONSTANT} from "../constants/regex.constant";
import {STATUS_WITH_MESSAGE_CONSTANT} from "../constants/status-with-message.constant";
import {JsonWebTokenError, TokenExpiredError, VerifyErrors} from "jsonwebtoken";
import {IToken} from "../interfaces/jwt/token.interface";

class AuthMiddleware {
    constructor() {
        this.checkAccessToken = this.checkAccessToken.bind(this);
        this.checkRefreshToken = this.checkRefreshToken.bind(this);
    }

    public async checkAccessToken(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const accessToken = this.ifHeaderValidGetToken(req);

            const payload = tokenService.verifyToken(accessToken, ETokenTypes.ACCESS);

            const pair = await this.ifTokenInDBGetPair(ETokenTypes.ACCESS, accessToken);

            req.res.locals.tokenId = pair._id;
            req.res.locals.jwtPayload = payload;
            next();
        } catch (err) {
            next(this.checkIfJWTError(err));
        }
    }

    public async checkRefreshToken(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const refreshToken = this.ifHeaderValidGetToken(req);

            const payload = tokenService.verifyToken(refreshToken, ETokenTypes.REFRESH);

            void await this.ifTokenInDBGetPair(ETokenTypes.REFRESH, refreshToken);

            req.res.locals.jwtPayload = payload;
            req.res.locals.refreshToken = refreshToken;
            next();
        } catch (err) {
            next(this.checkIfJWTError(err));
        }
    }

    private ifHeaderValidGetToken(req: Request): string {
        const header = req.headers.authorization;

        if (!header) {
            throw new ApiError(
                STATUS_WITH_MESSAGE_CONSTANT.UNAUTHORIZED.messages.missing_header,
                STATUS_WITH_MESSAGE_CONSTANT.UNAUTHORIZED.code,
            );
        }

        if (!REGEX_CONSTANT.BEARER_FORMAT.test(header)) {
            throw new ApiError(
                STATUS_WITH_MESSAGE_CONSTANT.BAD_REQUEST.messages.bearer_header,
                STATUS_WITH_MESSAGE_CONSTANT.BAD_REQUEST.code,
            );
        }

        return header.split(" ")[1];
    }

    private checkIfJWTError(err: Error | VerifyErrors): Error {
        if (err instanceof TokenExpiredError) {
            return new ApiError(
                    STATUS_WITH_MESSAGE_CONSTANT.UNAUTHORIZED.messages.expired_token,
                    STATUS_WITH_MESSAGE_CONSTANT.UNAUTHORIZED.code,
                );
        } else if (err instanceof JsonWebTokenError) {
            return new ApiError(
                    STATUS_WITH_MESSAGE_CONSTANT.UNAUTHORIZED.messages.invalid_token,
                    STATUS_WITH_MESSAGE_CONSTANT.UNAUTHORIZED.code,
                );
        } else {
            return err;
        }
    }

    private async ifTokenInDBGetPair(tokenType: ETokenTypes, token: string): Promise<IToken> {
        const pair =
            await tokenRepository.findByParams(
                tokenType === ETokenTypes.ACCESS ? { accessToken: token } : { refreshToken: token }
            );

        if (!pair) {
            throw new ApiError(
                STATUS_WITH_MESSAGE_CONSTANT.UNAUTHORIZED.messages.invalid_token,
                STATUS_WITH_MESSAGE_CONSTANT.UNAUTHORIZED.code
            );
        }

        return pair;
    }
}

export const authMiddleware = new AuthMiddleware();