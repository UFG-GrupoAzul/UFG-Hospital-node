import express from "express";
import { router } from "./routes";
import cors from "cors"; // Ajuste para importar diretamente o cors

const app = express();

app.use(express.json());

// Declara o CORS antes das rotas
app.use(cors({ origin: "http://127.0.0.1:3000" }));
app.use(router);

app.listen(3001, () => console.log("Tecnologia suficientemente avançada é dificilmente diferenciável de magia.\nEsse Trabalho vale uma pizza ☺ . "));