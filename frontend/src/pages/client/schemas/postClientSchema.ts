import { z } from "zod";
import { useZodForm } from "../../../hooks/Form/useZodForm";

export enum RolesProps {
  SECRETARIA = "secretaria",
  PROFISSIONAL_SAUDE = "profissional_saude",
  USER = "usuario",
}

export const postClientSchema = z.object({
  cpf: z.string().min(1, "CPF obrigatório"),
  name: z.string().min(1, "Nome obrigatório"),
  surname: z.string().min(1, "Sobrenome obrigatório"),
  dateOfBirth: z.coerce.date(),
  address: z.object({
    cep: z.string().min(1, "CEP obrigatório"),
    publicPlace: z.string().min(1, "Logradouro obrigatório"),
    numberHouse: z.string(),
    neighborhood: z.string().min(1, "Bairro obrigatório"),
    state: z.string().min(1, "Estado obrigatório"),
    city: z.string().min(1, "Cidade obrigatória"),
  }),
  billingAddress: z.object({
    cep: z.string().min(1, "CEP obrigatório"),
    publicPlace: z.string().min(1, "Logradouro obrigatório"),
    numberHouse: z.string(),
    neighborhood: z.string().min(1, "Bairro obrigatório"),
    state: z.string().min(1, "Estado obrigatório"),
    city: z.string().min(1, "Cidade obrigatória"),
  }),
  contact: z.object({
    phone: z.string().min(1, "Telefone obrigatório"),
    whatsApp: z.string(),
    email: z.string().email("E-mail inválido"),
  }),
});

export const usePostClientForm = () => {
  return useZodForm(postClientSchema);
};
