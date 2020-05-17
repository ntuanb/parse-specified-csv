const moment = require('moment');
const helpers = require('../helpers');

const generate = function(report, row) {
  let updatedReport = report;

  let OrderPriority = row['Order Priority'];
  let OrderDate = moment.utc(row['Order Date'], 'MM/DD/YYYY');

  let key = helpers.generateKey(
    OrderDate.format('YYYY'),
    OrderDate.format('MM'),
    OrderPriority
  );

  let value = helpers.getObjectNestedValue(report, key);
  let newValue = value + 1;

  updatedReport = helpers.updateObjectNestedValue(
    report,
    key,
    newValue
  );

  return updatedReport;
}

module.exports = {
  generate: generate
}