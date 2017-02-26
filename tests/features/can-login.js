/* globals browser */
import { expect } from 'chai';

import { BASE_URL } from './utilities/constants';
// import login from './utilities/login';

describe('login', () => {
  beforeEach(() => {
    browser.url(BASE_URL);

    // Log user out
  });

  it('has a login form', () => {
    expect(browser.element('input[type=email]')).to.not.be.null;
    expect(browser.element('input[type=password]')).to.not.be.null;
  });

  it('can log a user in', () => {
    // login(browser);

    // expect(browser.element('input[type=password]')).to.be.null;
  });
});
