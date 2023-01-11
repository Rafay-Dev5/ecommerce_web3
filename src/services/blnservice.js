import Web3 from "web3";

import transactionABI from "../ABIs/TransactionABI";

export const setUpAndLoadData = async () => {
  let ABI = transactionABI;
  const address = "0xd8f35BD4533b66028D43620dfb84F5b59E9B3386";
  const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
  const accounts = await web3.eth.getAccounts();
  //setAccount(accounts[0]);
  console.log("Connected to Metamask");
  const contract = new web3.eth.Contract(ABI, address);
  //setContract(contract);
  console.log("Connected to contract");
  console.log(contract.methods);
  return [accounts[0], contract];
  //const contractAddress = await contract.methods.getAddress().call();
  //console.log(contractAddress);
  //setContractAccount(contractAccount);
  //const balance = await contract.methods.getBalance().call();
  //console.log("Money in the contract: ", balance);
  //setAccountBalance(balance);
  //for
};
