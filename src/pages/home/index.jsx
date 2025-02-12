import React, { useEffect, useState } from "react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletProvider, useWallet } from "@solana/wallet-adapter-react";
import { ConnectionProvider } from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import {
  clusterApiUrl,
  Connection,
  Transaction,
  SystemProgram,
  PublicKey,
} from "@solana/web3.js";

import "./Home.css";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Grid from "../../components/grid";
import "@solana/wallet-adapter-react-ui/styles.css";

const network = WalletAdapterNetwork.Devnet;

const wallets = [new PhantomWalletAdapter()];
const Home = () => {
  useEffect(() => {
    console.log(Connection);
  }, [Connection]);

  const [remainingPixels, setRemainingPixels] = useState("1,000,000,000"); // Initialize with total pixels
  const [usedPixels, setUsedPixels] = useState(0);
  // Function to update the remaining pixels
  const handleRemainingPixelsUpdate = (newRemainingPixels , newUsedPixels) => {
    setRemainingPixels(newRemainingPixels);
    setUsedPixels(newUsedPixels);
  };

  return (
    <>
      <ConnectionProvider endpoint={clusterApiUrl(network)}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <div className="main-container">
              <Header remainingPixels={remainingPixels} usedPixels={usedPixels} />
              <Grid updatePixels={handleRemainingPixelsUpdate} />
              <Footer />
            </div>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </>
  );
};

export default Home;
