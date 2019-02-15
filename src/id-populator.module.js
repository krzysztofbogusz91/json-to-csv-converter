const _ = require('lodash');
const setId = (elem, id) => {
  if (elem.hasOwnProperty('idFirmy')) {
    return elem.idFirmy;
  } else {
    return id;
  }
};

const deleteArrayElement = (companyOrMember, settings) => {
  return companyOrMember.map(elem => {
    const arrayField = Object.keys(elem).filter(arrayObj => {
      if (Array.isArray(elem[arrayObj])) {
        populateCompanyIds(elem[arrayObj], {
          currentTable: settings.currentTable,
          idPres: setId(elem, settings.idPres)
        });
        return true;
      }
      return false;
    });

    return _.omit(elem, arrayField[0]);
  });
};
const populateCompanyIds = (
  entityToPopulate,
  settings = {
    currentTable: [],
    idPres: 0
  }
) => {
  deleteArrayElement(entityToPopulate, settings).forEach(elem =>
    !elem.hasOwnProperty('idFirmy')
      ? settings.currentTable.push({
          idFirmy: setId(elem, settings.idPres),
          ...elem
        })
      : settings.currentTable.push(elem)
  );
  return settings.currentTable;
};

module.exports = { populateCompanyIds };
