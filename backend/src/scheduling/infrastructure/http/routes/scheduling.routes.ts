import Routes from "express";
import { DeleteSchedulingController } from "../controller/delete-scheduling.controller";
import { CreateSchedulingController } from "../controller/create-scheduling.controller";
import { GetSchedulingController } from "../controller/get-scheduling.controller";
import { SearchSchedulingController } from "../controller/search-schedulingcontroller";
import { UpdateSchedulingController } from "../controller/update-scheduling.controller";

const schedulingRoutes = Routes();

schedulingRoutes.post("/", CreateSchedulingController);
schedulingRoutes.get("/:id", GetSchedulingController);
schedulingRoutes.get("/", SearchSchedulingController);
schedulingRoutes.put("/:id", UpdateSchedulingController);
schedulingRoutes.delete("/:id", DeleteSchedulingController);

export { schedulingRoutes };
