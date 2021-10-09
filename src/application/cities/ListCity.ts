import { RenderCityResponse } from '@domain/cities/CityMapper';
import { ICityRepository } from '@domain/cities/ICityRepository';
import { inject, injectable } from 'tsyringe';

import { ContainerRegisterAlias } from '@shared/container/​​​​ContainerRegisterAlias';

type ListCityQuery = {
  state?: string;
  city?: string;
};

@injectable()
class ListCity {
  constructor(
    @inject(ContainerRegisterAlias.CityRepository)
    private readonly cityRepository: ICityRepository,
  ) {}

  async run({
    city,
    state,
  }: ListCityQuery): Promise<RenderCityResponse | RenderCityResponse[]> {
    if (state && city) {
      return this.cityRepository.findByStateCity({
        city,
        state,
      });
    }

    if (state) {
      return this.cityRepository.findByCountry(state);
    }

    if (city) {
      return this.cityRepository.findByName(city);
    }

    return this.cityRepository.list();
  }
}

export { ListCity, ListCityQuery };
