import type { Product } from "../data/products";

type Props = {
  product: Product;
  onBuy: (product: Product) => void;
};

export default function ProductCard({ product, onBuy }: Props) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "20px",
        borderRadius: "10px",
        width: "250px",
      }}
    >
      <img src={product.image} width="100%" />
      <h3>{product.name}</h3>
      <p>Prezzo: {product.price} ETH</p>

      <button onClick={() => onBuy(product)}>Acquistare</button>
    </div>
  );
}