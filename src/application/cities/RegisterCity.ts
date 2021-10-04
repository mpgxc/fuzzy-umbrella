import { City } from '@domain/cities/City';
import { ICityRepository } from '@domain/cities/ICityRepository';
import { inject, injectable } from 'tsyringe';

import { ContainerRegisterAlias } from '@shared/container/​​​​ContainerRegisterAlias';
import { Either, Result } from '@shared/excpetions';

import { CityAlreadyExistsError } from './errors/CityAlreadyExistsError';

type RegisterCityRequest = {
  name: string;
  country: string;
};

type RegisterCityResponse = Either<City, CityAlreadyExistsError>;

@injectable()
class RegisterCity {
  constructor(
    @inject(ContainerRegisterAlias.CityRepository)
    private readonly cityRepository: ICityRepository,
  ) {}

  async run({
    country,
    name,
  }: RegisterCityRequest): Promise<RegisterCityResponse> {
    const cities = await this.cityRepository.findByName(name);

    const cityExists = cities.some(city => city.country === country);

    if (cityExists) {
      return Result.Failure(new CityAlreadyExistsError(name));
    }

    const city = City.build({ country, name });

    await this.cityRepository.create(city);

    return Result.Success(city);
  }
}

export { RegisterCity, RegisterCityRequest };
