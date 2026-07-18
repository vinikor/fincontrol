import { Request, Response } from "express";
import authService from "../services/auth.service.js";
import { RegisterDTO, LoginDTO } from "../dtos/auth.dto.js";



class AuthController {



    async register(req: Request, res: Response) {

        try {
            const data: RegisterDTO = req.body;

            const user = await authService.register(data);

            return res.status(201).json(user);


        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
            if (error instanceof Error) {
                return res.status(400).json({
                    message: error.message
                });
            }

            return res.status(500).json({
                message: "Erro interno do servidor"
            });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const data: LoginDTO = req.body;
            const dataUser = await authService.login(data);
            return res.status(200).json(dataUser);

        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({
                    message: error.message
                });
            }

            return res.status(500).json({
                message: "Erro interno do servidor"
            });
        }

    }

}
export default new AuthController();
