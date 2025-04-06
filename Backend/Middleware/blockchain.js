
const ethers = require("ethers");
const { JsonRpcProvider, Wallet, Contract, hexlify } = ethers;
const crypto = require('crypto');

const provider = new JsonRpcProvider('http://localhost:8545'); 


// Load your contract ABI & Address
const contractArtifact = require('../artifacts/contracts/DocumentVerifier.sol/DocumentVerifier.json');

const CONTRACT_ADDRESS = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'; // Replace with actual address

// Wallet
const privateKey = "0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e"; // Store in .env
const wallet = new ethers.Wallet(privateKey, provider);

// Contract Instance
const contract = new Contract(CONTRACT_ADDRESS, contractArtifact.abi, wallet);

const generateCompositeHash = (document) => {
    const data = document.content + document.issuer_id + document.receiver_id;
    return crypto.createHash('sha256').update(data).digest('hex');
  };
  
  const hashOnBlockchain = async (compositeHash) => {
    const bytes32Hash = hexlify("0x" + compositeHash);  // Converts to valid bytes32
  
    const txn = await contract.storeDocument(bytes32Hash);
    const receipt = await txn.wait();
    console.log("txn id is: " + txn.transactionHash)
    console.log("bhash id is: " + receipt.blockHash)
    return {
      txnHash: txn.transactionHash,
      blockHash: receipt.blockHash,
    };
  };
  
  module.exports = {
    generateCompositeHash,
    hashOnBlockchain,
  };
