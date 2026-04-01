import { useCallback, useEffect, useState } from "react";
import { ethers } from "ethers";

type UseWalletReturn = {
  account: string | null;
  balance: string | null;
  isConnecting: boolean;
  walletError: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  refreshWallet: () => Promise<void>;
};

const STORAGE_KEY = "walletConnected";

export const useWallet = (): UseWalletReturn => {
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletError, setWalletError] = useState<string | null>(null);

  const readBalance = useCallback(async (walletAddress: string) => {
    if (!(window as any).ethereum) return;

    const provider = new ethers.BrowserProvider((window as any).ethereum);
    const rawBalance = await provider.getBalance(walletAddress);
    setBalance(ethers.formatEther(rawBalance));
  }, []);

  const refreshWallet = useCallback(async () => {
    try {
      if (!(window as any).ethereum) return;

      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const accounts = await provider.send("eth_accounts", []);

      if (!accounts || accounts.length === 0) {
        setAccount(null);
        setBalance(null);
        localStorage.removeItem(STORAGE_KEY);
        return;
      }

      setAccount(accounts[0]);
      localStorage.setItem(STORAGE_KEY, accounts[0]);
      await readBalance(accounts[0]);
    } catch (error) {
      console.error("Wallet refresh error:", error);
      setWalletError("Unable to refresh wallet information.");
    }
  }, [readBalance]);

  const connectWallet = useCallback(async () => {
    try {
      setIsConnecting(true);
      setWalletError(null);

      if (!(window as any).ethereum) {
        setWalletError("MetaMask is not installed. Please install it first.");
        return;
      }

      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);

      if (!accounts || accounts.length === 0) {
        setWalletError("No wallet account found.");
        return;
      }

      setAccount(accounts[0]);
      localStorage.setItem(STORAGE_KEY, accounts[0]);
      await readBalance(accounts[0]);
    } catch (error) {
      console.error("Connect wallet error:", error);

      const message =
        error instanceof Error ? error.message : "Unable to connect wallet.";

      if (
        message.toLowerCase().includes("user rejected") ||
        message.toLowerCase().includes("action_rejected")
      ) {
        setWalletError("Wallet connection was rejected.");
      } else {
        setWalletError("Unable to connect wallet.");
      }
    } finally {
      setIsConnecting(false);
    }
  }, [readBalance]);

  const disconnectWallet = useCallback(() => {
    setAccount(null);
    setBalance(null);
    setWalletError(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  useEffect(() => {
    const tryReconnect = async () => {
      const savedWallet = localStorage.getItem(STORAGE_KEY);

      if (!savedWallet) return;
      if (!(window as any).ethereum) return;

      await refreshWallet();
    };

    tryReconnect();
  }, [refreshWallet]);

  useEffect(() => {
    if (!(window as any).ethereum) return;

    const ethereum = (window as any).ethereum;

    const handleAccountsChanged = async (accounts: string[]) => {
      if (!accounts || accounts.length === 0) {
        disconnectWallet();
        return;
      }

      setAccount(accounts[0]);
      localStorage.setItem(STORAGE_KEY, accounts[0]);
      await readBalance(accounts[0]);
    };

    const handleChainChanged = () => {
      window.location.reload();
    };

    if (ethereum.on) {
      ethereum.on("accountsChanged", handleAccountsChanged);
      ethereum.on("chainChanged", handleChainChanged);
    }

    return () => {
      if (ethereum.removeListener) {
        ethereum.removeListener("accountsChanged", handleAccountsChanged);
        ethereum.removeListener("chainChanged", handleChainChanged);
      }
    };
  }, [disconnectWallet, readBalance]);

  return {
    account,
    balance,
    isConnecting,
    walletError,
    connectWallet,
    disconnectWallet,
    refreshWallet,
  };
};