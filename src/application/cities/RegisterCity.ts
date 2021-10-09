import { City } from '@domain/cities/City';
import { ICityRepository } from '@domain/cities/ICityRepository';
import { inject, injectable } from 'tsyringe';

import { ContainerRegisterAlias } from '@shared/container/​​​​ContainerRegisterAlias';
import { Either, Result } from '@shared/exceptions';

import { CityAlreadyExistsError } from './errors';

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
    const cityExists = await this.cityRepository.findByStateCity({
      city: name,
      state: country,
    });

    if (cityExists) {
      return Result.Failure(new CityAlreadyExistsError(name));
    }

    const city = City.build({ country, name });

    await this.cityRepository.create(city);

    return Result.Success(city);
  }
}

export { RegisterCity, RegisterCityRequest };
