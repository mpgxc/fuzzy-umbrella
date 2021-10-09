import 'reflect-metadata';
import { City } from '@domain/cities/City';
import { RenderCityResponse } from '@domain/cities/CityMapper';
import { ICityRepository } from '@domain/cities/ICityRepository';
import { MemoryCityRepository } from '@infra/database/repositories';
import { v4 } from 'uuid';

import { BaseAppException } from '@shared/excpetions';

import { ShowCity } from '../ShowCity';

let cityRepository: ICityRepository;
let showCity: ShowCity;

describe('UseCase - ShowCity', () => {
  beforeEach(async () => {
    cityRepository = new MemoryCityRepository();
    showCity = new ShowCity(cityRepository);
  });

  it('should be able to find specific city by id!', async () => {
    const city = City.build({
      country: 'São Paulo',
      name: 'Osasco',
    });

    await cityRepository.create(city);

    const cityOrError = await showCity.run(city.id);

    expect(cityOrError.isError).toBe(false);
    const cityFinded = cityOrError.value as RenderCityResponse;

    expect(cityFinded).toBeTruthy();
    expect(cityFinded.id).toBe(city.id);
    expect(cityFinded.name).toBe(city.name);
  });

  it('should not be able to find specific city by wrong/invalid id!', async () => {
    const cityOrError = await showCity.run(v4());
    const cityOrError2 = await showCity.run(undefined);
    const cityOrError3 = await showCity.run(null);
    const cityOrError4 = await showCity.run('');

    expect(cityOrError.isError).toBe(true);
    expect(cityOrError2.isError).toBe(true);
    expect(cityOrError3.isError).toBe(true);
    expect(cityOrError4.isError).toBe(true);

    const cityFinded = cityOrError.value as BaseAppException;
    const cityFinded2 = cityOrError2.value as BaseAppException;
    const cityFinded3 = cityOrError3.value as BaseAppException;
    const cityFinded4 = cityOrError4.value as BaseAppException;

    expect(cityFinded.name).toEqual('CityNotFoundError');
    expect(cityFinded2.name).toEqual('CityNotFoundError');
    expect(cityFinded3.name).toEqual('CityNotFoundError');
    expect(cityFinded4.name).toEqual('CityNotFoundError');
  });
});
