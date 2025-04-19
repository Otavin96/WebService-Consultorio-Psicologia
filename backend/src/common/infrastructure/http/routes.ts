import { clientRoutes } from "@/clients/infrastructure/http/routes/client.routes";
import { consultationRoutes } from "@/consultation/infrastructure/http/routes/consultation.routes";
import { schedulingRoutes } from "@/scheduling/infrastructure/http/routes/scheduling.routes";
import { Router } from "express";

const routes = Router();

routes.use("/client", clientRoutes);
routes.use("/scheduling", schedulingRoutes);
routes.use("/consultation", consultationRoutes);

export { routes };
