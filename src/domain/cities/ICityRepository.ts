import { City } from './City';
import { RenderCityResponse } from './CityMapper';

interface ICityRepository {
  create(city: City): Promise<void>;
  save(city: City): Promise<void>;
  delete(id: string): Promise<void>;

  findById(id: string): Promise<City>;
  findByName(name: string): Promise<City>;
  findByCountry(country: string): Promise<RenderCityResponse[]>;
  list(): Promise<RenderCityResponse[]>;
}

export { ICityRepository, RenderCityResponse };
