import { EntityUniqueID } from '@domain/common/UniqueEntityID';

type CityProps = {
  name: string;
  country: string;
};

class City {
  private readonly _id: string;
  private readonly _props: CityProps;

  private constructor(props: CityProps, id?: string) {
    this._props = props;
    this._id = id || EntityUniqueID.build();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._props.name;
  }

  get country(): string {
    return this._props.country;
  }

  public static build(props: CityProps, id?: string): City {
    return new City(props, id);
  }
}

export { City };
