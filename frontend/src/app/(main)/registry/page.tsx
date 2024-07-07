'use client'
import { useEffect, useState, useCallback } from 'react'
import { useAccount, useChainId, useBalance } from 'wagmi'
import { ethers } from "ethers";
import { toast, ToastOptions } from "react-toastify";
import { Button } from '@/components/Button'
import ABI from '@/data/ABI.json'
import { useEthersSigner } from "@/hooks/useEthersSigner";
import { RegistryLayout } from './RegistryLayout'

const galCA: string = "0x70819E5815f687B079eC6364fA5B8ac42e8986d6";
const agentAddress: string = "0x0b95Eaf38E00ab26cB4bA6284726888CF2e5a0e1";
const evaluatorAddress: string = "0x39E21bE0b4518baC9233705c43E59fb5224C9185"
const TOKEN_DECIMALS = 18; // for both ETH and DEGEN

const toastProps: ToastOptions = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
}

export default function Bridge() {
  const signer = useEthersSigner();

  const [tasks, setTasks] = useState<any[]>([]); // state to store tasks
  const [task, setTask] = useState<any | null>(null); // state to store a single task
  const [taskId, setTaskId] = useState<number>(0); // state to store the input task ID

  // Function to get the registry of tasks
  const getRegistry = useCallback(async () => {
    if (!signer) {
      toast.error("Invalid signer", toastProps);
      return;
    }

    const galGaladrielContract = new ethers.Contract(galCA, ABI, signer);

    try {
      const tasksList = await galGaladrielContract.getRegistry(); // Assuming the contract has a getRegistry method
      setTasks(tasksList);
    } catch (e) {
      toast.error("Failed to fetch tasks", toastProps);
      console.log(e, 'failed to fetch tasks');
    }
  }, [signer]);

  useEffect(() => {
    getRegistry();
  }, [getRegistry]);

  // Function to get a task by ID
  const getTask = useCallback(async (id: number) => {
    if (!signer) {
      toast.error("Invalid signer", toastProps);
      return;
    }

    const galGaladrielContract = new ethers.Contract(galCA, ABI, signer);

    try {
      const task = await galGaladrielContract.getTask(id); // Assuming the contract has a getTask method
      setTask(task[2]);
      // return(task[2])

    } catch (e) {
      toast.error("Failed to fetch task", toastProps);
      console.log(e, 'failed to fetch task');
    }
  }, [signer]);

  const handleGetTask = () => {
    getTask(taskId);
  };

  return (
    <RegistryLayout
      title=""
      subtitle=""
    >
      <h1 className="text-center text-2xl font-medium tracking-tight text-gray-100">
        Task Registry
      </h1>
      <div className="task-list mt-10">
        {tasks.length > 0 ? (
          <ul>
            {tasks.map((task, index) => (
              <li key={index} className="text-gray-300 text-center">{task.description}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-300">No tasks found.</p>
        )}
      </div>

      <div className="flex justify-center mt-4">
        <input
          value={taskId}
          onChange={(e) => setTaskId(Number(e.target.value))}
          placeholder="Task ID"
          className="bg-gray-800 text-gray-300 px-4 py-2 rounded-md"
        />
        <Button
          onClick={handleGetTask}
          className="ml-4"
        >
          Get Task
        </Button>
      </div>

      {task && (
        <div className="task-details mt-4 text-left text-gray-300">
          <h2 className="text-xs font-medium">Current agent</h2>
          <p className="text-xs font-medium">{task}</p>
        </div>
      )}
    </RegistryLayout>
  )
}