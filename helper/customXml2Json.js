exports.processXML = function(xml) {

    var isInvalidString = xml === null || xml === undefined || xml === '';
    if(isInvalidString) return null;

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
    
    return jsonResult;
}

exports.addProperty = function (object, nodes, value) {

    if( object === null || 
        object === '' || 
        object === undefined ||
        nodes === null ||
        nodes === undefined ) return null;

    var tags = nodes.slice();
    var last = object;
    while (tags.length) {
        var tag = tags.shift();
        if (tags.length > 0) {
            last[tag] = last[tag] || {};
            last = last[tag];
        } else {
            last[tag] = value;
        }
    }

    return last;
}

exports.isCharMatch = function(characterToCheck, characterArray) {
    var isInvalidArray = characterArray === null || characterArray === undefined;
    return isInvalidArray ? false : characterArray.includes(characterToCheck);
}

exports.jsonStringify = function(json) {
    var isInvalidJson = json === null || json === '' || json === undefined;
    return isInvalidJson ? null : JSON.stringify(json);
}