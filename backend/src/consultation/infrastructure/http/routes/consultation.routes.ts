import Routes from "express";
import { CreateConsultationController } from "../controller/create-consultation.controller";
import { GetConsultationController } from "../controller/get-consultation.controller";
import { SearchConsultationController } from "../controller/search-consultation.controller";
import { UpdateConsultationController } from "../controller/update-consultation.controller";
import { DeleteConsultationController } from "../controller/delete-consultation.controller";

const consultationRoutes = Routes();

consultationRoutes.post("/", CreateConsultationController);
consultationRoutes.get("/:id", GetConsultationController);
consultationRoutes.get("/", SearchConsultationController);
consultationRoutes.put("/:id", UpdateConsultationController);
consultationRoutes.delete("/:id", DeleteConsultationController);

export { consultationRoutes };
