export type IBackendResponse<D extends object> = {
  data: D;
  message: string;
  statusCode: number;
};
