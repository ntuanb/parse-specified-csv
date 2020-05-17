const helpers = require('../helpers');

const generateRegionTotals = function(updatedReport, row) {
  let Region = row['Region'];
  let TotalRevenue = parseFloat(row['Total Revenue']);
  let TotalCost = parseFloat(row['Total Cost']);
  let TotalProfit = parseFloat(row['Total Profit']);

  let revenueKey = helpers.generateKey('Regions', Region, 'Total', 'Revenue');
  let revenue = helpers.getObjectNestedValue(updatedReport, revenueKey);
  let newRevenue = revenue + TotalRevenue;
  helpers.updateObjectNestedValue(
    updatedReport,
    revenueKey,
    newRevenue
  );

  let costKey = helpers.generateKey('Regions', Region, 'Total', 'Cost');
  let cost = helpers.getObjectNestedValue(updatedReport, costKey);
  let newCost = cost + TotalCost;
  helpers.updateObjectNestedValue(
    updatedReport,
    costKey,
    newCost
  );

  let profitKey = helpers.generateKey('Regions', Region, 'Total', 'Profit');
  let profit = helpers.getObjectNestedValue(updatedReport, profitKey);
  let newProfit  = profit + TotalProfit;
  helpers.updateObjectNestedValue(
    updatedReport,
    profitKey,
    newProfit
  );

  return updatedReport;
}

const generateCountryTotals = function(updatedReport, row) {
  let Region = row['Region'];
  let Country = row['Country'];
  let TotalRevenue = parseFloat(row['Total Revenue']);
  let TotalCost = parseFloat(row['Total Cost']);
  let TotalProfit = parseFloat(row['Total Profit']);

  let regionKey = helpers.generateKey('Regions', Region, 'Countries', Country, 'Total', 'Revenue');
  let revenue = helpers.getObjectNestedValue(updatedReport, regionKey);
  let newRevenue = revenue + TotalRevenue;
  helpers.updateObjectNestedValue(
    updatedReport,
    regionKey,
    newRevenue
  );

  let costKey = helpers.generateKey('Regions', Region, 'Countries', Country, 'Total', 'Cost');
  let cost = helpers.getObjectNestedValue(updatedReport, costKey);
  let newCost = cost + TotalCost;
  helpers.updateObjectNestedValue(
    updatedReport,
    costKey,
    newCost
  );

  let profitKey = helpers.generateKey('Regions', Region, 'Countries', Country, 'Total', 'Profit');
  let profit = helpers.getObjectNestedValue(updatedReport, profitKey);
  let newProfit = profit + TotalProfit;
  helpers.updateObjectNestedValue(
    updatedReport,
    profitKey,
    newProfit
  );

  return updatedReport;
}

const generateCountryItemTypeTotals = function(updatedReport, row) {
  let Region = row['Region'];
  let Country = row['Country'];
  let ItemType = row['Item Type'];
  let TotalRevenue = parseFloat(row['Total Revenue']);
  let TotalCost = parseFloat(row['Total Cost']);
  let TotalProfit = parseFloat(row['Total Profit']);

  let revenueKey = helpers.generateKey('Regions', Region, 'Countries', Country, 'ItemTypes', ItemType, 'Revenue');
  let revenue = helpers.getObjectNestedValue(updatedReport, revenueKey);
  let newRevenue = revenue + TotalRevenue;
  helpers.updateObjectNestedValue(
    updatedReport,
    revenueKey,
    newRevenue
  );

  let costKey = helpers.generateKey('Regions', Region, 'Countries', Country, 'ItemTypes', ItemType, 'Cost');
  let cost = helpers.getObjectNestedValue(updatedReport, costKey);
  let newCost = cost + TotalCost;
  helpers.updateObjectNestedValue(
    updatedReport,
    costKey,
    newCost
  );

  let profitKey = helpers.generateKey('Regions', Region, 'Countries', Country, 'ItemTypes', ItemType, 'Profit');
  let profit = helpers.getObjectNestedValue(updatedReport, profitKey);
  let newProfit = profit + TotalProfit;
  helpers.updateObjectNestedValue(
    updatedReport,
    profitKey,
    newProfit
  );

  return updatedReport;
}

const generateItemTypeTotals = function(updatedReport, row) {
  let ItemType = row['Item Type'];
  let TotalRevenue = parseFloat(row['Total Revenue']);
  let TotalCost = parseFloat(row['Total Cost']);
  let TotalProfit = parseFloat(row['Total Profit']);

  let revenueKey = helpers.generateKey('ItemTypes', ItemType, 'Revenue');
  let revenue = helpers.getObjectNestedValue(updatedReport, revenueKey);
  let newRevenue = revenue + TotalRevenue;
  helpers.updateObjectNestedValue(
    updatedReport,
    revenueKey,
    newRevenue
  );

  let costKey = helpers.generateKey('ItemTypes', ItemType, 'Cost');
  let cost = helpers.getObjectNestedValue(updatedReport, costKey);
  let newCost = cost + TotalCost;
  helpers.updateObjectNestedValue(
    updatedReport,
    costKey,
    newCost
  );

  let profitKey = helpers.generateKey('ItemTypes', ItemType, 'Profit');
  let profit = helpers.getObjectNestedValue(updatedReport, profitKey);
  let newProfit = profit + TotalProfit;
  helpers.updateObjectNestedValue(
    updatedReport,
    profitKey,
    newProfit
  );

  return updatedReport;
}

const generate = function(updatedReport, row) {
  updatedReport = generateRegionTotals(updatedReport, row);
  updatedReport = generateCountryTotals(updatedReport, row);
  updatedReport = generateCountryItemTypeTotals(updatedReport, row);
  updatedReport = generateItemTypeTotals(updatedReport, row);

  return updatedReport;
}

module.exports = {
  generate: generate
}