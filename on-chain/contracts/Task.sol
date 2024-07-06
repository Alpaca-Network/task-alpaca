// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Task {
    public address bestAgent;
    public address bestScore;
    public address bestAgentOwner;
    public uint256 submissionBlock;

    public string description;
    public uint256 incentive;
    public uint256 incentiveBlocksDuration;
    public string[] testCases;
    public uint256 pricePerExecution;

    

    address private criticLLMAddress;


    constructor(string memory _description, address _critcLLMAddress, uint _incentive, uint _pricePerExecution, uint256 _incentiveBlocksDuration) payable {
        description = _description;
        criticLLMAddress = _critcLLMAddress;
        pricePerExecution = _pricePerExecution;
        incentive = _incentive;
        incentiveBlocksDuration = _incentiveBlocksDuration;
        reward = msg.value;
    }

    function evaluateAgent(address agent) public {
        string agentOutput = agent.sendMessage(string.concat(
            "Complete the following task: ",
            description
        ));

        string evaluationOutput = criticLLMAddress.sendMessage(string.concat(
            "Evaluate an agent's solution to the following task: ", 
            description,
            "\nReturn only a grade in the form of an integer between 0 and 100 where 0 represents a terrible output and 100 is perfect. This is the agent submission:",
            agentOutput
        ));

        returns parseString(evaluationOutput);
    }

    function calculatePayout() public {
        return incentive / incentiveBlocksDuration;
    }

    function submitAgent(address _agent, address _owner) public {
        
        // Submit the current agent for evaluation
        uint 256 score = evaluateAgent(_agent);

        // If no agent exists, set the current submission as the best
        if (bestAgent == address(0)) {
            bestAgent = _agent;
            bestScore = score;
            bestAgentOwner = _owner;
            submissionBlock = block.number;
        } 
        else if (score > bestScore) {
            // Pay the previous best agent
            uint rewardForPreviousBest = calculatePayout();
            incentive -= rewardForPreviousBest;
            bestAgentOwner.transfer(rewardForPreviousBest);

            // Set the new best agent
            bestAgent = _agent;
            bestScore = score;
            bestAgentOwner = _owner;
            submissionBlock = block.number;
        }
    }

    function useAgent(string memory additionalInstructions) public payable{
        require(msg.value == price, "Incorrect payment amount sent");
        return bestAgent.sendMessage(string.concat(
            "This is your task: ",
            description,
            "\nThese are additional instructions and constraints you must obey:"
            additionalInstructions
        ));


        // Use the best agent to complete the task
        //get payment
    }

    function parseString(string memory _input) public pure returns(uint) {
        uint val=0;
        bytes memory stringBytes = bytes(_input);
        for (uint  i =  0; i<stringBytes.length; i++) {
            uint exp = stringBytes.length - i;
            bytes1 ival = stringBytes[i];
            uint8 uval = uint8(ival);
           uint jval = uval - uint(0x30);
   
           val +=  (uint(jval) * (10**(exp-1))); 
        }
      return val;
    }
}