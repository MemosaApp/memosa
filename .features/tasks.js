/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

// These are Chimp globals
/* globals browser assert */

const countLists = () => {
  browser.waitForExist('.tasks');
  const elements = browser.elements('.task');
  return elements.value.length;
};

describe('task ui', () => {
  beforeEach(() => {
    browser.url('http://localhost:3000');
  });

  it('can create a task', () => {
    const initialCount = countLists();

    browser.setValue('.new-task input', 'Test task')
      .submitForm('.new-task');

    assert.equal(countLists(), initialCount + 1);
  });
});
