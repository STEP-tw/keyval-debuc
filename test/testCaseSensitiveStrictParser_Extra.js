const src=function(filePath){return "../src/"+filePath};

const assert=require('chai').assert;
const Parsed=require(src('parsed.js'));
const StrictParser=require(src('index.js')).StrictParser;

describe("strict parser that is case insensitive extra",function(){
  it("should parse when specified keys are in upper case and actual is not",function(){
    let kvParser=new StrictParser(["NAME"],false);
    let expected=new Parsed();
    expected["name"]="jayanth";
    let parsed=kvParser.parse("name=jayanth");
    assert.deepEqual(parsed,expected);
  });
  it("should parse when specified keys have special characters",function(){
    let kvParser=new StrictParser(["First_Name"],false);
    let expected=new Parsed();
    expected["first_name"]="jayanth";
    let parsed=kvParser.parse("first_name=jayanth");
    assert.deepEqual(parsed,expected);
  });
  it("should parse when specified keys have numeric characters",function(){
    let kvParser=new StrictParser(["address_1"],false);
    let expected=new Parsed();
    expected["Address_1"]="jayanth";
    let parsed=kvParser.parse("Address_1=jayanth");
    assert.deepEqual(parsed,expected);
  });
  it("should parse when specified keys are in mixed case and actual is not",function(){
    let kvParser=new StrictParser(["Name"],false);
    let expected=new Parsed();
    expected["name"]="jayanth";
    let parsed=kvParser.parse("name=jayanth");
    assert.deepEqual(parsed,expected);
  });
  it("should parse when actual keys are in mixed case and expected is not",function(){
    let kvParser=new StrictParser(["name"],false);
    let expected=new Parsed();
    expected["Name"]="jayanth";
    let parsed=kvParser.parse("Name=jayanth");
    assert.deepEqual(parsed,expected);
  });
  it("should parse when multiple keys are in lower case and expected is not",function(){
    let kvParser=new StrictParser(["name","age"],false);
    let expected=new Parsed();
    expected["Name"]="jayanth";
    expected["Age"]="20";
    let parsed=kvParser.parse("Name=jayanth Age=20");
    assert.deepEqual(parsed,expected);
  });
  it("should parse when multiple keys are in upper case and expected is not",function(){
    let kvParser=new StrictParser(["NAME","AGE"],false);
    let expected=new Parsed();
    expected["Name"]="jayanth";
    expected["Age"]="20";
    let parsed=kvParser.parse("Name=jayanth Age=20");
    assert.deepEqual(parsed,expected);
  });
  it("should parse when multiple keys are in mixed case and expected is not",function(){
    let kvParser=new StrictParser(["nAme","aGe"],false);
    let expected=new Parsed();
    expected["Name"]="jayanth";
    expected["Age"]="20";
    let parsed=kvParser.parse("Name=jayanth Age=20");
    assert.deepEqual(parsed,expected);
  });
});

describe.skip("strict parser that is case sensitive",function(){
  it("should throw error when specified keys are in lower case and actual is not",function(){
    let kvParser=new StrictParser(["name"],true);
    // true indicates that parser is case sensitive
    assert.throws(()=>{
      kvParser.parse("NAME=jayanth");
    })
  });
});
