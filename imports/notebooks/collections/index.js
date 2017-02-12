import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Notebooks = new Mongo.Collection('notebooks');

Notebooks.schema = new SimpleSchema({
  title: { type: String },
  ownerId: { type: String },
});

if (Meteor.isServer) {
  Meteor.publish('notebooks.mine', () => {
    const { userId } = this;

    check(userId, String);

    return Notebooks.find({
      ownerId: userId,
    });
  });
}

Meteor.methods({
  'notebooks:insert': ({ title }) => {
    const { userId } = this;

    if (!userId) {
      throw new Meteor.Error('note-authorized');
    }

    return Notebooks.insert({
      title,
      ownerId: userId,
    });
  },
});

export default Notebooks;
