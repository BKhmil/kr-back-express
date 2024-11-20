import * as bcrypt from "bcrypt";

class PasswordService {
    private saltRounds = 10;

    public async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, this.saltRounds);
    }

    public async comparePassword(
        password: string,
        hashedPassword: string,
    ): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
    }
}

export const passwordService = new PasswordService();