import React from 'react';
import { Route } from 'react-router';
import { history } from '/imports/store';

const handleShortenedLink = (nextState) => {
  if (nextState.params.shortId) {

  } else {
    // Go back
    history.goBack();
  }
};

export default (
  <Route path="s">
    <Route path=":shortId" onEnter={handleShortenedLink} />
  </Route>
);
