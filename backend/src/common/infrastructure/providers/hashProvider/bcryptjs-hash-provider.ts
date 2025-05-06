import { HashProvider } from "@/common/domain/providers/hash-provider";
import { hash, compare } from "bcrypt";

export class BcryptjsHashProvider implements HashProvider {
  async generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }
  async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}
