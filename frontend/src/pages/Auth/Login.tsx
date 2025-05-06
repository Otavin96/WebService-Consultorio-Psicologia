import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "../../components/Form/Button/Button";
import * as R from "./styles";
import { useAuthenticateForm } from "./schemas/authenticateSchema";
import { useMutation } from "@tanstack/react-query";
import { authenticateUser } from "../../services/userService";
import { AuthDto, AuthResponse } from "../../tdos/user.dto";
import { useAuth } from "../../hooks/Auth/useAuth";

const Login = () => {
  const nav = useNavigate();
  const { setAuth, setUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useAuthenticateForm();

  const mutation = useMutation<AuthResponse, Error, AuthDto>({
    mutationFn: authenticateUser,

    onMutate: () => {
      toast.loading("Autenticando...", { toastId: "auth" });
    },

    onSuccess: ({ user, access_token }) => {
      setAuth(true);
      setUser(user);
      localStorage.setItem("token", access_token.access_token);

      toast.update("auth", {
        render: "Login realizado com sucesso!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      nav("/");
    },

    onError: () => {
      toast.update("auth", {
        render: "Erro ao fazer login: Usuário ou Senha incorreta",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    },
  });

  const onSubmit = (user: AuthDto) => {
    mutation.mutate(user);
  };

  const onError = (errors: unknown) => {
    console.log("Erros de validação:", errors);
  };

  return (
    <R.Container>
      <R.Form onSubmit={handleSubmit(onSubmit, onError)}>
        <R.Title>Faça seu Login</R.Title>
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
        <R.BtnControl>
          <Button type="submit" text="Login" />
        </R.BtnControl>
        <R.Link>
          Não tem conta? <Link to={"/register"}>clica aqui</Link> para fazer o
          cadastro
        </R.Link>
      </R.Form>
    </R.Container>
  );
};

export default Login;
