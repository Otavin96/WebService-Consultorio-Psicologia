import { z } from "zod";
import { useZodForm } from "../../../hooks/Form/useZodForm";

export const authenticateSchema = z.object({
  username: z.string().min(1, "Usuário obrigatorio"),
  password: z.string().min(1, "Senha obrigatorio"),
});

export const useAuthenticateForm = () => useZodForm(authenticateSchema);
