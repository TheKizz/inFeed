export interface IUseCase<OutputType> {
  execute: (...args: any[]) => Promise<OutputType>;
}
