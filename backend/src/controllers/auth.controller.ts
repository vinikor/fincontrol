import { Request, Response } from "express";
import { createUser } from "../services/auth.service.js";


export const register = async (req: Request, res: Response) => {

    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Dados inválidos. Verifique os campos obrigatórios." });
        }
        if (name.trim().length < 3) {
            return res.status(400).json({ message: "O nome deve ter no mínimo 3 caracteres." });
        }
        if (!email.includes("@")) {
            return res.status(400).json({ message: "O email não é válido." });
        }
        if (password.length < 8) {
            return res.status(400).json({ message: "A senha deve ter no mínimo 8 caracteres." });
        }

      
        return await createUser(req, res);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ocorreu um erro interno no servidor. Tente novamente mais tarde." });
    }
};
