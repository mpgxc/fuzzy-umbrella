interface IDomainResult<S, F> {
  value: S | F;
  isError: boolean;
}

interface ISuccessResult<F, S> extends IDomainResult<F, S> {
  value: S;
  isError: false;
}

interface IFailureResult<F, S> extends IDomainResult<F, S> {
  value: F;
  isError: true;
}

type Either<F, S> = IFailureResult<F, S> | ISuccessResult<F, S>;

export { Either, ISuccessResult, IFailureResult };
