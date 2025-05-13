import { PaginationResponse } from "../tdos/pagination.dto";
import { SchedulingDto } from "../tdos/scheduling.dto";
import { api } from "./api";

export const insertScheduling = async (
  scheduling: SchedulingDto
): Promise<void> => {
  await api.post("/scheduling/", scheduling);
};

export const fetchAllSchedulingByClient = async (
  clientId: string | undefined,
  per_page: number,
  page: number
): Promise<PaginationResponse<SchedulingDto>> => {
  const response = await api.get<PaginationResponse<SchedulingDto>>(
    `/scheduling/client/${clientId}/?page=${page}&per_page=${per_page}`
  );
  return response.data;
};

export const getSchedulingById = async (id: string): Promise<SchedulingDto> => {
  const response = await api.get(`/scheduling/${id}`);

  return response.data;
};

export const deleteScheduling = async (
  id: string | undefined
): Promise<void> => {
  await api.delete(`/scheduling/${id}`);
};
