import {IUser} from "../interfaces/user.interface";
import {ITokenPair} from "../interfaces/jwt/token-pair.interface";
import {ApiError} from "../errors/api.error";
import {TSignIn} from "../types/sign-in.type";
import {ITokenPayload} from "../interfaces/jwt/token-payload.interface";
import {passwordService} from "./password.service";
import {tokenService} from "./token.service";
import {tokenRepository} from "../repositories/token.repository";
import {userRepository} from "../repositories/user.repository";
import {STATUS_WITH_MESSAGE_CONSTANT} from "../constants/status-with-message.constant";

class AuthService {
    public async signUp(
        dto: IUser,
    ): Promise<{ user: IUser; tokens: ITokenPair }> {
        await this.isEmailExistOrThrow(dto.email);

        const hashedPassword = await passwordService.hashPassword(dto.password);

        const user = await userRepository.create({
            ...dto,
            password: hashedPassword,
        });

        const tokens = tokenService.generateTokens({
            userId: user._id,
            role: user.role,
        });

        await tokenRepository.create({ ...tokens, _userId: user._id });

        // todo: mailing

        return { user, tokens };
    }

    public async signIn(
        dto: TSignIn,
    ): Promise<{ user: IUser; tokens: ITokenPair }> {
        const user = await userRepository.getByEmail(dto.email);

        if (!user) {
            throw new ApiError(
                STATUS_WITH_MESSAGE_CONSTANT.NOT_FOUND.messages.default,
                STATUS_WITH_MESSAGE_CONSTANT.NOT_FOUND.code,
            );
        }

        const isPasswordCorrect = await passwordService.comparePassword(
            dto.password,
            user.password,
        );

        if (!isPasswordCorrect) {
            throw new ApiError(
                STATUS_WITH_MESSAGE_CONSTANT.UNAUTHORIZED.messages.invalid_credentials,
                STATUS_WITH_MESSAGE_CONSTANT.UNAUTHORIZED.code
            );
        }

        const tokens = tokenService.generateTokens({
            userId: user._id,
            role: user.role,
        });

        await tokenRepository.create({ ...tokens, _userId: user._id });

        return { user, tokens };
    }

    public async refresh(
        refreshToken: string,
        payload: ITokenPayload,
    ): Promise<ITokenPair> {
        await tokenRepository.deleteOneByParams({ refreshToken });
        const tokens = tokenService.generateTokens({
            userId: payload.userId,
            role: payload.role,
        });
        await tokenRepository.create({ ...tokens, _userId: payload.userId });

        return tokens;
    }

    public async logout(payload: ITokenPayload, tokenId: string): Promise<void> {
        await tokenRepository.deleteOneByParams({ _id: tokenId });
    }

    public async logoutAll(payload: ITokenPayload): Promise<void> {
        await tokenRepository.deleteManyByParams({ _userId: payload.userId });
    }

    // todo: forgotPasswordSendEmail, forgotPasswordSet, changePassword, verify

    private async isEmailExistOrThrow(email: string): Promise<void> {
        const user = await userRepository.getByEmail(email);
        if (user) {
            throw new ApiError(
                STATUS_WITH_MESSAGE_CONSTANT.CONFLICT.messages.duplicate_entry,
                STATUS_WITH_MESSAGE_CONSTANT.CONFLICT.code
            );
        }
    }
}

export const authService = new AuthService();