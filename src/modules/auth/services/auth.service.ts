import {IUser} from "../../../interfaces/user.interface";
import {PasswordService} from "./password.service";
import {ITokenPair} from "../interfaces/token-pair.interface";
import {ApiError} from "../../../errors/api.error";
import {TokenService} from "./token.service";
import {TokenRepository} from "../token.repository";
import {UserRepository} from "../../user/user.repository";

export class AuthService {
    constructor(
        private passwordService: PasswordService,
        private tokenService: TokenService,
        private tokenRepository: TokenRepository,
        private userRepository: UserRepository
    ) {
    }

    public async signUp(
        dto: IUser,
    ): Promise<{ user: IUser; tokens: ITokenPair }> {
        await this.isEmailExistOrThrow(dto.email);

        const hashedPassword = await this.passwordService.hashPassword(dto.password);

        const user = await this.userRepository.create({
            ...dto,
            password: hashedPassword,
        });

        const tokens = this.tokenService.generateTokens({
            userId: user._id,
            role: user.role,
        });

        await this.tokenRepository.create({ ...tokens, _userId: user._id });

        // const token = this.tokenService.generateActionTokens(
        //     { userId: user._id, role: user.role },
        //     EActionTokenType.VERIFY_EMAIL,
        // );
        //
        // await actionTokenRepository.create({
        //     token,
        //     type: EActionTokenType.VERIFY_EMAIL,
        //     _userId: user._id,
        // });

        // віддаємо назад дані з токенами
        return { user, tokens };
    }

    private async isEmailExistOrThrow(email: string): Promise<void> {
        const user = await this.userRepository.getByEmail(email);
        if (user) {
            throw new ApiError("Email already exists", 409);
        }
    }
}