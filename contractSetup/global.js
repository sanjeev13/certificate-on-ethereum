var ethers = require('ethers');
var config = require('../config/config.js');
var fs = require('fs');

var globalConst = {};

var data = fs.readFileSync(__dirname+'/contract.json');
var contract = JSON.parse(data);

var abi = contract.abi;
globalConst.abi = abi;

var byteCode = contract.bytecode;

var ownerPrivateKey = config.privateKey;

var provider = ethers.getDefaultProvider(config.network);
globalConst.provider = provider;

var wallet = new ethers.Wallet(ownerPrivateKey, provider);
globalConst.wallet = wallet;

globalConst.factory = new ethers.ContractFactory(abi, byteCode, wallet);

module.exports = globalConst;
