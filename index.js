const fs = require('fs');
const _ = require('lodash');
const creteCsv = require('./src/script')
const dataToWrite = require('./assets/family-members').myData;

console.log(creteCsv.creteOneLineCSV(dataToWrite));

fs.writeFile('out/customers.csv', creteCsv.creteOneLineCSV(dataToWrite)[0].join('\n'), err => {
  if (err) return console.log('error occurred', err);
  console.log('data was successfully saved');
});


