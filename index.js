const fs = require('fs');
const _ = require('lodash');
const creteCsv = require('./src/csv-preparator.module');
const dataToWrite = require('./assets/family-members').myData;
const creteFlatArr = require('./src/id-populator.module');

let populatedWithIds = [];
populatedWithIds = creteFlatArr.populateCompanyIds(dataToWrite);
console.log(populatedWithIds);

fs.writeFile(
  'out/customers.csv',
  creteCsv.creteOneLineCSV(populatedWithIds, { spread: '|' }).join(
    '\n'
  ),
  'UTF-8',
  err => {
    if (err) return console.log('error occurred', err);
    console.log('data was successfully saved');
  }
);