import { Mongo } from 'meteor/mongo';

import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Urls = new Mongo.Collection('urls');

Urls.schema = new SimpleSchema({
  created: { type: Date },
  longUrl: { type: String },
  shortUrl: { type: String },
  shortId: { type: String },
  'meta.lastAccessed': { type: Date, optional: true },
  'meta.visitorCount': { type: Number },
});

export default Urls;
