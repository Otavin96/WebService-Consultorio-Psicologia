import { z } from "zod";
import { useZodForm } from "../../../hooks/Form/useZodForm";

export const postSchedulingSchema = z.object({
  client: z.object({
    id: z.string(),
    cpf: z.string(),
    name: z.string(),
    surname: z.string(),
    dateOfBirth: z.coerce.date(),
    address: z.object({
      cep: z.string().min(1, "CEP obrigatório"),
      publicPlace: z.string().min(1, "Logradouro obrigatório"),
      numberHouse: z.string(),
      neighborhood: z.string().min(1, "Bairro obrigatório"),
      state: z.string().min(1, "Estado obrigatório"),
      city: z.string().min(1, "Cidade obrigatória"),
    }),
    contact: z.object({
      phone: z.string().min(1, "Telefone obrigatório"),
      whatsApp: z.string().optional(),
      email: z.string().email("E-mail inválido"),
    }),
  }),
  date: z.coerce.date(),
  time: z.string(),
  observations: z.string().min(1, "Observação obrigatória"),
});

export const usePostSchedulingForm = () => useZodForm(postSchedulingSchema);
