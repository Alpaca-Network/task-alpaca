// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TaskRegistry {
  struct Task {
    string description;
    address agent;
    address evaluator;
    uint256 reward;
  }

  Task[] public tasks;

  event TaskCreated(
    uint256 taskId,
    string description,
    uint256 reward,
    address agent,
    address evaluator
  );

  // Function to create a new task and accept Ether as reward
  function createTask(
    string memory _description,
    address _agent,
    address _evaluator
  ) public payable {
    require(msg.value > 0, 'Reward must be greater than 0');
    Task memory newTask = Task({
      description: _description,
      agent: _agent,
      evaluator: _evaluator,
      reward: msg.value
    });
    tasks.push(newTask);
    emit TaskCreated(
      tasks.length - 1,
      _description,
      msg.value,
      _agent,
      _evaluator
    );
  }

  // Function to get task details
  function getTask(
    uint256 index
  ) public view returns (string memory, address, address, uint256) {
    require(index < tasks.length, 'Task does not exist');
    Task memory task = tasks[index];
    return (task.description, task.agent, task.evaluator, task.reward);
  }

  // Function to get all tasks in the registry
  function getRegistry() public view returns (Task[] memory) {
    return tasks;
  }

  // Fallback function to accept Ether transfers
  receive() external payable {}

  // Fallback function to accept data and Ether
  fallback() external payable {}
}
