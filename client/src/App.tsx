import React from 'react';
import { getRegistry, getTask, submitAgent, useAgent } from './scripts/taskContractInteraction';

const App: React.FC = () => {
  const HandleSubmitAgent = async () => {
    await submitAgent('0xAgentAddress', '0xAgentOwnerAddress');
  };

  const HandleUseAgent = async () => {
    await useAgent('These are additional instructions');
  };

  const HandleGetRegistry = async () => {
    await getRegistry();
  }

  const HandleGetTask = async () => {
    await getTask(0);
  }

  return (
    <div>
      <h1>Task contract</h1>
      <button onClick={HandleSubmitAgent}>Submit Agent</button>
      <button onClick={HandleUseAgent}>Use Agent</button>
      <h1>Registry contract</h1>
      <button onClick={HandleGetRegistry}>Get Registry</button>
      <button onClick={HandleGetTask}>Get Task</button>
    </div>
  );
};

export default App;