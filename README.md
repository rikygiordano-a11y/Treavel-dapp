# Travel Web3 dApp

Questo progetto è una semplice applicazione web **Web3** realizzata con **React**, **TypeScript** e **Vite**.

L'obiettivo è creare una piccola applicazione di **prenotazione di viaggi** che permette all'utente di acquistare pacchetti utilizzando **Ethereum tramite MetaMask**.

Quando l'utente clicca su **"buy now "**, viene inviata una **transazione sulla blockchain Ethereum (Sepolia Testnet)** e viene mostrata la conferma del pagamento con il link alla transazione su **Etherscan**.


## Funzionalità principali

- Connessione al wallet **MetaMask**
- disconnessione del wallet
- Visualizzazione dell'indirizzo del wallet collegato
- Visualizzazione del saldo **ETH**
- Lista di pacchetti di viaggio
- Acquisto dei pacchetti tramite **transazione Ethereum**
- Messaggio di **acquisto completato**
- Gestioni errore di pagamento (Payment error)
- Controllo automatico connessione wallet
- Link alla transazione su **Etherscan**

## Tecnologie utilizzate

- React
- TypeScript
- Vite
- Ethereum
- MetaMask
- Ethers.js
- CSS

## Struttura del progetto

- `src/components` → componenti React (es. ProductCard)
- `src/hooks` → gestione della connessione al wallet (useWallet)
- `src/data` → dati dei pacchetti di viaggio
- `App.tsx` → componente principale dell'app
- `main.tsx` → avvio dell'applicazione
- `App.css` → stile dell'applicazione

## Avvio del progetto

Per avviare il progetto in locale:

npm install
npm run dev


L'app sarà disponibile su:

http://localhost:5173


## Requisiti

Per utilizzare l'app è necessario:

- avere **MetaMask installato**
- utilizzare la rete **Sepolia Testnet**
- avere **Sepolia ETH di test**

## Autore

Progetto realizzato da **Riccardo Giordano** per imparare lo sviluppo di **applicazioni Web3 con React ed Ethereum**.