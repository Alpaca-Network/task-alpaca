import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers';
import { anyValue } from '@nomicfoundation/hardhat-chai-matchers/withArgs';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('TaskLlama', function () {
  async function setup() {
    const signers = await ethers.getSigners();
    const taskLlamaFactory = await ethers.getContractFactory('TaskLlama');
    const taskLlama = await taskLlamaFactory.deploy();
    return { taskLlama, signers };
  }

  it('should match the promped creation input', async function () {
    const { taskLlama, signers } = await setup();
    const task = {
      description: 'My Task Description',
      reward: ethers.parseEther('1'),
      testCases: [] as string[],
      expiry: Math.floor(Date.now() / 1000) + 3600, // Set expiry to 1 hour from now
      category: 0,
    };

    await expect(
      taskLlama.connect(signers[0]).createTask(
        task.description,
        task.reward,
        task.testCases,
        task.expiry,
        task.category,
        { value: task.reward } // Ensure the reward is sent with the transaction
      )
    )
      .to.emit(taskLlama, 'TaskCreated')
      .withArgs(
        anyValue,
        task.description,
        task.reward,
        task.expiry,
        task.category
      );

    const tasks = await taskLlama.getTasks();
    expect(tasks.length).to.equal(1);
    expect(tasks[0].description).to.equal(task.description);
    expect(tasks[0].reward).to.equal(task.reward);
    expect(tasks[0].category).to.equal(task.category);
  });

  it('should be able to create a task with a category', async function () {
    const { taskLlama, signers } = await setup();
    const task = {
      description: 'My Task Description',
      reward: ethers.parseEther('1'),
      testCases: [] as string[],
      expiry: Math.floor(Date.now() / 1000) + 3600, // Set expiry to 1 hour from now
      category: 1,
    };

    await expect(
      taskLlama.connect(signers[0]).createTask(
        task.description,
        task.reward,
        task.testCases,
        task.expiry,
        task.category,
        { value: task.reward } // Ensure the reward is sent with the transaction
      )
    )
      .to.emit(taskLlama, 'TaskCreated')
      .withArgs(
        anyValue,
        task.description,
        task.reward,
        task.expiry,
        task.category
      );

    const tasks = await taskLlama.getTasks();
    expect(tasks.length).to.equal(1);
    expect(tasks[0].description).to.equal(task.description);
    expect(tasks[0].reward).to.equal(task.reward);
    expect(tasks[0].category).to.equal(task.category);
  });

  it('should only allow an assigned agent to complete a task', async function () {
    const { taskLlama, signers } = await setup();
    const agentAddress = signers[1].address;
    const task = {
      description: 'My Task Description',
      reward: ethers.parseEther('1'),
      testCases: [] as string[],
      expiry: Math.floor(Date.now() / 1000) + 3600, // Set expiry to 1 hour from now
      category: 1,
    };

    await taskLlama.connect(signers[0]).createTask(
      task.description,
      task.reward,
      task.testCases,
      task.expiry,
      task.category,
      { value: task.reward } // Ensure the reward is sent with the transaction
    );

    await taskLlama.connect(signers[1]).registerAgent(agentAddress);
    await taskLlama.connect(signers[0]).assignAgent(0, agentAddress);

    let notAssignedAgentAddress = ethers.Wallet.createRandom().address;
    await expect(
      taskLlama.connect(signers[2]).completeTask(notAssignedAgentAddress, 0)
    ).to.be.revertedWith('Only the assigned agent can complete the task');
    await expect(taskLlama.connect(signers[1]).completeTask(agentAddress, 0))
      .to.emit(taskLlama, 'TaskCompleted')
      .withArgs(0, agentAddress, task.reward);
    let agentCompletedTasks =
      await taskLlama.getAgentCompletedTasks(agentAddress);
    expect(agentCompletedTasks.length).to.equal(1);
  });

  it('should transfer the reward to the agent owner upon verification', async function () {
    const { taskLlama, signers } = await setup();
    const agentAddress = signers[1].address;
    const task = {
      description: 'My Task Description',
      reward: ethers.parseEther('1'),
      testCases: [] as string[],
      expiry: Math.floor(Date.now() / 1000) + 3600, // Set expiry to 1 hour from now
      category: 1,
    };

    await taskLlama.connect(signers[0]).createTask(
      task.description,
      task.reward,
      task.testCases,
      task.expiry,
      task.category,
      { value: task.reward } // Ensure the reward is sent with the transaction
    );

    await taskLlama.connect(signers[1]).registerAgent(agentAddress);
    await taskLlama.connect(signers[0]).assignAgent(0, agentAddress);
    await taskLlama.connect(signers[1]).completeTask(agentAddress, 0);

    const initialBalance = await ethers.provider.getBalance(signers[0].address);
    await expect(taskLlama.connect(signers[0]).verifyTask(0))
      .to.emit(taskLlama, 'TaskVerified')
      .withArgs(0, signers[0].address);
    const finalBalance = await ethers.provider.getBalance(signers[0].address);

    // TODO: revise result
    expect(finalBalance).to.be.closeTo(
      initialBalance - task.reward,
      ethers.parseEther('1')
    );
  });
});
