import { z } from "zod";
import { useZodForm } from "../../../hooks/Form/useZodForm";

// Contact schema
const ContactSchema = z.object({
  phone: z.string().optional(),
  whatsApp: z.string().optional(),
  email: z.string().email().optional(),
});

// Address schema
const AddressSchema = z.object({
  cep: z.string().optional(),
  publicPlace: z.string().optional(),
  numberHouse: z.coerce.string().optional(),
  neighborhood: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
});

// Client schema
const editClientSchema = z
  .object({
    cpf: z.string().optional(),
    name: z.string().optional(),
    surname: z.string().optional(),
    dateOfBirth: z.coerce.date().optional(), // aceita string ou Date
    billingAddress: z.lazy(() => AddressSchema).optional(),
    contact: ContactSchema.optional().refine(
      (val) => val === undefined || Object.keys(val).length > 0,
      {
        message: "Se o campo 'Contato' for enviado, ele não pode estar vazio.",
      }
    ),
    address: AddressSchema.optional().refine(
      (val) => val === undefined || Object.keys(val).length > 0,
      {
        message: "Se o campo 'Endereço' for enviado, ele não pode estar vazio.",
      }
    ),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "Pelo menos um campo deve ser fornecido para atualização.",
  });

export const useEditClientForm = () => {
  return useZodForm(editClientSchema);
};
