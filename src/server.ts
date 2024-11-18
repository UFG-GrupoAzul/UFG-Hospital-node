import express from "express";
import { router } from "./routes";
import cors from "cors"; // Ajuste para importar diretamente o cors

const app = express();

app.use(express.json());

app.use(cors({ origin: '*' }));

app.use(router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Tecnologia suficientemente avançada é dificilmente diferenciável de magia.\nEsse Trabalho vale uma pizza ☺ . ")
});