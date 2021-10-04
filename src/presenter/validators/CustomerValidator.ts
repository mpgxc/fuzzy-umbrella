import { Joi, Segments } from 'celebrate';

const CustomerValidator = {
  BODY: {
    [Segments.BODY]: Joi.object().keys({
      full_name: Joi.string().required(),
      birth_date: Joi.date().required(),
      genre: Joi.string().required(),
      city_id: Joi.string().uuid().required(),
    }),
  },
};

export { CustomerValidator };
