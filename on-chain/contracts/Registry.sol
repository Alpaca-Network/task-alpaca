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

    event TaskCreated(uint256 taskId, string description, uint256 reward, address agent, address evaluator);
    
    function createTask(string memory _description, uint256 _reward, address _agent, address _evaluator) public {
      Task memory newTask = Task({
          description: _description,
          agent: _agent,
          evaluator: _evaluator,
          reward: _reward
      });
      tasks.push(newTask);
      emit TaskCreated(tasks.length - 1, _description, _reward, _agent, _evaluator);
    }

    function getTask(uint256 index) public view returns (string memory, address, address, uint256) {
        require(index < tasks.length, "Task does not exist");
        Task memory task = tasks[index];
        return (task.description, task.agent, task.evaluator, task.reward);
    }

    function getRegistry() public view returns (Task[] memory) {
        return tasks;
    }
}
