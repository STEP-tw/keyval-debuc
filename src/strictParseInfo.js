const Parsed=require("./parsed.js");
const ParseInfo=require("./parseInfo.js");
const InvalidKeyError=require("./errors/invalidKeyError.js");

const contains=function(list,key,caseSensitive) {
  return list.find(function(validKey){
    if(!caseSensitive){
      key = key.toLowerCase();
      validKey = validKey.toLowerCase();
    }
    return key==validKey;
  });
}

var StrictParseInfo=function(initialParsingFunction,validKeys,caseSensitive) {
  ParseInfo.call(this,initialParsingFunction);
  this.validKeys=validKeys;
  this.caseSensitive=caseSensitive;
}

StrictParseInfo.prototype=Object.create(ParseInfo.prototype);

StrictParseInfo.prototype.pushKeyValuePair=function() {
  if(!contains(this.validKeys,this.currentKey,this.caseSensitive))
    throw new InvalidKeyError("invalid key",this.currentKey,this.currentPos);
  this.parsedKeys[this.currentKey]=this.currentValue;
  this.resetKeysAndValues();
}

module.exports=StrictParseInfo;
