import { CityNotFoundError } from '@application/customers/errors';
import { RenderCityResponse } from '@domain/cities/CityMapper';
import { ICityRepository } from '@domain/cities/ICityRepository';
import { inject, injectable } from 'tsyringe';

import { ContainerRegisterAlias } from '@shared/container/​​​​ContainerRegisterAlias';
import { Either, Result } from '@shared/excpetions';

type ShowCityResponse = Either<RenderCityResponse, CityNotFoundError>;

@injectable()
class ShowCity {
  constructor(
    @inject(ContainerRegisterAlias.CityRepository)
    private readonly cityRepository: ICityRepository,
  ) {}

  async run(id: string): Promise<ShowCityResponse> {
    const city = await this.cityRepository.findByIdRender(id);

    if (!city) {
      return Result.Failure(new CityNotFoundError(id));
    }

    return Result.Success(city);
  }
}

export { ShowCity };
