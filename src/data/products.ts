export type Product = {
  id: string;
  name: string;
  price: string;
  image: string;
  description: string;
};

export const products = [
  {
    id: "1",
    name: "Weekend in Rome",
    description:
      "A short city-break experience designed for users who want a simple and quick Web3 travel purchase.",
    price: "0.01",
    image:
      "https://images.unsplash.com/photo-1529260830199-42c24126f198?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Sicily Escape",
    description:
      "A beach-focused package that simulates the purchase of a premium holiday experience through MetaMask.",
    price: "0.02",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "Paris Experience",
    description:
      "A demo listing for a European city trip, created to show a smooth blockchain payment flow in the app.",
    price: "0.015",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop",
  },
];