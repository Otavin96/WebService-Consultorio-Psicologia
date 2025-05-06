import { ConsultationDto } from "../tdos/consultation.dto";
import { api } from "./api";

export const insertConsultation = async (consultation: ConsultationDto) => {
  const response = await api.post("/consultation/", consultation);

  return response.data.items;
};
