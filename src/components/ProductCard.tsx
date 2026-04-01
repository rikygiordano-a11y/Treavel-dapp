import type { Product } from "../data/products";

type Props = {
  product: Product;
  onBuy: (product: Product) => void;
  isBuying: boolean;
  walletConnected: boolean;
};

export default function ProductCard({
  product,
  onBuy,
  isBuying,
  walletConnected,
}: Props) {
  return (
    <article className="product-card">
      <div className="product-card__image-wrapper">
        <img
          src={product.image}
          alt={product.name}
          className="product-card__image"
        />
      </div>

      <div className="product-card__content">
        <div className="product-card__top">
          <span className="product-card__tag">Travel Experience</span>
          <h4>{product.name}</h4>
        </div>

        <p className="product-card__description">
          {product.description}
        </p>

        <div className="product-card__footer">
          <div>
            <span className="product-card__price-label">Price</span>
            <p className="product-card__price">
              {product.price} ETH
            </p>
          </div>

          <button
            className="btn btn--primary"
            onClick={() => onBuy(product)}
            disabled={isBuying}
          >
            {isBuying
              ? "Processing..."
              : walletConnected
              ? "Buy Now"
              : "Connect & Buy"}
          </button>

          
          {!walletConnected && (
            <p
              style={{
                marginTop: "8px",
                fontSize: "0.85rem",
                color: "#f87171",
              }}
            >
              Please connect your wallet first
            </p>
          )}
        </div>
      </div>
    </article>
  );
}