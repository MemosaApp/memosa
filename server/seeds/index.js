/**
 * You can seed via a `Meteor.call('seed');`
 * You can teardown via a `Meteor.call('teardown');`
 */

/* eslint-disable no-process-env */
if (process.env.NODE_ENV === 'development') {
  import { seed as seedUsers, teardown as teardownUsers } from './users';
  import { seed as seedNotebooks, teardown as teardownNotebooks } from './notebooks';

  const seed = () => {
    console.log('SEEDING…'); // eslint-disable-line no-console
    seedUsers();
    seedNotebooks();
    console.log('SEEDED!'); // eslint-disable-line no-console
  };

  const teardown = () => {
    console.log('TEARING DOWN…'); // eslint-disable-line no-console
    teardownNotebooks();
    teardownUsers();
    console.log('TEARED DOWN!'); // eslint-disable-line no-console
  };


  Meteor.methods({
    seed() {
      seed();
    },
    teardown() {
      teardown();
    },
  });

  if (process.env.METEOR_ENV === 'seed') {
    seed();
    process.exit();
  }

  if (process.env.METEOR_ENV === 'teardown') {
    teardown();
    process.exit();
  }
}
/* eslint-enale no-process-env */
