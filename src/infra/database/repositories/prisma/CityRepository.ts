import { City } from '@domain/cities/City';
import { CityMapper, RenderCityResponse } from '@domain/cities/CityMapper';
import {
  FindByStateAndCityRequest,
  ICityRepository,
} from '@domain/cities/ICityRepository';
import { prisma } from '@infra/database/prisma';

class CityRepository implements ICityRepository {
  async create(city: City): Promise<void> {
    await prisma.city.create({
      data: CityMapper.toPersistence(city),
    });
  }

  async save(city: City): Promise<void> {
    await prisma.city.update({
      where: {
        id: city.id,
      },
      data: {
        ...CityMapper.toPersistence(city),
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.city.delete({
      where: {
        id,
      },
    });
  }

  async findById(id: string): Promise<City> {
    const city = await prisma.city.findUnique({
      where: {
        id,
      },
    });

    return city ? CityMapper.toDomain(city) : null;
  }

  async findByName(name: string): Promise<City[]> {
    const cities = await prisma.city.findMany({
      where: {
        name,
      },
    });

    return cities ? cities.map(CityMapper.toDomain) : null;
  }

  async findByCountry(country: string): Promise<RenderCityResponse[]> {
    const cities = await prisma.city.findMany({
      where: {
        country,
      },
    });

    return cities.map(CityMapper.toRender);
  }

  async findByStateCity({
    city,
    state,
  }: FindByStateAndCityRequest): Promise<City> {
    const cityFound = await prisma.city.findFirst({
      where: {
        name: { contains: city },
        country: { contains: state },
      },
    });

    return cityFound ? CityMapper.toDomain(cityFound) : null;
  }

  async list(): Promise<RenderCityResponse[]> {
    const cities = await prisma.city.findMany();

    return cities.map(CityMapper.toRender);
  }
}

export { CityRepository };
