import { RegisterDTO, LoginDTO } from "../dtos/auth.dto.js";
import { prisma } from "../lib/prisma.lib.js";
import { generateToken } from "../utils/jwt.utils.js";
import bcrypt from "bcrypt";

class AuthService {

     async register(data: RegisterDTO) {
        const { name, email, password } = data;

        if (!name || !email || !password) {
            throw new Error("Dados inválidos. Verifique os campos obrigatórios.");
        }
        if (name.trim().length < 3) {
            throw new Error("O nome deve ter no mínimo 3 caracteres.");
        }
        if (!email.includes("@")) {
            throw new Error("O email não é válido.");
        }
        if (password.length < 8) {
            throw new Error("A senha deve ter no mínimo 8 caracteres.");
        }

        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            throw new Error("Email já cadastrado");;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });


        return {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt
        };

    }
    
    
    async login(data: LoginDTO) {
        const { email, password } = data;
        if (!email || !password) {
            throw new Error("Dados inválidos. Verifique os campos obrigatórios.");
        }

        const user = await prisma.user.findUnique({
            where: { email }
        });
        if (!user) {
            throw new Error("Email ou senha incorretos.");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            throw new Error("Email ou senha incorretos.");
        }

        const token = generateToken({
            id: user.id,
            email: user.email
        });


        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        }



    }
}

export default new AuthService();