import { ConsultationDto } from "../tdos/consultation.dto";
import { api } from "./api";

export const insertConsultation = async (consultation: ConsultationDto) => {
  const response = await api.post("/consultation/", consultation);

  return response.data.items;
};

export const getConsultation = async (id: string) => {
  const response = await api.get(`/consultation/${id}`);
  console.log(response.data);
  return response.data;
};
