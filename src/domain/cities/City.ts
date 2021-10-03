import { Entity } from '@domain/common/Entity';

type CityProps = {
  name: string;
  country: string;
};

class City extends Entity<CityProps> {
  private constructor(props: CityProps, id?: string) {
    super(props, id);
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
