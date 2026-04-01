/// <reference types="vite/client" />

import type { Eip1193Provider } from "ethers";

interface Window {
  ethereum?: Eip1193Provider & {
    on?: (event: string, listener: (...args: any[]) => void) => void;
    removeListener?: (event: string, listener: (...args: any[]) => void) => void;
  };
}