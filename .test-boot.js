import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import { jsdom } from 'jsdom';

chai.use(chaiAsPromised);
chai.use(sinonChai);

var exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

// spec/javascripts/helpers/jest-env.js
// window.getSelection isn't in jsdom
// https://github.com/tmpvar/jsdom/issues/937
window.getSelection = function() {
  return {
    addRange: function() {},
    removeAllRanges:function() {}
  };
};

window.document.getSelection = window.getSelection;

// Storage Mock
function storageMock() {
  var storage = {};

  return {
    setItem: function(key, value) {
      storage[key] = value || '';
    },
    getItem: function(key) {
      return storage[key] || null;
    },
    removeItem: function(key) {
      delete storage[key];
    },
    get length() {
      return Object.keys(storage).length;
    },
    key: function(i) {
      var keys = Object.keys(storage);
      return keys[i] || null;
    }
  };
}

// mock the localStorage
global.localStorage = storageMock();
// mock the sessionStorage
global.sessionStorage = storageMock();

// Mock request animation frame

window.requestAnimationFrame = () => {};
