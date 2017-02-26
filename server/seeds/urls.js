import Urls from '/imports/app/urls/collections';

const URL_1 = {
  created: new Date(),
  longUrl: 'https://google.com',
  shortUrl: 'http://localhost:3000/s/gg',
  shortId: 'gg',
  meta: {
    lastAccessed: null,
    visitorCount: 0,
  },
};

export const seed = () => {
  Urls.insert(URL_1);
};

export const teardown = () => {
  Urls.remove({});
};
