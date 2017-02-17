import Bottle from 'bottlejs';

import { connectFactory } from 'react-hocs';

let serviceProvider = new Bottle();

export const setServiceProvider = (newServiceProvider) => {
  serviceProvider = newServiceProvider;
};

export const getServiceProvider = () => {
  return serviceProvider;
};

export const injectServiceProvider = (func) => {
  return (props) => {
    return func({
      ...props,
      container: serviceProvider.container,
    });
  };
};

export const createInjectableService = (mapDataToProps) => {
  return (Component) => {
    const { createContainer } = serviceProvider.container;

    return connectFactory(
      createContainer(
        injectServiceProvider(mapDataToProps),
        Component
      )
    );
  };
};
