/* globals browser */
import { expect } from 'chai';

import { BASE_URL } from './utilities/constants';

describe('Browser Tab Title', () => {
  beforeEach(() => {
    browser.url(BASE_URL);
  });

  it('is Memosa', () => {
    expect(browser.getTitle()).to.equal('Memosa');
  });
});
