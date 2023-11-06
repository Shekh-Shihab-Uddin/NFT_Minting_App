const express = require('express');
const app = express();
const cors = require("cors")
app.use(express.json());
  
app.use(cors());

require("dotenv").config();
const {Web3} = require('web3');


// Replace 'YOUR_INFURA_API_KEY' with your actual Infura API key and the network you want to connect to (e.g., 'mainnet', 'ropsten', etc.)
const API_URL = process.env.API_URL;

// Create a new Web3 instance with the Infura provider
const web3 = new Web3(API_URL);

const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const contract = require ("./artifacts/contracts/MyNFT.sol/MyNFT.json");


const contractAddress = "0x15FAA4A7E3Ce128f36f0b13eac4CaE7C88671C0C";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);


//creating our transaction:

async function mintNFT(account, tokenURI) {
    // let nonce;
    // let gasPrice;
    // web3.eth.getTransactionCount(account, "latest")
    //   .then((resultNonce) => {
    //     nonce = resultNonce;
    //     return web3.eth.getGasPrice();
    //   })
    //   .then((resultGasPrice) => {
    //     gasPrice = resultGasPrice;
    //     const tx = {
    //       from: account,
    //       to: contractAddress,
    //       nonce: nonce,
    //       gas: 500000,
    //       gasPrice: gasPrice,
    //       data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
    //     };
    //     //console.log(tx);
    //     // Now you can proceed with the rest of your logic using the 'tx' object.
    //   })
    //   .catch((error) => {
    //     // Handle any errors that occurred during the process.
    //     console.error("Error getting nonce:", error);
    //   });
    
    const _nonce= await web3.eth.getTransactionCount(account, "latest")
        const tx = {
          from: account,
          to: contractAddress,
          nonce: _nonce,
          gas: 800000,
          gasPrice: await web3.eth.getGasPrice(),
          data: nftContract.methods.mintNFT(account, tokenURI).encodeABI(),
        };

        const signedTx = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
        await web3.eth.sendSignedTransaction(signedTx.rawTransaction)
        return signedTx.transactionHash
  }

app.post('/mint', async (req,res)=>{
    try{
        const account = req.body.to;
        // console.log(account);
        const mint = await mintNFT(account, "https://ipfs.io/ipfs/QmZPSWjGkfEGzPbyTmyMt1tujyiGoxTo532H9kpj9z5NBD?filename=nft-metadata.json")
        // console.log(mint);
        if(mint){
            res.status(200).json({Result:mint})
        }else{
            res.status(400).json({status: 400, message: "No tokens transfered"});
        }
    }catch(err){
        res.status(500).json({message:"Internal Server Error"});    
    }
})
app.get('/mint',(req,res)=>{
    res.send({ok:'ok'});
})
const PORT = 5137;
app.listen(PORT, ()=>{
    console.log(`server is running at ${PORT}`)
})