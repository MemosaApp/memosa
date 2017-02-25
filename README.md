# Memosa

The Memosa Meteor FE, Mobile, and BE application.

**Master Status**

[![build status](https://gitlab.com/memosa/memosa/badges/master/build.svg)](https://gitlab.com/memosa/memosa/commits/master) [![coverage report](https://gitlab.com/memosa/memosa/badges/master/coverage.svg)](https://gitlab.com/memosa/memosa/commits/master)

**Develop Status**

[![build status](https://gitlab.com/memosa/memosa/badges/develop/build.svg)](https://gitlab.com/memosa/memosa/commits/develop) [![coverage report](https://gitlab.com/memosa/memosa/badges/develop/coverage.svg)](https://gitlab.com/memosa/memosa/commits/develop)

## Running the app

```
npm start
```

Then go to [http://localhost:3000/](http://localhost:3000/).

## Running tests

* Run linter and tests with coverage: `$ yarn test`
* Run lint: `$ yarn run lint`
* Watch lint: `$ yarn run lint:watch`
* Run mocha tests once: `$ yarn run test:mocha`
* Watch mocha tests: `$ yarn run test:watch`
* Run coverage: `$ yarn run test:cover:mocha`

## Feature tests

Current WIP:

* Run `$ yarn run test:chimp-wip`

## Seeding

**HEADS UP!** Do NOT have Meteor running when you run these commands.

You can seed your database with a test account with notebooks using:

```
npm run seed
```

The test user is:

```
email: test@test.com
pass: testing
```

You can run the following command to clear your database:

```
npm run teardown
```
