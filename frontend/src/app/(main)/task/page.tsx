'use client'
import { useEffect, useState } from 'react'
import { useCallback } from "react";
import { useAccount, useChainId, useBalance } from 'wagmi'

import { ethers } from "ethers";
import { toast, ToastOptions } from "react-toastify";

import { Button } from '@/components/Button'
import ABI from '@/data/ABI.json'
import { useEthersSigner } from "@/hooks/useEthersSigner";
import { TaskLayout } from './TaskLayout'

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
  const { address } = useAccount()
  const { data: balance, isError, isLoading } = useBalance({
    address: address,
    chainId: 696969, // This is the address for ETH
  });
  // const provider = useEthersProvider()
  const signer = useEthersSigner();
  const chainId = useChainId()

  const [fromBalance, setFromBalance] = useState<bigint>(BigInt(0))

  const [transactionValid, setTransactionValid] = useState(false); // default disabled until user types in input
  const [txLink, setTxLink] = useState<string>()
  const [isSending, setIsSending] = useState(false)

  //tokens
  const [fromToken, setFromToken] = useState('');
  const [toToken, setToToken] = useState('');
  const [amount, setAmount] = useState<string>('0');
  const [description, setDescription] = useState("");

  const sendTransaction = useCallback(async () => {
    setIsSending(true)
    if (!balance) {
      toast.error("balance undefined")
      setIsSending(false)
      return
    }
    if (!signer) {
      toast.error("Invalid signer", toastProps);
      setIsSending(false)
      return
    }
    console.log('sending')

    const decimalAdjAmt = ethers.parseUnits(amount.toString(), TOKEN_DECIMALS);

    const galGaladrielContract = new ethers.Contract(galCA, ABI, signer);

    console.log(decimalAdjAmt, agentAddress, evaluatorAddress, description)

    try {
    console.log(description)
      const tx = (await galGaladrielContract.createTask(description, agentAddress, evaluatorAddress, { value: decimalAdjAmt } )) as ethers.TransactionResponse
      console.log('trying')
      
      let baseTxLink = "https://explorer.galadriel.com/tx/";
      setTxLink(`${baseTxLink}/${tx.hash}`)
    } catch (e) {
      toast.error("TX FAILED ", toastProps);
      console.log(e, 'failed')
    } finally {

      registerTask()
      setIsSending(false)
    }
  }, [amount, signer, description, fromBalance]);

  const registerTask = async () => {
    const url = "https://app.langtrace.ai/api/project";
    const headers = {
      "Content-Type": "application/json",
      "x-api-key": process.env.NEXT_PUBLIC_LANGTRACE_TEAM_API_KEY!
    };
    
    const payload = {
      name: signer?.address,
      description: "Budget: " + amount.toString() + "$GAL" + " Description: " + description,
      teamId: process.env.NEXT_PUBLIC_LANGTRACE_TEAM_ID!,
      createDefaultTests: true
    };

    fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error))
  }
  return (
    <TaskLayout
      title=""
      subtitle=""
    >

      <h1 className="text-center text-2xl font-medium tracking-tight text-gray-100">
        Task Alpaca
      </h1>

      <p className="mt-3 text-center text-md text-gray-300 display-flex">
        Create a task, get it solved with AI
      </p>

      <div className="token-container max-w-lg mt-10">

        <div className="token-input mb-4">
          <div className="flex justify-between items-center">
            <label htmlFor="fromToken" className="text-md font-medium text-gray-400">Set your bounty:</label>
            <span className="text-md text-gray-400">Balance: {balance ? ethers.formatUnits(balance.value, 18) : '0'} $GAL</span>
          </div>

          <div className="flex items-center mt-1 bg-gray-700 p-2 rounded-md">
            <input
              type="text" // Change type to "text" to allow input of decimal values
              id="amount"
              value={amount.toString()}
              onChange={(e) => setAmount(e.target.value)}
              // type conversion issue <---
              placeholder="0"
              className="flex-grow bg-gray-700 text-lg font-medium text-gray-200 border-none"
            />
          </div>
        </div>

        <div className="token-input mb-4">
          <div className="flex justify-between items-center">
            <label htmlFor="toToken" className="block text-md font-medium text-gray-400">Your task:</label>
            {/* <span className="ml-4 text-md text-gray-400">Balance: {toBalance} {toToken}</span> */}
          </div>

          <div className="flex items-center mt-1 bg-gray-700 p-2 rounded-md">
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription((e.target.value))}
              placeholder="lorem ipsum"
              className="number-input flex-grow text-lg bg-gray-700 font-medium text-gray-200 outline-none border-none"
            />
           
          </div>
        </div>
      </div>

      <Button onClick={sendTransaction} color="gray" className="mt-8 w-full">
        {isSending ? "Creating Task..." : "Create Task"}
      </Button>

      {txLink && (
        <p className='text-lg text-gray-300'> <a href={txLink} target="_blank">Create Task Explorer</a></p>
      )}
    </TaskLayout>
  )
}
