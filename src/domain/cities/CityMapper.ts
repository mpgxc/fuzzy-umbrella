import { City as PersistenceCity } from '@prisma/client';

import { City } from './City';

type CityPersistence = {
  id: string;
  name: string;
  country: string;
};

class CityMapper {
  public static toPersistence(city: City): CityPersistence {
    return {
      id: city.id,
      name: city.name,
      country: city.country,
    };
  }

  public static toDomain(city: PersistenceCity): City {
    return City.build(
      {
        country: city.country,
        name: city.name,
      },
      city.id,
    );
  }
}

export { CityMapper };
