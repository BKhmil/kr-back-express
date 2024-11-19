import {AuthController} from "./auth.controller";
import {AuthService} from "./services/auth.service";
import {PasswordService} from "./services/password.service";
import {TokenService} from "./services/token.service";
import {TokenRepository} from "./token.repository";
import {UserRepository} from "../user/user.repository";

export const AuthModule = {
    controller: new AuthController(
        new AuthService(
            new PasswordService(),
            new TokenService(),
            new TokenRepository(),
            new UserRepository()
    ))
}