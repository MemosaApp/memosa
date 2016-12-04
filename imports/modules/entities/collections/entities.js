import { FilesCollection } from 'meteor/ostrio:files';

const MAX_FILE_SIZE = 10485760;
const READIBLE_MAX_FILE_SIZE = '10MB';

const Entities = new FilesCollection({
  collectionName: 'Entities',
  allowClientCode: false,
  onBeforeUpload: (file) => {
    if (file.size <= MAX_FILE_SIZE) {
      return true;
    } else {
      return `Please upload a file less than ${READIBLE_MAX_FILE_SIZE}`;
    }
  },
});

// if (Meteor.isClient) {
//
// }

if (Meteor.isServer) {
  Meteor.publish('entities.all', () => {
    // TODO only if they are logged in
    // TODO only entities they have access too

    return Entities.find().cursor;
  });

  Meteor.publish('entities.memo', (/* memoId */) => {
    // TODO only if they are logged in
    // TODO only entities they have access too

    return Entities.find().cursor;
  });
}

export default Entities;
