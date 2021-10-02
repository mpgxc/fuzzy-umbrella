import { EntityUniqueID } from '@domain/common/UniqueEntityID';

type Genre = 'FEMALE' | 'MALE';

type CustomerProps = {
  full_name: string;
  birth_date: Date;
  genre: Genre;
};

class Customer {
  private readonly _id: string;
  private readonly _props: CustomerProps;

  private constructor(props: CustomerProps, id?: string) {
    this._props = props;
    this._id = id || EntityUniqueID.build();
  }

  get id(): string {
    return this._id;
  }

  get fullName(): string {
    return this._props.full_name;
  }

  get genre(): Genre {
    return this._props.genre;
  }

  get birthDate(): Date {
    return this._props.birth_date;
  }

  public static build(props: CustomerProps, id?: string): Customer {
    return new Customer(props, id);
  }
}

export { Customer, Genre };
