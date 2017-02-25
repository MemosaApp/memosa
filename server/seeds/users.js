import { Meteor } from 'meteor/meteor';
import { USER_ID } from './utilities/data';

const TEST_USER = {
  _id: USER_ID,
  createdAt: new Date('2017-01-20T05:07:22.488Z'),
  services: {
    password: {
      // testing
      bcrypt: '$2a$10$Qpa9cLAmFMSj95Jdb97ywOQvgFLfA43L1M6mtxAYuhxfqxpSrxe8a',
    },
    resume: {
      loginTokens: [],
    },
  },
  emails: [
    {
      address: 'test@test.com',
      verified: false,
    },
  ],
};

export const seed = () => {
  Meteor.users.insert(TEST_USER);
};

export const teardown = () => {
  Meteor.users.remove({});
};
