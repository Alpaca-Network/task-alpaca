import {ethers} from "hardhat";

async function main() {
  if (!process.env.ORACLE_ADDRESS) {
    throw new Error("ORACLE_ADDRESS env variable is not set.");
  }
  const oracleAddress: string = process.env.ORACLE_ADDRESS;
  const incentiveAmount: string = "0.01";

  await deployTask("this is a task description", 100, 1000, incentiveAmount);
}

async function deployTask(description: string, pricePerExecution: number, IncentiveDurationInBlocks: number, incentiveAmount: string) {
    const task = await ethers.deployContract("Task", [description, pricePerExecution, IncentiveDurationInBlocks], {
        value: ethers.parseEther(incentiveAmount) // Convert Ether to wei
    });
  
    await task.waitForDeployment();
  
    console.log(`Quickstart contract deployed to ${task.target}`);
  }

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
