/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppException } from '@shared/exceptions';

import { HttpStatusCodes } from './HttpStatusCodes';

type HttpResponse = {
  statusCode: number;
  body: any;
};

const ok = <T>(dto?: T): HttpResponse => ({
  statusCode: HttpStatusCodes.STATUS_CODE_OK,
  body: dto,
});

const created = <T>(dto?: T): HttpResponse => ({
  statusCode: HttpStatusCodes.STATUS_CODE_CREATED,
  body: dto,
});

const removed = (): HttpResponse => ({
  statusCode: HttpStatusCodes.STATUS_CODE_NO_CONTENT,
  body: null,
});

const exception = (error: AppException): HttpResponse => {
  return {
    statusCode: error.statusCode
      ? error.statusCode
      : HttpStatusCodes.STATUS_CODE_BAD_REQUEST,
    body: {
      status: 'Exception!',
      name: error.name,
      message: error.message,
    },
  };
};

export { HttpResponse, exception, removed, created, ok };
