const readline = require('readline');
var customParser = require('../helper/customXml2Json');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('\nPlease enter a XML string or ENTER to use default XML ...: ', (answer) => {
    
    if( answer.length === 0) {
        answer = '<shipment><item>some item</item><from>Evan</from><to>PayStand</to><address><item>some item</item><street>100 Enterprise Way</street><city>Scotts Valley</city><zip>95066</zip></address></shipment>';
    }

    console.log(`\nXML input:\n${answer}\n`);
    console.log(`XML string length: ${answer.length}`);
    console.log('processing...');

    var result = customParser.processXML(answer);

    console.log(`\nParsed JSON object:\n ${result}\n`);

    rl.close();
});