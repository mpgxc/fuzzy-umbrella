type HttpQuerys = {
  [key: string]: string;
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
