/* eslint-disable @typescript-eslint/no-explicit-any */
type ValidationCelebrateErrors = {
  [key: string]: any;
};

type CelebrateMapperMessage = {
  type: string;
  message: string;
  label: string;
};

class CelebrateMapper {
  static render = (data: ValidationCelebrateErrors): CelebrateMapperMessage => {
    const [, typeError] = data.type.split('.');

    return {
      type: typeError,
      message: data.message,
      label: data.context.label,
    };
  };

  static renderMany = (
    data: ValidationCelebrateErrors[],
  ): CelebrateMapperMessage[] =>
    data.map((item: ValidationCelebrateErrors) => CelebrateMapper.render(item));
}

export { CelebrateMapper };
