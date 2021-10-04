import { City } from '@domain/cities/City';
import { CityMapper } from '@domain/cities/CityMapper';
import {
  ICityRepository,
  RenderCityResponse,
} from '@domain/cities/ICityRepository';

class CityRepository implements ICityRepository {
  private cities: Partial<RenderCityResponse>[] = [];

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

  async findByName(name: string): Promise<City> {
    const city = this.cities.find(city => city.name === name);
    return city ? CityMapper.toDomain(city as RenderCityResponse) : null;
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
