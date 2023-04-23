import Service, { serviceSelector, useService } from 'react-reservice';

interface IServiceContext {}

export const getUseServiceWithSubscriptionKeys =
  <T extends IServiceContext>(service: Service<T>) =>
  (subscriptionKeys: (keyof T)[]) =>
    useService(service, serviceSelector<typeof service, T>(subscriptionKeys));
