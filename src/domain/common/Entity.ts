import { EntityUniqueID } from './UniqueEntityID';

abstract class Entity<T> {
  protected readonly _id: string;
  public readonly _props: T;

  constructor(props: T, id?: string) {
    this._props = props;
    this._id = id || EntityUniqueID.build();
  }

  get id(): string {
    return this._id;
  }
}

export { Entity };
