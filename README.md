
# Blockchain-based Lottery System

A simple, lottery-like smart contract game that uses on-chain randomness to determine the winner.

## Features

- Ticket Purchase
- Random Number Generation
- Selecting a Winner
- Prize Distribution
- Starting a New Lottery


## Documentation

Firstly you could download the folder & install hardhat. 

You can consult Hardhat's Official Documentation for your help. (https://hardhat.org/docs)



## Installation

Make sure you have node & npm installed.

Install hardhat through npm

```bash
  npm install --save-dev hardhat

```

Then run:

```bash
  npx hardhat
```
## Deployment
To deploy this project run the following commands.

As the contract is already provided, you just have to complie it. Run:
```bash
  npx hardhat compile
```

Now that the contract is already compiled, you can easliy deploy on any network of your choice.
Make sure you have an API key & enough funds on that network. 
```bash
  npx hardhat run scripts/lottery.js
```
You will be provided with the deployed contract address.

After deploying, verify the contract. 
```bash
  npx hardhat verify --network <enter any network name> <deployed contract address> <constructor parameters>
```
which in my case;

```bash
  npx hardhat verify --network BNB 0x5737E34794Cd98d6e18Df80AfE341a5De6aCF63E 1000000000000000000 120
```
## Running Tests

To run tests, run the following command

```bash
  npm hardhat test --network <Enter any network you like>
```

