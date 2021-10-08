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

  PARAM: {
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
  },

  QUERY: {
    [Segments.QUERY]: Joi.object()
      .keys({
        name: Joi.string().optional(),
      })
      .unknown(),
  },
};

export { CustomerValidator };
