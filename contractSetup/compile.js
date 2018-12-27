var path = require('path');
var fs = require('fs');
var solc = require('solc');

const contractPath = path.resolve(__dirname,'../contracts','ts-cert.sol');
const source = fs.readFileSync(contractPath,'UTF-8');

var compiledContract = solc.compile(source, 1).contracts[':CertificateContract'];
var contract = {};
contract.abi = compiledContract.interface;
contract.bytecode = compiledContract.bytecode;

console.log("Compiled code!");

fs.writeFileSync(__dirname+'/contract.json', JSON.stringify(contract),'UTF-8', function (err) {
  if (err) throw err;
  console.log('Saved compiled contract at: '+__dirname+'/contract.json');
});
