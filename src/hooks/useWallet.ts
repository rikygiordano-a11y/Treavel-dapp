import { useState } from "react"
import { ethers } from "ethers"

export const useWallet = () => {

  const [account, setAccount] = useState<string | null>(null)
  const [balance, setBalance] = useState<string | null>(null)

  const connectWallet = async () => {

    if (!window.ethereum) {
      alert("Install MetaMask")
      return
    }

    const provider = new ethers.BrowserProvider(window.ethereum)

    const accounts = await provider.send("eth_requestAccounts", [])

    const balance = await provider.getBalance(accounts[0])

    setAccount(accounts[0])
    setBalance(ethers.formatEther(balance))

    localStorage.setItem("walletConnected", accounts[0])

  }

  return {
    account,
    balance,
    connectWallet
  }

}