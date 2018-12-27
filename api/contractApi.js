var ethers = require('ethers');
var fs = require('fs');
var globalConst = require('../contractSetup/global.js');

var data = JSON.parse(fs.readFileSync(__dirname+'/../contractSetup/contractAddress.json'));
var contractAddress = data.address;

var contract = new ethers.Contract(contractAddress, globalConst.abi, globalConst.provider);

var logPrefix = "contractApi: ";

var getCertificate = async function getCertificate(id){
  var certificate = await contract.getCertificate(id);
  if(!certificate.name){
    console.log(logPrefix+"Certificate not found!");
    return null;
  }
  return certificate;
}

var addCertificate = async function addCertificate(id,name,issueDate,grade){
  var contractWithSigner = contract.connect(globalConst.wallet);
  var tx = await contractWithSigner.addCertificate(id,name,issueDate,grade);
  console.log(logPrefix+"Added certificate. Transaction hash:"+tx.hash);
  return tx.hash;
}

exports.addCertificate = addCertificate;
exports.getCertificate = getCertificate;
