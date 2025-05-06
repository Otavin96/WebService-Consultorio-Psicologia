import axios from "axios";

export interface ApiBrasilResponse {
  cep: string;
  street: string;
  numberHouse: string;
  neighborhood: string;
  state: string;
  city: string;
}

export const apiBrasil = axios.create({
  baseURL: "https://brasilapi.com.br/api/cep/v2/",
});

export const fetchApiBrasil = async (
  cep: string
): Promise<ApiBrasilResponse> => {
  const response = await apiBrasil.get(cep);
  return response.data;
};
