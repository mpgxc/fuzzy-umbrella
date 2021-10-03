import { Entity } from '@domain/common/Entity';

type Genre = 'FEMALE' | 'MALE';

type CustomerProps = {
  full_name: string;
  birth_date: Date;
  genre: Genre;
};

class Customer extends Entity<CustomerProps> {
  private constructor(props: CustomerProps, id?: string) {
    super(props, id);
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
