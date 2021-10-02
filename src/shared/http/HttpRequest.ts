type HttpQuerys = {
  [key: string]: undefined | string | string[] | HttpQuerys | HttpQuerys[];
};

type HttpParams = {
  [key: string]: string;
};

type HttpHeaders = {
  [key: string]: string | string[];
};

export type HttpRequest = {
  body: any;
  params: HttpParams;
  query: HttpQuerys;
  headers: HttpHeaders;
};
