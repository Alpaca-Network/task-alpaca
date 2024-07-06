// SPDX-License-Identifier: MIT
/*
    TODO:
      - add description
      - add comments
*/
pragma solidity ^0.8.13;

import './Task.sol';
contract Registry {
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

    function getTask(uint256 index) public view returns (Task memory) {
        require(index < tasks.length, "Task does not exist");
        return tasks[index];
    }

    function getRegistry() public view returns (Task[] memory) {
        return tasks;
    }
}
