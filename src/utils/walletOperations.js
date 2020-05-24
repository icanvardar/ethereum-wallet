// import ethers from "ethers";
const { ethers } = require('ethers');

export const createWallet = () => {
    return ethers.Wallet.createRandom();
}


