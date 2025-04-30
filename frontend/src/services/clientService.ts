import { ClientDto } from "../tdos/client.dto";
import { api } from "./api";

export const insertClient = async (client: ClientDto): Promise<void> => {
  await api.post("/client/", client);
};

export const editClient = async (
  id: string,
  client: ClientDto
): Promise<void> => {
  await api.put(`/client/${id}`, client);
};

export const fetchClients = async (): Promise<ClientDto[]> => {
  const response = await api.get("/client/");

  return response.data.items;
};

export const getClientById = async (id: string): Promise<ClientDto> => {
  const response = await api.get(`/client/${id}`);

  return response.data;
};
