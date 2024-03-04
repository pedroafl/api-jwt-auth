import express, { Response } from "express";
import routes from "./routers";
import { AppDataSource } from "./src/infra/database/data-source";

AppDataSource.initialize()
  .then(async () => {
    console.log("Success Connect");
  })
  .catch((error) => console.log(error));

const app = express();

app.use(express.json());
app.use(routes);

app.use(function (request, response, next) {
  response.status(400).send("Rota não encontrada");
});

app.listen(3000, () => console.log(" Server start"));
