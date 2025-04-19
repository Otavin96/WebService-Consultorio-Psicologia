import Routes from "express";
import { CreateClientController } from "../controller/create-client.controller";
import { GetClientController } from "../controller/get-client.controller";
import { SearchClientController } from "../controller/search-client.controller";
import { UpdateClientController } from "../controller/update-client.controller";
import { DeleteClientController } from "../controller/delete-client.controller";

const clientRoutes = Routes();

clientRoutes.post("/", CreateClientController);
clientRoutes.get("/:id", GetClientController);
clientRoutes.get("/", SearchClientController);
clientRoutes.put("/:id", UpdateClientController);
clientRoutes.delete("/:id", DeleteClientController);

export { clientRoutes };
