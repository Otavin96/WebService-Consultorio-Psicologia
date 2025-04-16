import { Router } from "express";

const routes = Router();

routes.get("/", async (req, res) => {
  res.send("Ola Mundo!");
});

// routes.use()

export { routes };
