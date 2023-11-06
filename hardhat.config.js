require("@nomiclabs/hardhat-ethers");
require('dotenv').config()
const {API_URL, PRIVATE_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  defaultNetwork: "sepolia",
  networks:{
    hardhat:{},
    sepolia:{
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
      },
  },
};
