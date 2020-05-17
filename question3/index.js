const moment = require('moment');
const helpers = require('../helpers');

const generate = function(report, row) {
  let key, value, newValue;
  let updatedReport = report;

  let Region = row['Region'];
  let Country = row['Country'];
  let OrderDate = moment.utc(row['Order Date'], 'MM/DD/YYYY');
  let ShipDate = moment.utc(row['Ship Date'], 'MM/DD/YYYY');

  /** Date NumberOfOrders */
  key = helpers.generateKey(
    ShipDate.format('YYYY'),
    ShipDate.format('MM'),
    'NumberOfOrders'
  );
  value = helpers.getObjectNestedValue(report, key);
  newValue = value + 1;
  updatedReport = helpers.updateObjectNestedValue(
    report,
    key,
    newValue
  );

  /** TotalDaysShipment */
  let daysTillShipment = ShipDate.diff(OrderDate, 'days');
  key = helpers.generateKey(
    ShipDate.format('YYYY'),
    ShipDate.format('MM'),
    'TotalDaysTillShipment'
  );
  value = helpers.getObjectNestedValue(report, key);
  newValue = value + daysTillShipment;
  updatedReport = helpers.updateObjectNestedValue(
    report,
    key,
    newValue
  );

  /** Region NumberOfOrders */
  let regionNumberOfOrdersKey = helpers.generateKey(
    ShipDate.format('YYYY'),
    ShipDate.format('MM'),
    'Regions',
    Region,
    'NumberOfOrders'
  );
  let regionNumberOfOrdersValue = helpers.getObjectNestedValue(report, regionNumberOfOrdersKey);
  let regionNumberOfOrdersNewValue = regionNumberOfOrdersValue + 1;
  updatedReport = helpers.updateObjectNestedValue(
    report,
    regionNumberOfOrdersKey,
    regionNumberOfOrdersNewValue
  );

  /** TotalDaysShipment */
  let regionDaysTillShipment = ShipDate.diff(OrderDate, 'days');
  key = helpers.generateKey(
    ShipDate.format('YYYY'),
    ShipDate.format('MM'),
    'Regions',
    Region,
    'TotalDaysTillShipment'
  );
  value = helpers.getObjectNestedValue(report, key);
  newValue = value + regionDaysTillShipment;
  updatedReport = helpers.updateObjectNestedValue(
    report,
    key,
    newValue
  );

  /** Country NumberOfOrders */
  let countryNumberOfOrdersKey = helpers.generateKey(
    ShipDate.format('YYYY'),
    ShipDate.format('MM'),
    'Regions',
    Region,
    'Countries',
    Country,
    'NumberOfOrders'
  );
  let countryNumberOfOrdersValue = helpers.getObjectNestedValue(report, countryNumberOfOrdersKey);
  let countryNumberOfOrdersNewValue = countryNumberOfOrdersValue + 1;
  updatedReport = helpers.updateObjectNestedValue(
    report,
    countryNumberOfOrdersKey,
    countryNumberOfOrdersNewValue
  );

  /** TotalDaysShipment */
  let countryDaysTillShipment = ShipDate.diff(OrderDate, 'days');
  key = helpers.generateKey(
    ShipDate.format('YYYY'),
    ShipDate.format('MM'),
    'Regions',
    Region,
    'Countries',
    Country,
    'TotalDaysTillShipment'
  );
  value = helpers.getObjectNestedValue(report, key);
  newValue = value + countryDaysTillShipment;
  updatedReport = helpers.updateObjectNestedValue(
    report,
    key,
    newValue
  );

  return updatedReport;
}

const calculateAverageDaysToShip = function(object) {
  let totalDays = object['TotalDaysTillShipment'];
  let numberOfOrders = object['NumberOfOrders'];
  return totalDays / numberOfOrders;
}

const generateAverageShipmentDays = function(report) {
  let updatedReport = report;

  for (let yearNumber in report) {
    let year = report[yearNumber];

    for (let monthNumber in year) {
      let month = year[monthNumber];

      let averageForMonth = calculateAverageDaysToShip(month);

      updatedReport = helpers.updateObjectNestedValue(
        report,
        helpers.generateKey(yearNumber, monthNumber, 'AvgDaysToShip'),
        averageForMonth
      );
    
      for (let regionKey in month['Regions']) {
        let region = month['Regions'][regionKey];

        let averageForRegion = calculateAverageDaysToShip(region);
        updatedReport = helpers.updateObjectNestedValue(
          report,
          helpers.generateKey(yearNumber, monthNumber, 'Regions', regionKey, 'AvgDaysToShip'),
          averageForRegion
        );

        for (let countryKey in region['Countries']) {
          let country = region['Countries'][countryKey];
          
          let averageForCountry = calculateAverageDaysToShip(country);
          updatedReport = helpers.updateObjectNestedValue(
            report,
            helpers.generateKey(yearNumber, monthNumber, 'Regions', regionKey, 'Countries', countryKey, 'AvgDaysToShip'),
            averageForCountry
          );
        }
      }
    }
  }

  return updatedReport;
}

module.exports = {
  generate: generate,
  generateAverageShipmentDays: generateAverageShipmentDays,
}