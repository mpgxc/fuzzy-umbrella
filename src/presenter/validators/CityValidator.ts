import { Joi, Segments } from 'celebrate';

const CityValidator = {
  BODY: {
    [Segments.BODY]: Joi.object().keys({
      country: Joi.string().required(),
      name: Joi.string().required(),
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

export { CityValidator };
