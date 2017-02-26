export const getShortUrlBasename = () => {
  if (Meteor.settings &&
      Meteor.settings.domains &&
      Meteor.settings.domains.shortener) {
    return Meteor.settings.domains.shortener;
  } else {
    console.log('No settings provided, skipping service configuration'); // eslint-disable-line no-console
  }

  return 'http://localhost:3000/s';
};
