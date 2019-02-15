const expect = require('chai').expect;
const creteCSVReadyArray = require('../src/csv-preparator.module');
const mockData = require('./mock-flat-members.json');

describe('CsvPreparatorModule', function() {
  it('should return array', function() {
    const expectation = creteCSVReadyArray.creteOneLineCSV([]);
    expect([]).to.deep.equal(expectation);
  });

  it('should return full array', function() {
    const expectation = creteCSVReadyArray.creteOneLineCSV(mockData);
    expect(expectation.length).to.equal(14);
  });

  it('should return array with strings ', function() {
    const expectation = creteCSVReadyArray.creteOneLineCSV(mockData);

    expect(expectation[0][0]).to.be.an('string');
  });

  it('should return properly formated string ', function() {
    const expectation =
      'idFirmy|1|idOsoby|24|name|MiaJr|job|child|accountNumber|5445646334|role|child';
    const assertion = creteCSVReadyArray.creteOneLineCSV(mockData)[0];
    expect(expectation).to.equal(assertion);
  });
  it('should return properly formated string ', function() {
    const expectation =
      'idFirmy,1,idOsoby,24,name,MiaJr,job,child,accountNumber,5445646334,role,child';
    const assertion = creteCSVReadyArray.creteOneLineCSV(mockData, {
      spread: ','
    })[0];
    expect(expectation).to.equal(assertion);
  });
});
