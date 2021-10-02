import { City } from './City';

interface ICityRepository {
  save(city: City): Promise<void>;
  delete(id: string): Promise<void>;

  findById(id: string): Promise<City>;
  findByName(name: string): Promise<City>;
  findByCountry(country: string): Promise<City[]>;
  list(): Promise<City[]>;
}

export { ICityRepository };
