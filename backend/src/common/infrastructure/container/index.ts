import "@/clients/infrastructure/container";
import "@/scheduling/infrastructure/container";
import "@/consultation/infrastructure/container";
import "@/users/infrastructure/container";
import { container } from "tsyringe";
import { BcryptjsHashProvider } from "../providers/hashProvider/bcryptjs-hash-provider";
import { JwtAuthProvider } from "../providers/auth-provider/auth-provider.jwt";

container.registerSingleton("HashProvider", BcryptjsHashProvider);
container.registerSingleton("AuthProviderJwt", JwtAuthProvider);
