export enum RolesProps {
  SECRETARIA = "secretaria",
  PROFISSIONAL_SAUDE = "profissional_saude",
  USER = "usuario",
}

export interface Address {
  cep: string;
  publicPlace: string;
  numberHouse: string;
  neighborhood: string;
  state: string;
  city: string;
}

export interface Contact {
  phone: string;
  whatsApp: string;
  email: string;
}

export interface ClientResponse {
  items: ClientDto[];
  total: number;
  current_page: number;
  per_page: number;
  last_page: number;
}

export interface ClientDto {
  id: string;
  cpf: string;
  name: string;
  surname: string;
  dateOfBirth: Date;
  address: Address;
  contact: Contact;
  billingAddress?: Address;
  created_at?: Date;
  updated_at?: Date;
}
