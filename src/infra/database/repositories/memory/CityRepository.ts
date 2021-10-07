import { City } from '@domain/cities/City';
import {
  CityMapper,
  CityPersistence,
  RenderCityResponse,
} from '@domain/cities/CityMapper';
import { ICityRepository } from '@domain/cities/ICityRepository';

class CityRepository implements ICityRepository {
  private cities: CityPersistence[] = [];

  async create(city: City): Promise<void> {
    this.cities.push(CityMapper.toPersistence(city));
  }

  async save(city: City): Promise<void> {
    const index = this.cities.findIndex(c => c.id === city.id);
    this.cities[index] = CityMapper.toPersistence(city);
  }

  async delete(id: string): Promise<void> {
    const index = this.cities.findIndex(city => city.id === id);
    this.cities.splice(index, 1);
  }

  async findById(id: string): Promise<City> {
    const city = this.cities.find(city => city.id === id);
    return city ? CityMapper.toDomain(city as RenderCityResponse) : null;
  }

  async findByName(name: string): Promise<City[]> {
    const cities = this.cities.filter(city => city.name === name);
    return cities ? cities.map(CityMapper.toDomain) : null;
  }

  async findByCountry(country: string): Promise<RenderCityResponse[]> {
    const cities = this.cities.filter(city => city.country === country);
    return cities.map(CityMapper.toRender);
  }

  async list(): Promise<RenderCityResponse[]> {
    return this.cities.map(CityMapper.toRender);
  }
}

export { CityRepository };
