/* eslint-disable @typescript-eslint/return-await */
import * as bcrypt from "bcrypt";
import { type IEncrypterService } from "src/modules/shared/core/application/encrypter-service.interface";

export class BcryptEncrypterServiceAdapter implements IEncrypterService {
  constructor(private readonly saltRounds = 15) {}

  async encrypt(value: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    const hash = await bcrypt.hash(value, salt);
    return hash;
  }

  async compare(value: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(value, hash);
  }
}
