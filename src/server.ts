import express from "express";
import { router } from "./routes";
import cors from "cors"; // Ajuste para importar diretamente o cors

const app = express();

app.use(express.json());

app.use(cors({ origin: "http://localhost:5500" }));
app.use(router);

app.listen(3001, () => console.log("Tecnologia suficientemente avançada é dificilmente diferenciável de magia.\nEsse Trabalho vale uma pizza ☺ . "));