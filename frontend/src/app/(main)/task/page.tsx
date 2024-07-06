'use client'
import { useEffect, useState } from 'react'
import { useCallback } from "react";
import { useAccount, useChainId, useSwitchChain } from 'wagmi'
import { ethers } from "ethers";
import { toast, ToastOptions } from "react-toastify";

import { Button } from '@/components/Button'
import RegistryABI from '@/data/RegistryABI.json'
import { useEthersSigner } from "@/hooks/useEthersSigner";
import { TaskLayout } from './TaskLayout'

const galCA: string = "0x5faa989af96af85384b8a938c2ede4a7378d9875";
const derampBaseAddress: string = "0x3847d1391d3Cb7e5B12637336F952F98F22e1413";
const derampDegenContract = new ethers.Contract(galCA, RegistryABI);
const derampBaseContract = new ethers.Contract(derampBaseAddress, RegistryABI);
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
  // const provider = useEthersProvider()
  const signer = useEthersSigner();
  const chainId = useChainId()

  const [fromBalance, setFromBalance] = useState<bigint>(BigInt(0))

  const [canBridge, setCanBridge] = useState(false); // default disabled until user types in input

  const [txLink, setTxLink] = useState<string>()

  const [isBridging, setIsBridging] = useState(false)

  //tokens
  const [fromToken, setFromToken] = useState('');
  const [toToken, setToToken] = useState('');
  const [amount, setAmount] = useState<string>('0');
  const [receiveAmount, setReceiveAmount] = useState<number>(0);

  useEffect(() => {
    if (!fromBalance) return

    if (parseFloat(amount) > 0) {
      const decimalAdjAmt = ethers.parseUnits(amount.toString(), TOKEN_DECIMALS);
      console.log('can bridge', decimalAdjAmt, fromBalance, decimalAdjAmt <= fromBalance)
      setCanBridge(decimalAdjAmt <= fromBalance)
      setReceiveAmount(parseFloat(amount) * 0.98);
    } else {
      return
    }
  }, [amount, fromBalance])

  useEffect(() => {
    const isChainBase = chainId === 8453

    const getDerampBalance = async () => {
      if (!address || !signer) {
        toast.error("Error fetching degen balance on Degen", toastProps);
        return;
      }

      const derampContract: any = isChainBase ? derampBaseContract : derampDegenContract

      try {
        const bal = (await derampContract.connect(signer).balanceOf(address)) as bigint;
        // console.log('balance on' + isChainBase ? 'base' : 'degen', bal.toString())
        setFromBalance(bal)
      } catch (err) {
        toast.error('Failed fetching degen balance', toastProps)
      }
    }

    getDerampBalance()
  }, [chainId, address, signer, fromBalance])

  const handleBridge = useCallback(async () => {
    setIsBridging(true)

    // console.log(`Swapping ${amount} for ${receiveAmount} -- ${fromToken} to ${toToken}`);
    if (!signer) {
      toast.error("Invalid signer", toastProps);
      setIsBridging(false)
      return
    }

    if (!fromBalance) {
      toast.error("Invalid balance", toastProps);
      setIsBridging(false)
      return
    }

    const decimalAdjAmt = ethers.parseUnits(amount, TOKEN_DECIMALS)
    if (decimalAdjAmt > fromBalance) {
      toast.error("Requested bridge $DR balance exceeds $DR wallet balance", toastProps);
      setIsBridging(false)
      return
    }

    const isChainBase = chainId === 8453
    const derampContract: any = isChainBase ? derampBaseContract : derampDegenContract

    try {
      const tx = (await derampContract.connect(signer).BridgeOut(decimalAdjAmt)) as ethers.TransactionResponse
      let txLinkBase = isChainBase ? "https://basescan.org/tx/" : "https://explorer.degen.tips/tx/"
      setTxLink(`${txLinkBase}/${tx.hash}`)
    } catch (e) {
      toast.error("TX FAILED :( ", toastProps);
    } finally {
      setIsBridging(false)
    }
  }, [amount, receiveAmount, fromToken, toToken, signer, fromBalance, chainId]);

  return (
    <TaskLayout
      title=""
      subtitle=""
    >

      <h1 className="text-center text-2xl font-medium tracking-tight text-gray-100">
        Task Llama
      </h1>

      <p className="mt-3 text-center text-md text-gray-300 display-flex">
        Create a task, get it solved with AI
      </p>


      <div className="token-container max-w-lg mt-10">

        <div className="token-input mb-4">
          <div className="flex justify-between items-center">
            <label htmlFor="fromToken" className="text-md font-medium text-gray-400">Set your bounty:</label>
            <span className="text-md text-gray-400">Balance: {ethers.formatUnits(fromBalance, TOKEN_DECIMALS)} $GAL</span>
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
            <select
              id="fromToken"
              value={fromToken}
              // onChange={(e) => setFromToken(e.target.value)}
              className="ml-2 bg-gray-700 text-gray-200 rounded-md outline-none border-none"
            >
              {/* <option value={fromToken}>{fromToken}</option> */}
              <option value="$DR">$DR</option>
            </select>
          </div>
        </div>

        <div className="token-input mb-4">
          <div className="flex justify-between items-center">
            <label htmlFor="toToken" className="block text-md font-medium text-gray-400">You Receive:</label>
            {/* <span className="ml-4 text-md text-gray-400">Balance: {toBalance} {toToken}</span> */}
          </div>

          <div className="flex items-center mt-1 bg-gray-700 p-2 rounded-md">
            <input
              type="number"
              id="receiveAmount"
              value={receiveAmount.toString()}
              onChange={(e) => setReceiveAmount(parseFloat(e.target.value))}
              placeholder="0"
              className="number-input flex-grow text-lg bg-gray-700 font-medium text-gray-200 outline-none border-none"
            />
            <select
              id="toToken"
              value={toToken}
              className="ml-2 bg-gray-700 text-gray-200 rounded-md outline-none border-none"
            >
              {/* <option value={toToken}>{toToken}</option> */}
              <option value="$DR">$DR</option>
            </select>
          </div>
        </div>
      </div>

      <Button onClick={handleBridge} disabled={!canBridge || isBridging} color="gray" className="mt-8 w-full">
        {isBridging ? "Creating Task..." : "Create Task"}
      </Button>

      {txLink && (
        <p className='text-lg text-gray-300'> <a href={txLink} target="_blank">Create Task Link</a></p>
      )}
    </TaskLayout>
  )
}
