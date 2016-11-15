import { ServiceConfiguration } from 'meteor/service-configuration';

ServiceConfiguration.configurations.remove({
  service: 'facebook',
});

ServiceConfiguration.configurations.insert({
  service: 'facebook',
  appId: Meteor.settings.keys.facebook.appId,
  secret: Meteor.settings.keys.facebook.appSecret,
});
