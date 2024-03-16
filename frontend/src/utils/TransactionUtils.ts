import { ethers, Wallet } from 'ethers';
import { CHAINS_CONFIG, goerli } from '../models/Chain';

export async function sendToken(
  restriced: boolean,
  whitelist: boolean,
  amount: number,
  from: string,
  to: string,
  privateKey: string,
  accounts_list: string[],
) {

  const chain = CHAINS_CONFIG[goerli.chainId];

  // Create a provider using the Infura RPC URL for Goerli
  const provider = new ethers.providers.JsonRpcProvider(chain.rpcUrl);

  // Create a wallet instance from the sender's private key
  const wallet: Wallet = new ethers.Wallet(privateKey, provider);

  let tx = {}

  // Construct the transaction object
  if(restriced === true){
    // Check if it list is a whitelist
    if(whitelist === true){
      // Whitelist Case
      // Send if account is in the list
      if(accounts_list.includes(to)){
        tx = {
          to,
          value: ethers.utils.parseEther(amount.toString()),
        };
      }else{
        // Blacklist Case
        // Send if account is not in the list
        if(!accounts_list.includes(to)){
          tx = {
            to,
            value: ethers.utils.parseEther(amount.toString()),
          };
        }
      }
    }
  }else {
    tx = {
      to,
      value: ethers.utils.parseEther(amount.toString()),
    };
  }

  // Sign the transaction with the sender's wallet
  const transaction = await wallet.sendTransaction(tx);

  // Wait for the transaction to be mined
  const receipt = await transaction.wait();

  return {transaction, receipt};
}
