// SPDX-License-Identifier: MIT
/*
    TODO:
      - add description
      - add comments
*/
pragma solidity ^0.8.13;

import './Task.sol';
contract Registry {
  Task[] public registry;

  function createTask(
    string memory _description,
    uint _pricePerExecution,
    uint256 _incentiveBlocksDuration
  ) public payable {
    Task task = new Task(
      _description,
      _pricePerExecution,
      _incentiveBlocksDuration
    );
    registry.push(task);
  }

  function getTask(uint index) public view returns (Task) {
    return registry[index];
  }

  function getRegistry() public view returns (Task[] memory) {
    return registry;
  }
}
