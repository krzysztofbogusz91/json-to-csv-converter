const fs = require('fs');
const _ = require('lodash');
const creteCsv = require('./src/script');
const dataToWrite = require('./assets/family-members').myData;

const populateCompanyIds = (companyOrMember, currentTable = []) => {
  const allElemsTable = []
  companyOrMember.forEach(elem => {
    Object.values(elem).forEach(arrayObj => {
      if (Array.isArray(arrayObj)) {
        arrayObj.forEach(el=> {
          allElemsTable.push(el)
        })
        populateCompanyIds(arrayObj);
        return false
      }
      allElemsTable.push(elem)
      return true
    });
  });
  return _.uniq([...allElemsTable, ...currentTable])

};
const populatedWithIds = populateCompanyIds(dataToWrite);
console.log('populated', populateCompanyIds(dataToWrite));
fs.writeFile(
  'out/customers.csv',
  _.flatten(creteCsv.creteOneLineCSV(dataToWrite)).join('\n'),
  err => {
    if (err) return console.log('error occurred', err);
    console.log('data was successfully saved');
  }
);
