import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import shortid from 'shortid';
import Urls from '/imports/app/urls/collections';

import { getShortUrlBasename } from '../utilities';

Meteor.methods({
  /**
   * Require auth for creating urls
   */
  'url.shorten'(longUrl) {
    const { userId } = this;

    check(longUrl, String);

    if (!userId) {
      throw new Meteor.Error('not-authorized');
    }

    const shortId = shortid.generate();

    return Urls.insert({
      created: new Date(),
      longUrl,
      shortUrl: `${getShortUrlBasename()}/${shortId}`,
      shortId,
      meta: {
        lastAccessed: null,
        visitorCount: 0,
      },
    });
  },
  /**
   * No auth for getting real links
   */
  'url.expand'(shortId) {
    check(shortId, String);

    const url = Urls.findOne({
      shortId,
    });

    return url.longUrl;
  },
  'url.visit'(shortId) {
    check(shortId, String);

    return Urls.update({
      shortId,
    }, {
      $set: {
        'meta.lastAccessed': new Date(),
      },
      $inc: {
        'meta.visitorCount': 1,
      },
    });
  },
});
