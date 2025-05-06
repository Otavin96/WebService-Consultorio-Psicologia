import { ClientDto } from "../tdos/client.dto";
import { PaginationResponse } from "../tdos/pagination.dto";
import { api } from "./api";

interface UpdateClientPayload {
  address: {
    cep: string;
    publicPlace: string;
    numberHouse: string;
    neighborhood: string;
    state: string;
    city: string;
  };
  contact: {
    phone: string;
    whatsApp?: string;
    email: string;
  };
}

export const editClient = async (id: string, data: UpdateClientPayload) => {
  const response = await api.put(`/client/${id}`, data);
  return response.data;
};

export const insertClient = async (client: ClientDto): Promise<void> => {
  await api.post("/client/", client);
};

export const fetchClients = async (
  per_page: number,
  page: number
): Promise<PaginationResponse<ClientDto>> => {
  const response = await api.get<PaginationResponse<ClientDto>>(
    `/client/?page=${page}&per_page=${per_page}`
  );
  return response.data;
};

export const getClientById = async (id: string): Promise<ClientDto> => {
  const response = await api.get(`/client/${id}`);

  return response.data;
};
