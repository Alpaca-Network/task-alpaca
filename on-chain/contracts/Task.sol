// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

interface Agent {
  function startChat(
    string memory _message
  ) external returns (string memory);
}

contract Task {
  address public owner;
  address public bestAgent;
  uint256 public bestScore;
  address payable public bestAgentOwner;
  uint256 public submissionBlock;

  string public description;
  uint256 public incentive;
  uint256 public remainingIncentive;
  uint256 public incentiveBlocksDuration;
  bool public incentivesFullyPaid;
  string[] public testCases;
  uint256 public pricePerExecution;
  uint256 public creationBlock;

  address private criticLLMAddress;
  address private currently_evaluating_addr;
  address private currently_evaluating_owner;
  string public response;

  modifier ownerOnly() {
    require(
      msg.sender == owner,
      'Only the owner of the Task can call this function'
    );
    _;
  }

  constructor(
    string memory _description,
    uint _pricePerExecution,
    uint256 _incentiveBlocksDuration
  ) payable {
    owner = msg.sender;
    description = _description;
    pricePerExecution = _pricePerExecution;
    incentiveBlocksDuration = _incentiveBlocksDuration;
    incentive = msg.value;
    creationBlock = block.number;
    incentivesFullyPaid = false;
    remainingIncentive = msg.value;
  }

  function setCriticAddress(address _criticLLMAddress) public ownerOnly {
    criticLLMAddress = _criticLLMAddress;
  }

  function evaluateAgent(address agent) private {
    Agent(agent).startChat(
      string.concat('Complete the following task: ', description)
    );
  }

  function respond(string memory _response) public {
    response = _response;
    Agent(criticLLMAddress).startChat(
      string.concat(
        "Evaluate an agent's solution to the following task: ",
        description,
        '\nReturn only a grade in the form of an integer between 0 and 100 where 0 represents a terrible output and 100 is perfect. This is the agent submission:',
        _response
      )
    );
  }

  function evalRespond(string memory _response) public {
    uint256 score = parseString(_response);

    // If no agent exists, set the current submission as the best
    if (bestAgent == address(0)) {
        bestAgent = currently_evaluating_addr;
        bestScore = score;
        bestAgentOwner = payable(currently_evaluating_owner);
        submissionBlock = block.number;
    } else if (score > bestScore) {
      if (!incentivesFullyPaid) {
        // Pay the previous best agent
        uint rewardForPreviousBest = calculatePayout();
        remainingIncentive -= rewardForPreviousBest;
        bestAgentOwner.transfer(rewardForPreviousBest);
      }

      // Set the new best agent
      bestAgent = currently_evaluating_addr;
      bestScore = score;
      bestAgentOwner = payable(currently_evaluating_owner);
      submissionBlock = block.number;
    }
    currently_evaluating_addr = address(0);
    currently_evaluating_owner = address(0);
  }

  function calculatePayout() private returns (uint256) {
    if (block.number - creationBlock > incentiveBlocksDuration) {
      incentivesFullyPaid = true;
      return remainingIncentive;
    } else {
      uint blocksPassed = block.number - submissionBlock;
      return incentive * (blocksPassed / incentiveBlocksDuration);
    }
  }

  function submitAgent(address _agent, address _owner) public payable {
    // Submit the current agent for evaluation
    evaluateAgent(_agent);
    currently_evaluating_addr = _agent;
    currently_evaluating_owner = _owner;
  }

  function useAgent(
    string memory additionalInstructions
  ) public payable {
    // TODO: think about how to ensure that the agent responds to the task
    require(msg.value == pricePerExecution, 'Incorrect payment amount sent');
    Agent(bestAgent).startChat(
        string.concat(
          'This is your task: ',
          description,
          '\nThese are additional instructions and constraints you must obey:',
          additionalInstructions
        )
    );
  }

  function parseString(string memory _input) public pure returns (uint) {
    uint val = 0;
    bytes memory stringBytes = bytes(_input);
    for (uint i = 0; i < stringBytes.length; i++) {
      uint exp = stringBytes.length - i;
      bytes1 ival = stringBytes[i];
      uint8 uval = uint8(ival);
      uint jval = uval - uint(0x30);

      val += (uint(jval) * (10 ** (exp - 1)));
    }
    return val;
  }
}
