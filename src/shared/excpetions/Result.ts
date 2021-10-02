import { ISuccessResult, IFailureResult } from './Either';

const Success = <S>(value: S): ISuccessResult<never, S> => ({
  value,
  isError: false,
});

const Failure = <F>(value: F): IFailureResult<F, never> => ({
  value,
  isError: true,
});

const Result = { Success, Failure };

export { Result };
