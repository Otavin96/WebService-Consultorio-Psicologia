import {
  AuthProvider,
  GenerateAuthKeyProps,
  VerifyAuthKeyProps,
} from "@/common/domain/providers/auth-provider";
import { StatusPermission } from "@/users/domain/models/users.model";
import jwt from "jsonwebtoken";
import { env } from "../../env";
import { InvalidCredentialsError } from "@/common/domain/errors/invalid-credentials-error";

type DecodedTokenProps = {
  sub: string;
  roles: StatusPermission;
};

export class JwtAuthProvider implements AuthProvider {
  verifyAuthKey(token: string): VerifyAuthKeyProps {
    try {
      const decodedToken = jwt.verify(token, env.MY_SECRET);

      const { sub, roles } = decodedToken as DecodedTokenProps;
      return { user_id: sub, roles };
    } catch {
      throw new InvalidCredentialsError("Invalid credeentials");
    }
  }

  generateAuthKey(
    user_id: string,
    roles: StatusPermission
  ): GenerateAuthKeyProps {
    const payload = { roles };
    const options: jwt.SignOptions = {
      expiresIn: "1d",
      subject: user_id,
    };

    const access_token = jwt.sign(payload, env.MY_SECRET, options);
    return { access_token };
  }
}
