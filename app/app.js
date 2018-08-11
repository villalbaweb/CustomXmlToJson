const readline = require('readline');
var customParser = require('../helper/customXml2Json');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Please enter a XML string...: ', (answer) => {
        
    //answer = '<payment><amount>10.00</amount><from>Evan</from><to>PayStand</to></payment>';    // just to development
    answer = '<shipment><item>some item</item><from>Evan</from><to>PayStand</to><address><item>some item</item><street>100 Enterprise Way</street><city>Scotts Valley</city><zip>95066</zip></address></shipment>';

    console.log(`XML string length: ${answer.length}`);
    console.log('----------------------------------------------------------');

    var startingMsg = answer.length > 0 ? 'processing...' : 'No XML string received...';
    console.log(startingMsg);

    if(answer.length > 0) {
        var result = customParser.processXML(answer);
        console.log(`\nParsed JSON object:\n ${result}\n`);
    }

    rl.close();
});