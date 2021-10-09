import { City } from './City';
import { RenderCityResponse } from './CityMapper';

type FindByStateAndCityRequest = {
  city: string;
  state: string;
};

interface ICityRepository {
  create(city: City): Promise<void>;
  save(city: City): Promise<void>;
  delete(id: string): Promise<void>;

  findById(id: string): Promise<City>;
  findByIdRender(id: string): Promise<RenderCityResponse>;
  findByName(name: string): Promise<RenderCityResponse[]>;
  findByCountry(country: string): Promise<RenderCityResponse[]>;
  findByStateCity({
    city,
    state,
  }: FindByStateAndCityRequest): Promise<RenderCityResponse>;
  list(): Promise<RenderCityResponse[]>;
}

export { ICityRepository, FindByStateAndCityRequest };
