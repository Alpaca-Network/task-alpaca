import { ethers } from 'ethers';

// The ABI of the Task contract
const taskAbi = [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"taskId","type":"uint256"},{"indexed":false,"internalType":"string","name":"description","type":"string"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"},{"indexed":false,"internalType":"address","name":"agent","type":"address"},{"indexed":false,"internalType":"address","name":"evaluator","type":"address"}],"name":"TaskCreated","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[{"internalType":"string","name":"_description","type":"string"},{"internalType":"address","name":"_agent","type":"address"},{"internalType":"address","name":"_evaluator","type":"address"}],"name":"createTask","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getRegistry","outputs":[{"components":[{"internalType":"string","name":"description","type":"string"},{"internalType":"address","name":"agent","type":"address"},{"internalType":"address","name":"evaluator","type":"address"},{"internalType":"uint256","name":"reward","type":"uint256"}],"internalType":"struct TaskRegistry.Task[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getTask","outputs":[{"internalType":"string","name":"","type":"string"},{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"tasks","outputs":[{"internalType":"string","name":"description","type":"string"},{"internalType":"address","name":"agent","type":"address"},{"internalType":"address","name":"evaluator","type":"address"},{"internalType":"uint256","name":"reward","type":"uint256"}],"stateMutability":"view","type":"function"},{"stateMutability":"payable","type":"receive"}]

// Ensure MetaMask or another Ethereum provider is available
if (!window.ethereum) {
  throw new Error("No crypto wallet found. Please install MetaMask.");
}

// Define the URL of the Ethereum node
const nodeUrl = 'https://sepolia.infura.io/v3/9520b8c96ae9480d90317410f0dd1d16';

// Connect to the Ethereum network using the provider from MetaMask
const provider = new ethers.JsonRpcProvider(nodeUrl);

// Get the signer
async function getSigner() {
  // Request accounts from MetaMask
  await window.ethereum.request({ method: 'eth_requestAccounts' });
  return provider.getSigner();
}

// Address of the deployed Task contract
const taskContractAddress = '0xaA1Eb47Aeb11acc1DB9f891b5c23a04ac85dfBcd'; // Replace with your actual Task contract address

// Create a contract instance
async function getTaskContract() {
  const signer = await getSigner();
  return new ethers.Contract(taskContractAddress, taskAbi, signer);
}

async function getRegistryContract() {
  const signer = await getSigner();
  return new ethers.Contract(taskContractAddress, taskAbi, signer);
}

export async function submitAgent(agentAddress: string, agentOwnerAddress: string) {
  try {
    const accounts = await provider.listAccounts();
    console.log(accounts);
    const taskContract = await getTaskContract();
    const tx = await taskContract.submitAgent(agentAddress, agentOwnerAddress, {
      value: ethers.parseEther('0.01') // specify the value to send with the transaction if needed
    });
    console.log('Transaction sent: ', tx.hash);
    await tx.wait();
    console.log('Transaction confirmed');
  } catch (error) {
    console.error('Error submitting agent: ', error);
  }
}

export async function useAgent(additionalInstructions: string) {
  try {
    const taskContract = await getTaskContract();
    const tx = await taskContract.useAgent(additionalInstructions, {
      value: ethers.parseEther('0.01') // specify the price per execution
    });
    console.log('Transaction sent: ', tx.hash);
    const result = await tx.wait();
    console.log('Transaction confirmed');
    console.log('Result: ', result);
  } catch (error) {
    console.error('Error using agent: ', error);
  }
}

export async function getRegistry() {
  try {
    const taskContract = await getRegistryContract();
    const registry = await taskContract.getRegistry();
    console.log('Registry: ', registry);
  } catch (error) {
    console.error('Error getting registry: ', error);
  }
}

export async function getTask(index: number) {
  try {
    const taskContract = await getTaskContract();
    const task = await taskContract.getTask(index);
    console.log('Task: ', task);
  } catch (error) {
    console.error('Error getting task: ', error);
  }
}

// Example usage (for testing purposes, you can remove this in production)
(async () => {
  await submitAgent('0xAgentAddress', '0xAgentOwnerAddress');
  await useAgent('These are additional instructions');
})();
