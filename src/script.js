const fs = require('fs');
const _ = require('lodash');

const creteOneLineCSV = materialToTransform => {
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

    const company = keys
      .map((key, i) => {
        if (!values[i]) {
          return '';
        }
        return `${key}|${values[i]}`;
      })
      .join('|');
      return _.flattenDepth([...lastArr, company], 100)
  });
};


module.exports = {creteOneLineCSV}