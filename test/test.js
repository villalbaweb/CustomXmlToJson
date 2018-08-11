var expect    = require('chai').expect;
var customParser = require('../helper/customXml2Json');

describe('XML to JSON custom parser tests', function() {

  describe('processXML function validations', function() {
    
    it('should return a string from a valid XML input', function() {
      var parsedResult = customParser.processXML('<address><city>Guadalajara</city><street>Chapultepec</street></address>');
      expect(parsedResult).to.be.a('string');
    });

    it('should return a empty JSON string from a empty XML input', function() {
      var parsedResult = customParser.processXML('');
      expect(parsedResult).to.equal('{}');
    });

    it('should return a parsed valid JSON string from a valid XML input', function() {
      var parsedResult = customParser.processXML('<address><city>Guadalajara</city><street>Chapultepec</street></address>');
      expect(parsedResult).to.equal('{"address":{"city":"Guadalajara","street":"Chapultepec"}}');
    });

    it('should return a parsed valid JSON string from a valid XML input with two deep level properties', function() {
      var parsedResult = customParser.processXML('<shipment><item>some item</item><from>Evan</from><to>PayStand</to><address><street>100 Enterprise Way</street><city>Scotts Valley</city><zip>95066</zip></address></shipment>');
      expect(parsedResult).to.equal('{"shipment":{"item":"some item","from":"Evan","to":"PayStand","address":{"street":"100 Enterprise Way","city":"Scotts Valley","zip":"95066"}}}');
    });

    it('should return a parsed valid JSON string from a valid XML input with more than two deep level properties', function() {
      var parsedResult = customParser.processXML('<shipment><item>some item</item><from>Evan</from><to>PayStand</to><address><street><name>100 Enterprise Way</name><number>5451</number></street><city>Scotts Valley</city><zip>95066</zip></address></shipment>');
      expect(parsedResult).to.equal('{"shipment":{"item":"some item","from":"Evan","to":"PayStand","address":{"street":{"name":"100 Enterprise Way","number":"5451"},"city":"Scotts Valley","zip":"95066"}}}');
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

  describe('isCharMatch function validations', function() {
    it('should return true if the looked for character is included in the characters array', function() {

      var isIncluded = customParser.isCharMatch('<', ['<', '/', '>']);
      
      expect(isIncluded).to.equal(true);
    });
  });
});