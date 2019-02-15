const expect  = require('chai').expect;
const creteFlatArr = require('../src/id-populator.module');
const mockData = require('./mock-members').myData;

describe('IdPopulatorModule', function() {
  it('should return array', function() {
    const expectation = creteFlatArr.populateCompanyIds([])
    expect([]).to.deep.equal(expectation);
  });

  it('should return expected number of entities', function() {
    const expectation = creteFlatArr.populateCompanyIds(mockData)
    expect(expectation.length).to.equal(14);
  });

  it('should return members form flat data', function() {
    const expectation = creteFlatArr.populateCompanyIds([mockData[0].companyMembers[1]])
    expect(expectation.length).to.equal(1);
  });

  it('should create proper id for members', function() {
    const expectation = creteFlatArr.populateCompanyIds([mockData[0].companyMembers[1]])
    expect(expectation[0].idFirmy).to.equal(0);
  });


  it('should create proper id from company id', function() {
    const expectation = creteFlatArr.populateCompanyIds(mockData)
    expect(expectation[0].idFirmy.data).to.equal(1);
  });
});
