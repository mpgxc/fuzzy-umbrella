import 'reflect-metadata';
import { City } from '@domain/cities/City';
import { ICityRepository } from '@domain/cities/ICityRepository';
import { MemoryCityRepository } from '@infra/database/repositories';

import { BaseAppException } from '@shared/excpetions';

import { RegisterCity } from '../RegisterCity';

let cityRepository: ICityRepository;
let registerCity: RegisterCity;

describe('UseCase - RegisterCity', () => {
  beforeEach(async () => {
    cityRepository = new MemoryCityRepository();
    registerCity = new RegisterCity(cityRepository);
  });

  it('should be able to register new cities!', async () => {
    const cityOrError = await registerCity.run({
      country: 'Piauí',
      name: 'Esperantina',
    });

    const city = cityOrError.value as City;
    expect(await cityRepository.findById(city.id)).toBeTruthy();
    expect(cityOrError.isError).toBe(false);
  });

  it('should not be able to register new cities with the same name for the same state!', async () => {
    await registerCity.run({
      country: 'Piauí',
      name: 'Esperantina',
    });

    const cityOrError = await registerCity.run({
      country: 'Piauí',
      name: 'Esperantina',
    });

    expect(cityOrError.isError).toBe(true);
    expect((cityOrError.value as BaseAppException).name).toEqual(
      'CityAlreadyExistsError',
    );
  });

  it('should be able to register new cities with the same name for the different states!', async () => {
    await registerCity.run({
      country: 'São Paulo',
      name: 'Esperantina',
    });

    const cityOrError = await registerCity.run({
      country: 'Piauí',
      name: 'Esperantina',
    });

    expect(cityOrError.isError).toBe(false);

    const cities = await cityRepository.findByName('Esperantina');
    expect(cities.length).toBe(2);
    expect(cities).toBeTruthy();
  });
});
