export type GetType = {
  method: "GET";
  url: string;
};

export type PostType = {
  method: "POST";
  url: string;
  body: any;
};

export type PutType = {
  method: "PUT";
  url: string;
  body: any;
};

export type DeleteType = {
  method: "DELETE";
  url: string;
};

export type FetchApiType = GetType | PostType | PutType | DeleteType;

export type ErrorType = {
  type: "AxiosError" | "TypeError";
  message: string;
};
