const { PRIVATE_KEY, INFURA_KEY, DEFAULT_ACCOUNT, CONTRACT_ADDRESS } = process.env;
console.log("Private key: " + PRIVATE_KEY);
console.log("Infura key: " + INFURA_KEY);
console.log("Default account: " + DEFAULT_ACCOUNT);
console.log("Contract address: " + CONTRACT_ADDRESS);

const Web3 = require("web3");
const web3 = new Web3("https://ropsten.infura.io/v3/" + INFURA_KEY);

const BearTokenJson = require("../build/contracts/BearToken.json");
const Tx = require("ethereumjs-tx");

// Define default account.
// This app's just a test so hardcode it.
const account = web3.eth.defaultAccount = DEFAULT_ACCOUNT;

const BearTokenInterface = new web3.eth.Contract(
    BearTokenJson["abi"],
    CONTRACT_ADDRESS,
    { from: account }
);

// Setup event listener.
/*BearTokenInterface.events.Transfer((error, result) => {
    console.log("Transfer");
    if(error)
        console.log(error);
    else
        console.log(result);
});*/

async function prepareRequest(target, data)
{
    // Determine the nonce
    var count = await web3.eth.getTransactionCount(account);
    console.log(`num transactions so far: ${count}`);

    // Fetch gas price
    let gasPrice = await web3.eth.getGasPrice();
    console.log("Gas price: " + gasPrice);

    // Get last block for gas limit.
    let block = await web3.eth.getBlock("latest");
    console.log("Gas limit:" + block.gasLimit);

    // Setup transaction information.
    var rawTransaction = {
        "from": account,
        "nonce": web3.utils.toHex(count),
        "gas": web3.utils.toHex(80000),
        "gasPrice": web3.utils.toHex(web3.utils.toWei("1.8", "gwei")),
        "gasLimit": web3.utils.toHex(block.gasLimit),
        "to": target,
        "value": "0x0",
        "data": data, // contract.methods.transfer(destAddress, transferAmount).encodeABI(),
        "chainId": 3 //0x01 = main net, 0x03 = test net
    };

    // The private key must be for myAddress
    var privKey = new Buffer(PRIVATE_KEY, 'hex');
    var tx = new Tx(rawTransaction);
    tx.sign(privKey);
    var serializedTx = tx.serialize();

    // Comment out these three lines if you don't really want to send the TX right now
    console.log(`Attempting to send signed tx:  ${serializedTx.toString('hex')}`);
    var receipt = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
        .catch(error => {
            console.log("===== ERROR =====");
            console.log(error);
        });
    console.log(`Receipt info:  ${JSON.stringify(receipt, null, '\t')}`);
}

function mintTokens(amount) {
    prepareRequest(
        BearTokenInterface._address,
        BearTokenInterface.methods.mint(account, amount).encodeABI()
    );
}

function sendTokens(address, amount) {
    prepareRequest(
        BearTokenInterface._address,
        BearTokenInterface.methods.transfer(address, amount).encodeABI()
    );
}

module.exports = {
    mintTokens,
    sendTokens
}