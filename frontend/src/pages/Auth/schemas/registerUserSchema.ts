import { z } from "zod";
import { useZodForm } from "../../../hooks/Form/useZodForm";

export const registerUserSchema = z.object({
  name: z.string().min(1, "Nome obrigatorio"),
  username: z.string().min(1, "Usuário obrigatorio"),
  password: z.string().min(1, "Senha obrigatorio"),
  roles: z.enum(["PROFISSIONAL_SAUDE", "SECRETARIA"]),
});

export const useRegisterUserForm = () => useZodForm(registerUserSchema);
