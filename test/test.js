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

    it('should return the same object if there isn\'t any node stored in the nodes array', function() {
      var jsonObject = {
        address: {
          city: 'Guadalajara',
          street: 'Chapultepec'
        }
      };

      var addpropertyResult = customParser.addProperty(jsonObject, [], 'Daniel');

      var jsonObjectExpected = {
        address: {
          city: 'Guadalajara',
          street: 'Chapultepec'
        }
      };

      expect(addpropertyResult).to.deep.equal(jsonObjectExpected);
    });

    it('should return null if nodes array is null', function() {
      var jsonObject = {
        address: {
          city: 'Guadalajara',
          street: 'Chapultepec'
        }
      };

      var addpropertyResult = customParser.addProperty(jsonObject, null, 'Daniel');

      expect(addpropertyResult).to.deep.equal(null);
    });

    it('should return null if nodes array is undefined', function() {
      var jsonObject = {
        address: {
          city: 'Guadalajara',
          street: 'Chapultepec'
        }
      };

      var addpropertyResult = customParser.addProperty(jsonObject, null, 'Daniel');

      expect(addpropertyResult).to.deep.equal(null);
    });

    it('should return an object with a new property with an empty string value if the value is null', function() {
      var jsonObject = {
        address: {
          city: 'Guadalajara',
          street: 'Chapultepec'
        }
      };

      var addpropertyResult = customParser.addProperty(jsonObject, ['nombre'], '');

      var jsonObjectExpected = {
        address: {
          city: 'Guadalajara',
          street: 'Chapultepec'
        },
        nombre: ''
      };

      expect(addpropertyResult).to.deep.equal(jsonObjectExpected);
    });
    
    it('should return an object with a new property with an empty string if the value is an empty string', function() {
      var jsonObject = {
        address: {
          city: 'Guadalajara',
          street: 'Chapultepec'
        }
      };

      var addpropertyResult = customParser.addProperty(jsonObject, ['nombre'], '');

      var jsonObjectExpected = {
        address: {
          city: 'Guadalajara',
          street: 'Chapultepec'
        },
        nombre: ''
      };

      expect(addpropertyResult).to.deep.equal(jsonObjectExpected);
    });

    it('should return an object with a new property with an empty string value if the value is undefined', function() {
      var jsonObject = {
        address: {
          city: 'Guadalajara',
          street: 'Chapultepec'
        }
      };

      var addpropertyResult = customParser.addProperty(jsonObject, ['nombre'], undefined);

      var jsonObjectExpected = {
        address: {
          city: 'Guadalajara',
          street: 'Chapultepec'
        },
        nombre: undefined
      };

      expect(addpropertyResult).to.deep.equal(jsonObjectExpected);
    });
    
    it('should return null if the object parameter is null', function() {
      var addpropertyResult = customParser.addProperty(null, ['nombre'], 'Daniel');

      expect(addpropertyResult).to.deep.equal(null);
    });

    it('should return null if the object parameter is empty string', function() {
      var addpropertyResult = customParser.addProperty( '', ['nombre'], 'Daniel');

      expect(addpropertyResult).to.deep.equal(null);
    });

    it('should return null if the object parameter is undefined', function() {
      var addpropertyResult = customParser.addProperty( undefined, ['nombre'], 'Daniel');

      expect(addpropertyResult).to.deep.equal(null);
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

    it('should return null from a null input', function() {
      var stringifyResult = customParser.jsonStringify(null);

      expect(stringifyResult).to.equal(null);
    });

    it('should return null from a empty string input', function() {
      var stringifyResult = customParser.jsonStringify('');

      expect(stringifyResult).to.equal(null);
    });

    it('should return null from an undefined input', function() {
      var stringifyResult = customParser.jsonStringify(undefined);

      expect(stringifyResult).to.equal(null);
    });

  });

  describe('isCharMatch function validations', function() {

    it('should return true if the characterToCheck is included in the characterArray', function() {
      var isIncluded = customParser.isCharMatch('<', ['<', '/', '>']);
      expect(isIncluded).to.equal(true);
    });

    it('should return false if the characterToCheck is not included in the characterArray', function() {
      var isIncluded = customParser.isCharMatch('X', ['<', '/', '>']);
      expect(isIncluded).to.equal(false);
    });

    it('should return false if the characterToCheck is empty string', function() {
      var isIncluded = customParser.isCharMatch('<', '');
      expect(isIncluded).to.equal(false);
    });

    it('should return false if the characterToCheck is null', function() {
      var isIncluded = customParser.isCharMatch('<', null);
      expect(isIncluded).to.equal(false);
    });

    it('should return false if the characterToCheck is undefined', function() {
      var isIncluded = customParser.isCharMatch('<', undefined);
      expect(isIncluded).to.equal(false);
    });

    it('should return false if the characterArray is an empty array', function() {
      var isIncluded = customParser.isCharMatch('<', []);
      expect(isIncluded).to.equal(false);
    });

    it('should return false if the characterArray is null', function() {
      var isIncluded = customParser.isCharMatch('<', null);
      expect(isIncluded).to.equal(false);
    });

    it('should return false if the characterArray is undefined', function() {
      var isIncluded = customParser.isCharMatch('<', undefined);
      expect(isIncluded).to.equal(false);
    });

  });

});