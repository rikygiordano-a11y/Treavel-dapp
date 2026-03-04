export type Product = {
  id: number;
  name: string;
  price: string;
  image: string;
};

export const products: Product[] = [
  {
    id: 1,
    name: "Weekend a Roma",
    price: "0.01",
    image: "https://picsum.photos/300?1",
  },
  {
    id: 2,
    name: "Vacanza in Sicilia",
    price: "0.02",
    image: "https://picsum.photos/300?2",
  },
  {
    id: 3,
    name: "Viaggio a Parigi",
    price: "0.015",
    image: "https://picsum.photos/300?3",
  },
];