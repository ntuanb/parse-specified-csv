const fs = require('fs');
const lodashGet = require('lodash/get');
const lodashSet = require('lodash/setWith');

const writeObjectToFile = function(file, object) {
  let stream = fs.createWriteStream(file);
  stream.once('open', function(fd) {
    stream.write(JSON.stringify(object || {}, null, 2));
    stream.end();
  });
}

const generateKey = function(...args) {
  return args.join('.');
};

const getObjectNestedValue = function(report, key) {
  if (!lodashGet(report, key)) lodashSet(report, key, 0, Object);
  return lodashGet(report, key);
}

const updateObjectNestedValue = function(report, key, value) {
  if (!lodashGet(report, key)) lodashSet(report, key, 0);
  lodashSet(report, key, value);
  return report;
}

module.exports = {
  writeObjectToFile: writeObjectToFile,
  generateKey: generateKey,
  getObjectNestedValue: getObjectNestedValue,
  updateObjectNestedValue: updateObjectNestedValue
};