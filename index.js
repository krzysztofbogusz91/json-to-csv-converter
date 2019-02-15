const fs = require('fs');
const _ = require('lodash');
const creteCsv = require('./src/script');
const dataToWrite = require('./assets/family-members').myData;
let populatedWithIds = [];
const populateCompanyIds = (companyOrMember, currentTable = [], idPres = 0) => {
  const allElemsTable = currentTable;
  let id = idPres;
  const filterd = companyOrMember.map(elem => {
    if (elem.hasOwnProperty('idFirmy')) {
      id = elem.idFirmy;
    }
    const arrayField = Object.keys(elem).filter(arrayObj => {
      if (Array.isArray(elem[arrayObj])) {
        populateCompanyIds(elem[arrayObj], allElemsTable, id);
        return true;
      }
      return false;
    });

    return _.omit(elem, arrayField[0]);
  });
  filterd.forEach(elem => {
    if (!elem.hasOwnProperty('idFirmy')) {
      allElemsTable.push({ idFirmy: id, ...elem });
    } else {
      allElemsTable.push(elem);
    }
  });

  return (populatedWithIds = allElemsTable);
};
populateCompanyIds(dataToWrite);
fs.writeFile(
  'out/customers.csv',
  _.flatten(creteCsv.creteOneLineCSV(populatedWithIds, { spread: '|' })).join(
    '\n'
  ),
  'UTF-8',
  err => {
    if (err) return console.log('error occurred', err);
    console.log('data was successfully saved');
  }
);
