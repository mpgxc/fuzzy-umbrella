import { ISuccessResult, IFailureResult } from './Either';

const Success = <S, F>(value: S): ISuccessResult<S, F> => ({
  value,
  isError: false,
});

const Failure = <S, F>(value: F): IFailureResult<S, F> => ({
  value,
  isError: true,
});

const Result = { Success, Failure };

export { Result };
