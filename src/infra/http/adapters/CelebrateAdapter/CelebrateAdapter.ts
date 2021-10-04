import { celebrate, SchemaOptions } from 'celebrate';

type CelebrateResponse = {
  abortEarly: boolean;
  messages: {
    'any.required': string;
    'string.empty': string;
  };
};

class CelebrateAdapter {
  private static message = (): CelebrateResponse => ({
    abortEarly: false,
    messages: {
      'any.required': 'This Field is required!',
      'string.empty': 'Requires the field to be filled!',
    },
  });

  static apply = (validationFilds: SchemaOptions): any =>
    celebrate(validationFilds, CelebrateAdapter.message());
}

export { CelebrateAdapter };
