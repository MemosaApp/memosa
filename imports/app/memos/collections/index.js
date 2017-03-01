import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Memos = new Mongo.Collection('memos');

Memos.schema = new SimpleSchema({
  body: { type: Object },
  created: { type: Date },
  notebookId: { type: Object },
  ownerId: { type: String },
});

if (Meteor.isServer) {
  Meteor.publish('memos', function memosPublication(notebookId) {
    const { userId } = this;

    check(userId, String);
    check(notebookId, String);

    // TODO check that the user has access to the notebook
    // They are either the owner of the memo, or the notebook
    // is shared with them
    return Memos.find({
      ownerId: userId,
      notebookId,
    });
  });
}

Meteor.methods({
  'memos.insert'({ body, notebookId }) {
    const { userId } = this;

    check(body, Object);
    // TODO ask forums.meteor.com if this is the right way to do this
    check(notebookId.valueOf(), String);

    if (!userId) {
      throw new Meteor.Error('not-authorized');
    }

    return Memos.insert({
      body,
      ownerId: userId,
      notebookId: notebookId.valueOf(),
      created: new Date(),
    });
  },
  'memos.update'(id, { body, notebookId }) {
    const { userId } = this;

    check(id, String);
    check(body, Object);
    // TODO ask forums.meteor.com if this is the right way to do this
    check(notebookId.valueOf(), String);

    if (!userId) {
      throw new Meteor.Error('not-authorized');
    }

    return Memos.update(id, {
      $set: {
        body,
        ownerId: userId,
        notebookId: notebookId.valueOf(),
        updated: new Date(),
      },
    });
  },
});

export default Memos;
