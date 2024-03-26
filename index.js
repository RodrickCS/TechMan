import dotenv from "dotenv";
dotenv.config();
const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;

import express from "express";
import methodOverride from "method-override";

import usuarioRoutes from "./src/routes/usuarios_routes";
import equipamentosRoutes from "./src/routes/equipamentos_routes";

const app = express();

app
  .set("view engine", "pug")
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(express.static("public"))
  .use(methodOverride("_method"))
  .use(usuarioRoutes)
  .use(equipamentosRoutes);

app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));

export default app;
