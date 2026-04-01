import { useMemo, useState } from "react";
import { ethers } from "ethers";
import "./App.css";
import { useWallet } from "./hooks/useWallet";
import { products } from "./data/products";
import type { Product } from "./data/products";
import ProductCard from "./components/ProductCard";

const RICCARDO_ADDRESS = "0x1234567890123456789012345678901234567890";

export default function App() {
  const {
    account,
    balance,
    isConnecting,
    walletError,
    connectWallet,
    disconnectWallet,
    refreshWallet,
  } = useWallet();

  const [isBuying, setIsBuying] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [purchaseError, setPurchaseError] = useState<string | null>(null);

  const shortenedAccount = useMemo(() => {
    if (!account) return "";
    return `${account.slice(0, 6)}...${account.slice(-4)}`;
  }, [account]);

  const handleBuy = async (product: Product) => {
    setPurchaseError(null);
    setSuccessMessage(null);
    setTxHash(null);
    setSelectedProductId(product.id);

    try {
      setIsBuying(true);

      if (!(window as any).ethereum) {
        throw new Error("MetaMask is not installed.");
      }

      let currentAccount = account;

      if (!currentAccount) {
        await connectWallet();
        await refreshWallet();
        currentAccount = localStorage.getItem("walletConnected");
      }

      if (!currentAccount) {
        throw new Error("Wallet connection failed.");
      }

      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();

      const tx = await signer.sendTransaction({
        to: RICCARDO_ADDRESS,
        value: ethers.parseEther(product.price),
      });

      setTxHash(tx.hash);

      await tx.wait();

      setSuccessMessage(`Payment completed successfully for ${product.name}.`);
      await refreshWallet();
    } catch (error) {
      console.error("Transaction error:", error);

      const message =
        error instanceof Error
          ? error.message
          : "Transaction failed. Please try again.";

      if (
        message.toLowerCase().includes("user rejected") ||
        message.toLowerCase().includes("action_rejected")
      ) {
        setPurchaseError("Transaction rejected from wallet.");
      } else if (message.toLowerCase().includes("insufficient funds")) {
        setPurchaseError("Insufficient funds to complete this transaction.");
      } else if (message.toLowerCase().includes("wallet connection failed")) {
        setPurchaseError("Wallet connection failed. Please reconnect and try again.");
      } else {
        setPurchaseError(message);
      }
    } finally {
      setIsBuying(false);
      setSelectedProductId(null);
    }
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <div className="brand__logo">T</div>
          <div>
            <p className="brand__eyebrow">Web3 Travel Marketplace</p>
            <h1 className="brand__title">Travel dApp</h1>
          </div>
        </div>

        <nav className="topbar__nav">
          <a href="#packages">Packages</a>
          <a href="#how-it-works">How it works</a>
          <a href="#wallet">Wallet</a>
        </nav>

        <div className="topbar__actions">
          {!account ? (
            <button
              className="btn btn--primary"
              onClick={connectWallet}
              disabled={isConnecting}
            >
              {isConnecting ? "Connecting..." : "Connect Wallet"}
            </button>
          ) : (
            <div className="wallet-chip">
              <span>{shortenedAccount}</span>
              <button
                className="btn btn--ghost btn--small"
                onClick={disconnectWallet}
              >
                Disconnect
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="page">
        <section className="hero">
          <div className="hero__content">
            <span className="hero__badge">Demo project for a Web3 travel client</span>
            <h2>Buy travel experiences with MetaMask in a cleaner Web3 interface.</h2>
            <p>
              This demo simulates a decentralized travel marketplace where users can
              connect their wallet, view travel packages, and complete a blockchain
              payment with Ethereum.
            </p>

            <div className="hero__cta">
              <a href="#packages" className="btn btn--primary">
                Explore Packages
              </a>
              <a href="#how-it-works" className="btn btn--secondary">
                Learn More
              </a>
            </div>
          </div>

          <aside className="hero__panel" id="wallet">
            <h3>Wallet Overview</h3>

            <div className="info-row">
              <span>Status</span>
              <strong className={account ? "status status--success" : "status status--warning"}>
                {account ? "Connected" : "Not connected"}
              </strong>
            </div>

            <div className="info-row">
              <span>Account</span>
              <strong>{account ? shortenedAccount : "Connect your wallet"}</strong>
            </div>

            <div className="info-row">
              <span>Balance</span>
              <strong>{balance ? `${Number(balance).toFixed(4)} ETH` : "--"}</strong>
            </div>

            <div className="info-row">
              <span>Recipient</span>
              <strong>{`${RICCARDO_ADDRESS.slice(0, 6)}...${RICCARDO_ADDRESS.slice(-4)}`}</strong>
            </div>

            {!account && (
              <button
                className="btn btn--primary btn--full"
                onClick={connectWallet}
                disabled={isConnecting}
              >
                {isConnecting ? "Connecting..." : "Connect MetaMask"}
              </button>
            )}
          </aside>
        </section>

        {(walletError || purchaseError || successMessage || txHash) && (
          <section className="feedback-stack">
            {walletError && (
              <div className="alert alert--error">
                <strong>Wallet error:</strong> {walletError}
              </div>
            )}

            {purchaseError && (
              <div className="alert alert--error">
                <strong>Payment error:</strong> {purchaseError}
              </div>
            )}

            {successMessage && (
              <div className="alert alert--success">
                <strong>Success:</strong> {successMessage}
              </div>
            )}

            {txHash && (
              <div className="alert alert--info">
                <strong>Transaction:</strong>{" "}
                <a
                  href={`https://sepolia.etherscan.io/tx/${txHash}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  View on Etherscan
                </a>
              </div>
            )}
          </section>
        )}

        <section className="section" id="how-it-works">
          <div className="section-heading">
            <span className="section-heading__label">Scenario</span>
            <h3>A simple marketplace concept for Web3 travelers</h3>
            <p>
              The target user is a traveler interested in purchasing digital travel
              experiences through a wallet-based payment flow.
            </p>
          </div>

          <div className="feature-grid">
            <article className="feature-card">
              <h4>1. Connect wallet</h4>
              <p>The user connects MetaMask to access blockchain payments.</p>
            </article>

            <article className="feature-card">
              <h4>2. Choose a package</h4>
              <p>The user selects a travel experience from the marketplace.</p>
            </article>

            <article className="feature-card">
              <h4>3. Confirm transaction</h4>
              <p>The payment is sent on Sepolia and the transaction hash is shown.</p>
            </article>
          </div>
        </section>

        <section className="section" id="packages">
          <div className="section-heading">
            <span className="section-heading__label">Marketplace</span>
            <h3>Travel Packages</h3>
            <p>Select a package and complete the purchase with your wallet.</p>
          </div>

          <div className="products-grid">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onBuy={handleBuy}
                isBuying={isBuying && selectedProductId === product.id}
                walletConnected={Boolean(account)}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}