require('babel-register')();
import {expect} from 'chai';
import sinon from 'sinon';
import jsdom from 'jsdom'
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>')
global.document = doc;
global.window = doc.defaultView;
global.navigator = {
  userAgent: 'node.js'
};
global.expect = expect;
global.sinon = sinon;