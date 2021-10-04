import { City as PersistenceCity } from '@prisma/client';

import { City } from './City';

type CityPersistence = {
  id: string;
  name: string;
  country: string;
};

type RenderCityResponse = PersistenceCity;
class CityMapper {
  public static toPersistence(city: City): CityPersistence {
    return {
      id: city.id,
      name: city.name,
      country: city.country,
    };
  }

  public static toRender(city: PersistenceCity): PersistenceCity {
    return {
      id: city.id,
      name: city.name,
      country: city.country,
      created_at: city.created_at,
      is_active: city.is_active,
      updated_at: city.updated_at,
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

export { CityMapper, RenderCityResponse };
