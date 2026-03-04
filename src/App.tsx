import { useState } from "react"
import { ethers } from "ethers"
import { useWallet } from "./hooks/useWallet"
import { products } from "./data/products"
import type { Product } from "./data/products"
import ProductCard from "./components/ProductCard"

const RICCARDO_ADDRESS = "0x9fcdd2b3e73de06357af949d330b7bdb7ecfcdd2"

export default function App() {

  const { account, balance, connectWallet } = useWallet()

  const [success, setSuccess] = useState(false)
  const [txHash, setTxHash] = useState<string | null>(null)

  const handleBuy = async (product: Product) => {

    try {

      if (!window.ethereum) {
        alert("Installa MetaMask")
        return
      }

      if (!account) {
        await connectWallet()
      }

      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()

      const tx = await signer.sendTransaction({
        to: RICCARDO_ADDRESS,
        value: ethers.parseEther(product.price),
      })

      await tx.wait()

      setTxHash(tx.hash)
      setSuccess(true)

    } catch (err) {

      console.error("Errore transazione:", err)
      alert("Errore durante il pagamento")

    }

  }

  if (success) {

    return (

      <div style={{ padding: "40px" }}>

        <h1>✅ Acquisto completato!</h1>

        <p>Pagamento inviato al wallet di Riccardo</p>

      {txHash && (
  <p>
    Transazione: 
    <a
      href={`https://sepolia.etherscan.io/tx/${txHash}`}
      target="_blank"
      rel="noreferrer"
    >
      Visualizza su Etherscan
    </a>
  </p>
)}
            TR

        <button
          onClick={() => {
            setSuccess(false)
            setTxHash(null)
          }}
        >
          Torna ai pacchetti
        </button>

      </div>

    )

  }

  return (

    <div style={{ padding: "40px" }}>

      <h1>Travel Web3 dApp</h1>

      {!account ? (

        <button onClick={connectWallet}>
          Connect Wallet
        </button>

      ) : (

        <div>

          <p>
            <b>Portafoglio:</b> {account}
          </p>

          <p>
            <b>Saldo:</b> {balance} ETH
          </p>

        </div>

      )}

      <h2>Pacchetti di viaggio</h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >

        {products.map((product) => (

          <ProductCard
            key={product.id}
            product={product}
            onBuy={handleBuy}
          />

        ))}

      </div>

    </div>

  )

}