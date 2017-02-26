import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Memos = new Mongo.Collection('memos');

Memos.schema = new SimpleSchema({
  body: { type: String },
  created: { type: Date },
  notebookId: { type: String },
  ownerId: { type: String },
});

if (Meteor.isServer) {
  Meteor.publish('memos.mine', function memosPublication() {
    const { userId } = this;

    check(userId, String);

    return Memos.find({
      ownerId: userId,
    });
  });
}

Meteor.methods({
  'memos.insert'({ body, notebookId }) {
    const { userId } = this;

    check(body, String);
    check(notebookId, String);

    if (!userId) {
      throw new Meteor.Error('not-authorized');
    }

    return Memos.insert({
      body,
      ownerId: userId,
      notebookId,
      created: new Date(),
    });
  },
  'memos.update'(id, { body, notebookId }) {
    const { userId } = this;

    check(id, String);
    check(body, String);
    check(notebookId, String);

    if (!userId) {
      throw new Meteor.Error('not-authorized');
    }

    return Memos.update(id, {
      $set: {
        body,
        ownerId: userId,
        notebookId,
        updated: new Date(),
      },
    });
  },
});

export default Memos;
