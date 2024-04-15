export interface ISignOptions {
  secret?: string;
}

export interface IVerifyOptions {
  secret?: string;
}

export interface IJwtService {
  sign: <PayloadType extends object>(
    payload: PayloadType,
    options?: ISignOptions,
  ) => Promise<string>;
  verify: <PayloadType>(
    token: string,
    options?: IVerifyOptions,
  ) => Promise<PayloadType>;
}
