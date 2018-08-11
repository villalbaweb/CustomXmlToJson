exports.processXML = function(xml) {
    var jsonObject = {};
    var isOpeningDetected = false;
    var isClosingTagDetected = false;
    var nodes = [];
    var currentNode = '';
    var currentValue = '';

    for( var pos = 0; pos < xml.length; pos++){
        
        if( this.isCharMatch( xml[pos], ['<']) ) {
            if( currentValue !== '' ){
                this.addProperty( jsonObject, nodes, currentValue );
            }
            isOpeningDetected = true;
            isClosingTagDetected = false;
            currentValue = '';
            currentNode = '';
        }

        if( this.isCharMatch( xml[pos], ['>']) ) {
            isOpeningDetected = false;
        }

        if( isOpeningDetected && !this.isCharMatch( xml[pos], ['<','/']) )
            currentNode = currentNode + xml[pos];
        else if(!isClosingTagDetected && currentNode !== ''){ 
            nodes.push( currentNode );
            currentNode = '';
        }

        if( !isOpeningDetected && !this.isCharMatch( xml[pos], ['<', '/', '>']) ) {
            currentValue = currentValue + xml[pos];
        }

        if( this.isCharMatch( xml[pos], ['/']) ) {
            completeNewValue = '';
            nodes.pop();
            isClosingTagDetected = true;
        }
    }

    var jsonResult = this.jsonStringify(jsonObject);
    console.log(jsonResult);
    
    return jsonResult;
}

exports.addProperty = function (object, nodes, value) {
    var properties = nodes.slice();
    var last = object;
    while (properties.length) {
        var prop = properties.shift();
        if (properties.length > 0) {
            last[prop] = last[prop] || {};
            last = last[prop];
        } else {
            last[prop] = value;
        }
    }
    return last;
}

exports.isCharMatch = function(characterToCheck, characterArray) {
    return characterArray.includes(characterToCheck);
}

exports.jsonStringify = function(json) {
    return JSON.stringify(json);
}