export enum RolesProps {
  SECRETARIA = "secretaria",
  PROFISSIONAL_SAUDE = "profissional_saude",
}

export type ContactProps = {
  phone: string;
  whatsApp: string;
  email: string;
};

export type AddressProps = {
  cep: string;
  publicPlace: string;
  numberHouse: number;
  neighborhood: string;
  state: string;
  city: string;
  contact: ContactProps;
  roles: RolesProps;
};

export interface ClientsModel {
  id: string;
  cpf: string;
  name: string;
  surname: string;
  dateOfBirth: Date;
  address: AddressProps;
  created_at: Date;
  updated_at: Date;
}
