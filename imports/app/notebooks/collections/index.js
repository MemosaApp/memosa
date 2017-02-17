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
  Meteor.publish('notebooks.mine', function notebooksPublication() {
    const { userId } = this;

    check(userId, String);

    return Notebooks.find({
      ownerId: userId,
    });
  });
}

const generatePerfectColor = () => {
  const seed = Math.random();

  let hue = (seed * 360) % 360;
  // reflect yellow colors
  if (hue > 45 && hue < 67) {
    hue = 360 - hue;
  }

  return {
    hue,
    saturation: 40,
    lightness: 50,
  };
};

Meteor.methods({
  'notebooks.insert'({ title }) {
    const { userId } = this;

    if (!userId) {
      throw new Meteor.Error('note-authorized');
    }

    return Notebooks.insert({
      title,
      ownerId: userId,
      created: new Date(),
      color: generatePerfectColor(),
    });
  },
});

export default Notebooks;
