import 'reflect-metadata';
import { City } from '@domain/cities/City';
import { RenderCityResponse } from '@domain/cities/CityMapper';
import { ICityRepository } from '@domain/cities/ICityRepository';
import { MemoryCityRepository } from '@infra/database/repositories';

import { ListCity } from '../ListCity';

let cityRepository: ICityRepository;
let listCity: ListCity;

describe('UseCase - ListCity', () => {
  beforeEach(async () => {
    cityRepository = new MemoryCityRepository();
    listCity = new ListCity(cityRepository);
  });

  it('should be able to list all registered cities!', async () => {
    const citiesPromises = [];

    for (let i = 0; i < 8; i += 1) {
      const city = City.build({
        name: `Cidade ${i}`,
        country: `Estado ${i}`,
      });

      citiesPromises.push(cityRepository.create(city));
    }

    await Promise.all(citiesPromises);

    const result = (await listCity.run({})) as RenderCityResponse[];

    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBe(8);

    const [first] = result;

    expect(first.name).toBe('Cidade 0');
    expect(first.country).toBe('Estado 0');
  });

  it('should be able to list all registered cities with query Cidade!', async () => {
    const citiesPromises = [];

    for (let i = 0; i < 8; i += 1) {
      const city = City.build({
        name: `Cidade ${i}`,
        country: `Estado ${i}`,
      });

      citiesPromises.push(cityRepository.create(city));
    }

    await Promise.all(citiesPromises);

    const result = (await listCity.run({
      city: 'Cidade 7',
    })) as RenderCityResponse[];

    expect(result).toBeInstanceOf(Array);

    const [first] = result;

    expect(first.name).toBe('Cidade 7');
    expect(first.country).toBe('Estado 7');
  });

  it('should be able to list all registered cities with query Estado!', async () => {
    const citiesPromises = [];

    for (let i = 0; i < 8; i += 1) {
      const city = City.build({
        name: `Cidade ${i}`,
        country: `Estado ${i}`,
      });

      citiesPromises.push(cityRepository.create(city));
    }

    await Promise.all(citiesPromises);

    const result = (await listCity.run({
      state: 'Estado 2',
    })) as RenderCityResponse[];

    expect(result).toBeInstanceOf(Array);

    const [first] = result;

    expect(first.name).toBe('Cidade 2');
    expect(first.country).toBe('Estado 2');
  });

  it('should be able to list all registered cities with query Estado and Cidade!', async () => {
    const citiesPromises = [];

    for (let i = 0; i < 8; i += 1) {
      const city = City.build({
        name: `Cidade ${i}`,
        country: `Estado ${i}`,
      });

      citiesPromises.push(cityRepository.create(city));
    }

    await Promise.all(citiesPromises);

    const result = await listCity.run({
      state: 'Estado 5',
      city: 'Cidade 5',
    });

    const [first] = result as RenderCityResponse[];

    expect(first).toBeInstanceOf(Object);
    expect(first.name).toBe('Cidade 5');
    expect(first.country).toBe('Estado 5');
  });
});
