const fs = require('fs');
const csv = require('csv-parser');
const config = require('./config');
const helpers = require('./helpers');
const question1 = require('./question1/index');
const question2 = require('./question2/index');
const question3 = require('./question3/index');

let report1 = {};
let report2 = {};
let report3 = {};

console.log(new Date());

fs.createReadStream(config.FILE)
  .pipe(csv())
  .on('data', function (row) {
    report1 = question1.generate(report1, row);
    report2 = question2.generate(report2, row);
    report3 = question3.generate(report3, row);
  })
  .on('error', function(e) {
    console.log('Error: ', e);
    console.log(new Date());

    helpers.writeObjectToFile('question1/answer.json', report1);
    helpers.writeObjectToFile('question2/answer.json', report2);
    helpers.writeObjectToFile('question3/answer.json', report3);
  })
  .on('end', function () {
    console.log('Completed.');
    console.log(new Date());

    report3 = question3.generateAverageShipmentDays(report3);

    helpers.writeObjectToFile('question1/answer.json', report1);
    helpers.writeObjectToFile('question2/answer.json', report2);
    helpers.writeObjectToFile('question3/answer.json', report3);

  });