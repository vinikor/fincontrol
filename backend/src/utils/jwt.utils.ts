import jwt, { SignOptions } from "jsonwebtoken";

const JWT_SECRET_ENV = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = (process.env.JWT_EXPIRES_IN || "1d") as SignOptions["expiresIn"];

if (!JWT_SECRET_ENV) {
    throw new Error("JWT_SECRET não definido no arquivo .env");
}
const JWT_SECRET: string = JWT_SECRET_ENV;

interface TokenPayload {
    id: number;
    email: string;
}

export function generateToken(payload: TokenPayload): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}