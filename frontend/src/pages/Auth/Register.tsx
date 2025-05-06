import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/Form/Button/Button";
import * as R from "./styles";
import { useRegisterUserForm } from "./schemas/registerUserSchema";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../services/userService";
import { UserDto } from "../../tdos/user.dto";

const Register = () => {
  const nav = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useRegisterUserForm();

  const mutation = useMutation({
    mutationFn: async (user: UserDto) => {
      await registerUser(user);
    },
  });

  const onSubmit = (user: any) => {
    mutation.mutate(user);
    nav("/login");
  };

  const onError = (errors: unknown) => {
    console.log("Erros de validação:", errors);
  };

  return (
    <R.Container>
      <R.Form onSubmit={handleSubmit(onSubmit, onError)}>
        <R.Title>Aréa de Cadastro</R.Title>
        <R.FormControl>
          <R.LabelForm htmlFor="">Nome: </R.LabelForm>
          <R.InputForm
            {...register("name")}
            type="text"
            placeholder="Digite seu nome..."
          />
        </R.FormControl>
        <R.FormControl>
          <R.LabelForm htmlFor="">Usuário: </R.LabelForm>
          <R.InputForm
            {...register("username")}
            type="text"
            placeholder="Digite o nome do usuario..."
          />
        </R.FormControl>
        <R.FormControl>
          <R.LabelForm htmlFor="">Senha: </R.LabelForm>
          <R.InputForm
            {...register("password")}
            type="password"
            placeholder="Define uma senha..."
          />
        </R.FormControl>
        <R.FormControl>
          <R.LabelForm htmlFor="">Tipo de Usuário: </R.LabelForm>
          <R.SelectForm {...register("roles")}>
            <option value="PROFISSIONAL_SAUDE">Profissional de Saúde</option>
            <option value="SECRETARIA">Secretaria</option>
          </R.SelectForm>
        </R.FormControl>

        <R.BtnControl>
          <Button type="submit" text="Cadastrar" />
        </R.BtnControl>
        <R.Link>
          Já tem conta? <Link to={"/login"}>clica aqui</Link> para fazer o login
        </R.Link>
      </R.Form>
    </R.Container>
  );
};

export default Register;
