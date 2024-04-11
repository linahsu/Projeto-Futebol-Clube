export type ServiceResponseMessage = { message: string };

export type ServiceResponseErrorStatus =
'invalidValue' | 'unauthorized' | 'notFound' | 'badRequest';

export type ServiceResponseSuccessfulStatus = 'successful' | 'created';

export type ServiceResponseError = {
  status: ServiceResponseErrorStatus,
  data: ServiceResponseMessage,
};

export type ServiceResponseSuccessful<T> = {
  status: ServiceResponseSuccessfulStatus,
  data: T,
};

export type ServiceResponse<T> = ServiceResponseSuccessful<T> | ServiceResponseError;
