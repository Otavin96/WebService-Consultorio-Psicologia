import { z } from "zod";
import { Status } from "../../../tdos/consultation.dto";
import { useZodForm } from "../../../hooks/Form/useZodForm";

export const postConsultationSchema = z.object({
  id: z.string(),
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
  situation: z.nativeEnum(Status).optional(),
  currentQuery: z.string(),
  patientAttention: z.string(),
  scheduling: z.coerce.string(),
});

export const usePostConsultationForm = () => useZodForm(postConsultationSchema);
