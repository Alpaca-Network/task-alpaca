// SPDX-License-Identifier: MIT
/*
    TODO:
      - add description
      - add comments
      - use "Agent" smart-contract from Galadriel
      - test coverage
      - agent owners are the ones responsible for completing the tasks, not agents
      - for Galadriel, agent address should be the oracleAddress
      - for Galadriel, how to query the agent owner?
      - performance testing
      - who can verify tasks?
      - when creating a task, the creator should deposit the reward in the contract
      - add functions to query from the categoryt tasks table
      - category task should not include tasks as it can be gas expensive, can however include the task ids?
      - create excalidraw diagram explaining the contract lifecycle
      - Sort functions based on type and alphabetical order
      - Reduce redundancy in the code by creating helper functions
*/
pragma solidity ^0.8.24;

contract TaskLlama {
  enum Category {
    Administrative,
    CustomerService,
    DataAnalysis,
    HumanResources,
    Marketing,
    Sales,
    Finance,
    ITandSecurity,
    Operations,
    ResearchandDevelopment,
    Legal,
    Healthcare,
    Education,
    ContentCreation,
    EnvironmentalManagement
  }

  struct Task {
    uint256 id;
    string description;
    uint256 reward;
    string[] testCases;
    uint256 expiry;
    address creator;
    address assignedAgent;
    bool completed;
    bool verified;
    Category category;
  }

  struct Agent {
    address agentAddress;
    address ownerAddress;
    mapping(Category => Task[]) categoryTasks; // Use mapping for tasks by category
  }

  Task[] public tasks;
  mapping(address => Agent) public agents;
  address[] public agentAddresses;

  event TaskCreated(
    uint256 taskId,
    string description,
    uint256 reward,
    uint256 expiry,
    Category category
  );
  event AgentRegistered(address agent);
  event AgentAssigned(uint256 taskId, address agent);
  event TaskCompleted(uint256 taskId, address agent, uint256 reward);
  event TaskVerified(uint256 taskId, address verifier);

  function createTask(
    string memory _description,
    uint256 _reward,
    string[] memory _testCases,
    uint256 _expiry,
    Category _category
  ) public payable {
    require(msg.value == _reward, 'Incorrect reward amount sent');

    Task memory newTask = Task({
      id: tasks.length,
      description: _description,
      reward: _reward,
      testCases: _testCases,
      expiry: _expiry,
      creator: msg.sender,
      assignedAgent: address(0),
      completed: false,
      verified: false,
      category: _category
    });

    tasks.push(newTask);
    emit TaskCreated(
      newTask.id,
      newTask.description,
      newTask.reward,
      newTask.expiry,
      newTask.category
    );
  }

  function registerAgent(address _agentAddress) public {
    require(
      agents[_agentAddress].agentAddress == address(0),
      'Agent already registered'
    );

    Agent storage newAgent = agents[_agentAddress];
    newAgent.agentAddress = _agentAddress;
    newAgent.ownerAddress = msg.sender;
    agentAddresses.push(_agentAddress);
    emit AgentRegistered(_agentAddress);
  }

  function assignAgent(uint _taskId, address _agent) public {
    Task storage task = tasks[_taskId];
    require(task.expiry > block.timestamp, 'Task expired');
    require(task.creator == msg.sender, 'Only the creator can assign an agent');
    require(task.assignedAgent == address(0), 'Task already assigned');
    require(agents[_agent].agentAddress != address(0), 'Agent not registered');

    task.assignedAgent = _agent;
    agents[_agent].categoryTasks[task.category].push(task);

    emit AgentAssigned(_taskId, _agent);
  }

  function completeTask(address agentAddress, uint256 _taskId) public {
    require(_taskId < tasks.length, 'Task does not exist');
    Task storage task = tasks[_taskId];
    require(
      task.assignedAgent == agentAddress,
      'Only the assigned agent can complete the task'
    );
    require(!task.completed, 'Task already completed');
    require(task.expiry == 0 || block.timestamp < task.expiry, 'Task expired');

    task.completed = true;

    emit TaskCompleted(_taskId, agentAddress, task.reward);
  }

  function verifyTask(uint256 _taskId) public {
    require(_taskId < tasks.length, 'Task does not exist');
    Task storage task = tasks[_taskId];
    require(
      task.creator == msg.sender,
      'Only the task creator can verify the task'
    );
    require(task.completed, 'Task not completed yet');
    require(!task.verified, 'Task already verified');

    task.verified = true;

    payable(getAgentOwner(task.assignedAgent)).transfer(task.reward);
    emit TaskVerified(_taskId, msg.sender);
  }

  function getAgentTasksByCategory(
    address _agent,
    Category _category
  ) public view returns (Task[] memory) {
    return agents[_agent].categoryTasks[_category];
  }

  function getLeaderboard(
    Category _category
  ) public view returns (address[] memory) {
    address[] memory leaderboard = new address[](agentAddresses.length);
    uint256[] memory completedTasks = new uint256[](agentAddresses.length);

    for (uint256 i = 0; i < agentAddresses.length; i++) {
      Agent storage agent = agents[agentAddresses[i]];
      Task[] storage agentTasks = agent.categoryTasks[_category];
      uint256 completedTask = 0;

      for (uint256 j = 0; j < agentTasks.length; j++) {
        if (agentTasks[j].verified) {
          completedTask += agentTasks[j].reward;
        }
      }

      completedTasks[i] = completedTask;
    }

    for (uint256 i = 0; i < completedTasks.length; i++) {
      uint256 maxcompletedTask = 0;
      uint256 maxIndex = 0;

      for (uint256 j = 0; j < completedTasks.length; j++) {
        if (completedTasks[j] > maxcompletedTask) {
          maxcompletedTask = completedTasks[j];
          maxIndex = j;
        }
      }

      leaderboard[i] = agentAddresses[maxIndex];
      completedTasks[maxIndex] = 0;
    }

    return leaderboard;
  }

  function getTasks() public view returns (Task[] memory) {
    return tasks;
  }

  function getCategories() public pure returns (Category[] memory) {
    Category[] memory categories = new Category[](15);
    categories[0] = Category.Administrative;
    categories[1] = Category.CustomerService;
    categories[2] = Category.DataAnalysis;
    categories[3] = Category.HumanResources;
    categories[4] = Category.Marketing;
    categories[5] = Category.Sales;
    categories[6] = Category.Finance;
    categories[7] = Category.ITandSecurity;
    categories[8] = Category.Operations;
    categories[9] = Category.ResearchandDevelopment;
    categories[10] = Category.Legal;
    categories[11] = Category.Healthcare;
    categories[12] = Category.Education;
    categories[13] = Category.ContentCreation;
    categories[14] = Category.EnvironmentalManagement;

    return categories;
  }

  function getAgentCompletedTasks(
    address _agent
  ) public view returns (Task[] memory) {
    Task[] memory completedTasks = new Task[](tasks.length);
    uint256 completedTasksCount = 0;

    for (uint256 i = 0; i < tasks.length; i++) {
      if (tasks[i].assignedAgent == _agent && tasks[i].completed) {
        completedTasks[completedTasksCount] = tasks[i];
        completedTasksCount++;
      }
    }

    Task[] memory resizedCompletedTasks = new Task[](completedTasksCount);
    for (uint256 i = 0; i < completedTasksCount; i++) {
      resizedCompletedTasks[i] = completedTasks[i];
    }

    return resizedCompletedTasks;
  }

  function getAgentCompletedTasksCount(
    address _agent
  ) public view returns (uint256) {
    uint256 completedTasksCount = 0;

    for (uint256 i = 0; i < tasks.length; i++) {
      if (tasks[i].assignedAgent == _agent && tasks[i].completed) {
        completedTasksCount++;
      }
    }

    return completedTasksCount;
  }

  function getAgentOwner(address _agent) public view returns (address) {
    return agents[_agent].ownerAddress;
  }

  function depositFunds() public payable {
    // The contract automatically receives the funds
  }
}
