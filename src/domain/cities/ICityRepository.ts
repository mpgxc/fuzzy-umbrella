import { IBaseRepository } from '@domain/common/IBaseRepository';

import { City } from './City';
import { RenderCityResponse } from './CityMapper';

type FindByStateAndCityRequest = {
  city: string;
  state: string;
};

interface ICityRepository extends IBaseRepository<City, RenderCityResponse> {
  findByName(name: string): Promise<RenderCityResponse[]>;
  findByCountry(country: string): Promise<RenderCityResponse[]>;
  findByStateCity({
    city,
    state,
  }: FindByStateAndCityRequest): Promise<RenderCityResponse>;
}

export { ICityRepository, FindByStateAndCityRequest };
