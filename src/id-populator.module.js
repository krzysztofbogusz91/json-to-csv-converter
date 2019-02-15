const _ = require('lodash');

const populateCompanyIds = (companyOrMember, settings ={
  currentTable: [],
  idPres: 0
} 
 ) => {
  const allElemsTable = settings.currentTable;
  let id = settings.idPres;
  const filterd = companyOrMember.map(elem => {
    if (elem.hasOwnProperty('idFirmy')) {
      id = elem.idFirmy;
    }
    const arrayField = Object.keys(elem).filter(arrayObj => {
      if (Array.isArray(elem[arrayObj])) {
        populateCompanyIds(elem[arrayObj],{ currentTable: allElemsTable, idPres: id});
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

  return allElemsTable;
};


module.exports = { populateCompanyIds };

