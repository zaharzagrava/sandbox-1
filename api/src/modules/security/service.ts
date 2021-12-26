import { hash as bcryptHash, compare as bcryptCompare } from "bcrypt";
import constants from "../../constants";

export class SecurityService {
  static async hash(toHashStr: string): Promise<string> {
    return bcryptHash(toHashStr, constants.BCRYPT_SALT_ROUNDS);
  }

  static async compare(str: string, hashedStr: string): Promise<boolean> {
    return bcryptCompare(str, hashedStr);
  }
}
