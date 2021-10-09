interface IDomainResult<S, F> {
  value: S | F;
  isError: boolean;
}

interface ISuccessResult<S, F> extends IDomainResult<S, F> {
  value: S;
  isError: false;
}

interface IFailureResult<S, F> extends IDomainResult<S, F> {
  value: F;
  isError: true;
}

type Either<S, F> = ISuccessResult<S, F> | IFailureResult<S, F>;

export { Either, ISuccessResult, IFailureResult };
