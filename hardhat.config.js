require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require("@nomicfoundation/hardhat-chai-matchers");
require("dotenv/config");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "goerli",
  networks: {
    hardhat: {
    },
    goerli: {
      url: "https://rpc.ankr.com/eth_goerli",
      accounts: [process.env.privatekey1]
    },
    BNB: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      accounts: [process.env.privatekey1],
  },
    BSCscan: {
      url: "https://rpc.ankr.com/bsc",
      accounts: [process.env.privatekey1]
    },
    Sepolia: {
      url: "https://rpc.sepolia.org",
      accounts: [process.env.privatekey1]
    },
    fantom: {
      url: "https://rpc.testnet.fantom.network/",  
      accounts: [process.env.privatekey1]
    }
  },
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200 
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 90000
  },
  etherscan: {
    apiKey: "//0x5FbDB2315678afecb367f032d93F642f64180aa3" ,
  },
};
