import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { RESOLVED, FETCHING } from '/imports/app/constants';
import Entities from '/imports/entities/collections/entities';

import MemoRibbon from '../components/MemoRibbon';

// TODO connect to redux to pass through the filter

const mapDataToProps = () => {
  const subscription = Meteor.subscribe('entities.all');

  return {
    state: subscription.ready() ? RESOLVED : FETCHING,
    files: Entities.find({}, {
      sort: { createdAt: -1 },
    }).fetch(),
    handleUpload: (files) => {
      return files.map(file => {
        return Entities.insert({
          file,
          streams: 'dynamic',
          chunkSize: 'dynamic',
        }, false /* TODO I'm not sure what this false does */);
      });
    },
  };
};

export default createContainer(mapDataToProps, MemoRibbon);
