const fs = require('fs');
const _ = require('lodash');

const creteOneLineCSV = (materialToTransform, settings={
  spread: '|'
}) => {
  const lastArr = [];
  return Object.entries(materialToTransform).map(arrEntry => {
    const keys = Object.keys(arrEntry[1]);
    const values = Object.values(arrEntry[1])
      .filter(arrayObj => {
        if (Array.isArray(arrayObj)) {
          lastArr.push(creteOneLineCSV(arrayObj));
          return false;
        }
        return true;
      })
      .map(obj => obj.data);
      
    const company = [...keys]
      .map((key, i) => {
        if (!values[i]) {
          return '';
        }
        return `${key}${settings.spread}${values[i]}`;
      })
      .join(`${settings.spread}`);
    return _.uniq(_.flattenDepth([lastArr, company], 100));
  });
};

module.exports = { creteOneLineCSV };
