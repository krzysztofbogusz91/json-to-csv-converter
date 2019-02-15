const fs = require('fs');
const _ = require('lodash');
const flattenArrayProperties = prop => {
  return Object.values(prop)
    .filter(arrayObj => {
      if (Array.isArray(arrayObj)) {
        console.log(lastArr);

        creteOneLineCSV(arrayObj);
        return false;
      }
      return true;
    })
    .map(obj => obj.data);
};
const creteOneLineCSV = (
  materialToTransform,
  settings = {
    spread: '|'
  }
) => {
  return Object.entries(materialToTransform).map(arrEntry => {
    const keys = Object.keys(arrEntry[1]);
    const values = flattenArrayProperties(arrEntry[1]);

    return [...keys]
      .map((key, i) =>
        !values[i] ? '' : `${key}${settings.spread}${values[i]}`
      )
      .join(`${settings.spread}`);
  });
};

module.exports = { creteOneLineCSV };
