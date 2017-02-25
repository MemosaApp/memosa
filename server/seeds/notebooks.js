import fake from 'fake-oranges';

import Notebooks from '/imports/app/notebooks/collections';

import fromSchema from './utilities/fromSchema';
import { USER_ID } from './utilities/data';

export const seed = () => {
  fake({
    ...fromSchema(Notebooks),
    ownerId: USER_ID,
  }).make(10).forEach((notebook) => {
    Notebooks.insert(notebook);
  });
};

export const teardown = () => {
  Notebooks.remove({});
};
