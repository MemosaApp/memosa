/* globals browser */
import { expect } from 'chai';

import { BASE_URL } from './utilities/constants';

describe('Url Shortener', () => {
  it('redirects using a short url @watch', () => {
    browser.url(`${BASE_URL}/s/gg`);

    expect(browser.getUrl()).to.be.equal('https://www.google.com/');
  });
});
