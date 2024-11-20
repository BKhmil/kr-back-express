import {Request, Response, NextFunction} from "express";
import {IUser} from "../interfaces/user.interface";
import {TSignIn} from "../types/sign-in.type";
import {ITokenPayload} from "../interfaces/jwt/token-payload.interface";
import {authService} from "../services/auth.service";
import {STATUS_WITH_MESSAGE_CONSTANT} from "../constants/status-with-message.constant";

class AuthController {
    public async signUp(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const dto = req.body as IUser;
            const result = await authService.signUp(dto);
            res.status(STATUS_WITH_MESSAGE_CONSTANT.CREATED.code).json(result);
        } catch (err) {
            next(err);
        }
    }

    public async signIn(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const dto = req.body as TSignIn;
            const result = await authService.signIn(dto);
            res.status(STATUS_WITH_MESSAGE_CONSTANT.CREATED.code).json(result);
        } catch (err) {
            next(err);
        }
    }

    public async refresh(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const refreshToken = req.res.locals.refreshToken as string;
            const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;

            const result = await authService.refresh(refreshToken, jwtPayload);
            res.status(STATUS_WITH_MESSAGE_CONSTANT.CREATED.code).json(result);
        } catch (err) {
            next(err);
        }
    }

    public async logout(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const tokenId = req.res.locals.tokenId as string;
            const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;

            await authService.logout(jwtPayload, tokenId);
            res.sendStatus(STATUS_WITH_MESSAGE_CONSTANT.NO_CONTENT.code);
        } catch (err) {
            next(err);
        }
    }

    public async logoutAll(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;
            await authService.logoutAll(jwtPayload);
            res.sendStatus(STATUS_WITH_MESSAGE_CONSTANT.NO_CONTENT.code);
        } catch (err) {
            next(err);
        }
    }

    public async getAll(req: Request, res: Response, next: NextFunction) {
        res.json({mess: "all"});
    }
}

export const authController = new AuthController();