import { prisma } from "../lib/prisma.js";
import { Request, Response } from 'express';
import bcrypt from "bcrypt";


export async function createUser(req: Request, res: Response) {
    const { name, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });
        return res.status(201).json(user);
    }catch (error) {
        console.error(error);
        return res.status(409).json({ message: "O email já está em uso." });
    }
}