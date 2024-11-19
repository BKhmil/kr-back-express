import {Router, Request, Response, NextFunction} from "express";
import {AuthService} from "./services/auth.service";
import {IUser} from "../../interfaces/user.interface";

export class AuthController {
    public router = Router();

    constructor(private authService: AuthService) {
        this.router.get("/sign-up", this.signUp.bind(this));
    }

    public async signUp(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const dto = req.body as IUser;
            const result = await this.authService.signUp(dto);
            res.status(201).json(result);
        } catch (e) {
            console.log(e);
        }
    }
}