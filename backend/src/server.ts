import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRouter from "./router/auth.router.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);

app.get("/", (req, res) => {
    res.json({
        api: "API FUNCIONANDO"
    });
});



app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
})