import express from "express";
import connetcDatabase from "./src/database/db.js";
import cors from "cors";
import dotenv from "dotenv";

import userRoute from "./src/routes/user.route.js";
import testesRoute from "./src/routes/testes.route.js";
import authRoute from "./src/routes/auth.route.js";
import NewsRoute from "./src/routes/news.route.js";
import swaggerRoute from "./src/routes/swagger.route.js";

const app = express();
dotenv.config();
app.use(cors());

const port = process.env.PORT || 3000;


connetcDatabase();
app.use(express.json());
app.use(userRoute);
app.use(testesRoute);
app.use("/auth", authRoute);
app.use("/news", NewsRoute);
app.use("/doc", swaggerRoute);
//ROTA
//Method HTTP - CRUD (CREATE,READ,UPDATE,DELETE)
//GET - Pega uma info
//POST - Cria uma info
//PUT - Altera toda info
//PATH - Altera parte da info 
//DELETE - Apaga uma info
//NAME - Um identificador da rota
//Function (Callback) - Responsavel por execultar algum comando
//funcao de callback, precisa ser funcao anonima, sem nome definido, apenas function(){},pode ser escrita arrow function ()=>{}
//app.get("/soma", (req, res) => {
//  const soma = 1 + 1;
//res.json(soma)
// res.send({soma: soma})
//});
//arrow function in line nao precisa de chaves
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));