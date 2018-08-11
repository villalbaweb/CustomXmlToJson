var expect    = require('chai').expect;
var customParser = require('../helper/customXml2Json');

describe('XML to JSON custom parser tests', function() {

  describe('isCharMatch function validations', function() {
    it('should return true if the looked for character is included in the characters array', function() {

      var isIncluded = customParser.isCharMatch('<', ['<', '/', '>']);
      
      expect(isIncluded).to.equal(true);
    });
  });

  describe('processXML function validations', function() {
    it('should return a string from a valid XML input', function() {
      
      var parsedResult = customParser.processXML('<address><city>Guadalajara</city><street>Chapultepec</street></address>');

      expect(parsedResult).to.be.a('string');
    })
  });

  describe('jsonStringify function validations', function() {
    it('should return a string from a valid JSON object', function() {
      
      var jsonObject = {
        address: {
          city: 'Guadalajara',
          street: 'Chapultepec'
        }
      };
      var stringifyResult = customParser.jsonStringify(jsonObject);

      expect(stringifyResult).to.be.a('string');
    });
  });

  describe('addProperty function validations', function() {
    it('should return an object from a parameters input', function() {
      
      var jsonObject = {
        address: {
          city: 'Guadalajara',
          street: 'Chapultepec'
        }
      };
      var addpropertyResult = customParser.addProperty(jsonObject, ['name'], 'Daniel');

      expect(addpropertyResult).to.be.a('object');
    });

    it('should return an object with a new property based on parameters input', function() {
      
      var jsonObject = {
        address: {
          city: 'Guadalajara',
          street: 'Chapultepec'
        }
      };
      var addpropertyResult = customParser.addProperty(jsonObject, ['name'], 'Daniel');

      var jsonObjectExpected = {
        address: {
          city: 'Guadalajara',
          street: 'Chapultepec'
        },
        name: 'Daniel'
      };
      expect(addpropertyResult).to.deep.equal(jsonObjectExpected);
    });
  });

});