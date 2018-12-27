var ethers = require('ethers');
var fs = require('fs');

//var contract = require('./compile.js');
var config = require('../config/config.js');

var globalConst = require('./global.js');

async function deploy(){
  var contract = await globalConst.factory.deploy();
  var contractAddress = {};
  contractAddress.address = contract.address;
  console.log("Contract address:"+contractAddress.address);
  console.log("Contract deploy transaction hash:"+contract.deployTransaction.hash);
  await contract.deployed();

  fs.writeFile(__dirname+'/contractAddress.json', JSON.stringify(contractAddress), function (err) {
    if (err) throw err;
    console.log('Saved deployed contract address at: '+__dirname+'/contractAddress.json');
  });
}

deploy();
