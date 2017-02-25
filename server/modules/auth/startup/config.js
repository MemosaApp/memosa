import { ServiceConfiguration } from 'meteor/service-configuration';

if (Meteor.settings &&
    Meteor.settings.keys &&
    Meteor.settings.keys.facebook) {
  ServiceConfiguration.configurations.remove({
    service: 'facebook',
  });

  ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: Meteor.settings.keys.facebook.appId,
    secret: Meteor.settings.keys.facebook.appSecret,
  });
} else {
  console.log('No settings provided, skipping service configuration'); // eslint-disable-line no-console
}
