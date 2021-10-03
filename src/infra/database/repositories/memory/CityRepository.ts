import { City } from '@domain/cities/City';
import { ICityRepository } from '@domain/cities/ICityRepository';

class CityRepository implements ICityRepository {
  private cities: City[] = [];

  async create(city: City): Promise<void> {
    this.cities.push(city);
  }

  async save(city: City): Promise<void> {
    const index = this.cities.findIndex(c => c.id === city.id);
    this.cities[index] = city;
  }

  async delete(id: string): Promise<void> {
    const index = this.cities.findIndex(city => city.id === id);
    this.cities.splice(index, 1);
  }

  async findById(id: string): Promise<City> {
    return this.cities.find(city => city.id === id);
  }

  async findByName(name: string): Promise<City> {
    return this.cities.find(city => city.name === name);
  }

  async findByCountry(country: string): Promise<City[]> {
    return this.cities.filter(city => city.country === country);
  }

  async list(): Promise<City[]> {
    return this.cities;
  }
}

export { CityRepository };
