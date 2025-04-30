import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodSchema } from "zod";

export function useZodForm<T extends ZodSchema>(
  schema: T
): UseFormReturn<z.infer<T>> {
  return useForm<z.infer<T>>({
    mode: "all",
    reValidateMode: "onSubmit",
    resolver: zodResolver(schema),
  });
}
