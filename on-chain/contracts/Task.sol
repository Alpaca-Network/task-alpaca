// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Task {
    public address bestAgent;
    public address bestScore;

    public string description;
    public uint256 reward;
    public string[] testCases;

    address private criticLLMAddress;


    constructor(string memory _description, address _critcLLMAddress) payable{
        description = _description;
        criticLLMAddress = _critcLLMAddress;
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
            "Return only a grade in the form of a number between 0 and 100. This is the agent submission:", agentOutput
        ));
        // TODO: parse evaluationOutput to uint256
        returns evaluationOutput;
    }

    function submitAgent(address agent) public {
        // Submit the current agent for evaluation
        uint 256 score = evaluateAgent(agent);
        if (score > bestScore) {
            bestAgent = agent;
            bestScore = score;
        }
    }

    function useAgent() public payable{
        // Use the best agent to complete the task
        //get payment
    }


}