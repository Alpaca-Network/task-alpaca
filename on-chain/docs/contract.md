# Solidity API

## TaskLlama

### Category

```solidity
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
```

### Task

```solidity
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
  enum TaskLlama.Category category;
}
```

### Agent

```solidity
struct Agent {
  address agentAddress;
  address ownerAddress;
  mapping(enum TaskLlama.Category => struct TaskLlama.Task[]) categoryTasks;
}
```

### tasks

```solidity
struct TaskLlama.Task[] tasks
```

### agents

```solidity
mapping(address => struct TaskLlama.Agent) agents
```

### agentAddresses

```solidity
address[] agentAddresses
```

### TaskCreated

```solidity
event TaskCreated(uint256 taskId, string description, uint256 reward, uint256 expiry, enum TaskLlama.Category category)
```

### AgentRegistered

```solidity
event AgentRegistered(address agent)
```

### AgentAssigned

```solidity
event AgentAssigned(uint256 taskId, address agent)
```

### TaskCompleted

```solidity
event TaskCompleted(uint256 taskId, address agent, uint256 reward)
```

### TaskVerified

```solidity
event TaskVerified(uint256 taskId, address verifier)
```

### createTask

```solidity
function createTask(string _description, uint256 _reward, string[] _testCases, uint256 _expiry, enum TaskLlama.Category _category) public payable
```

### registerAgent

```solidity
function registerAgent(address _agentAddress) public
```

### assignAgent

```solidity
function assignAgent(uint256 _taskId, address _agent) public
```

### completeTask

```solidity
function completeTask(address agentAddress, uint256 _taskId) public
```

### verifyTask

```solidity
function verifyTask(uint256 _taskId) public
```

### getAgentTasksByCategory

```solidity
function getAgentTasksByCategory(address _agent, enum TaskLlama.Category _category) public view returns (struct TaskLlama.Task[])
```

### getLeaderboard

```solidity
function getLeaderboard(enum TaskLlama.Category _category) public view returns (address[])
```

### getTasks

```solidity
function getTasks() public view returns (struct TaskLlama.Task[])
```

### getCategories

```solidity
function getCategories() public pure returns (enum TaskLlama.Category[])
```

### getAgentCompletedTasks

```solidity
function getAgentCompletedTasks(address _agent) public view returns (struct TaskLlama.Task[])
```

### getAgentCompletedTasksCount

```solidity
function getAgentCompletedTasksCount(address _agent) public view returns (uint256)
```

### getAgentOwner

```solidity
function getAgentOwner(address _agent) public view returns (address)
```

### depositFunds

```solidity
function depositFunds() public payable
```
