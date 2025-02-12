import React, { useState, useEffect, useRef, useCallback } from "react";
import "./Grid.css";
import Sidebar from "../sidebar";
import { calculateFontSize } from "../../utils/fontSize";
import { WalletProvider, useWallet } from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  clusterApiUrl,
  Connection,
  Transaction,
  SystemProgram,
  PublicKey,
} from "@solana/web3.js";
import axios from "axios";
import { log } from "@tensorflow/tfjs";
const network = WalletAdapterNetwork.Devnet;

const TOTAL_PIXELS = 1000000000;
const PIXELS_PER_BLOCK = 1000000;
function Grid({ updatePixels }) {
  const { publicKey, signTransaction } = useWallet();
  const gridRef = useRef(null);
  const fileInputRef = useRef(null); // Ref for the file input element
  const [isSelecting, setIsSelecting] = useState(false);
  const [startCoord, setStartCoord] = useState(null);
  const [endCoord, setEndCoord] = useState(null);
  const [selectedPixels, setSelectedPixels] = useState(new Set());
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("image");
  const [loading, setLoading] = useState(false); // Track loading state
  const [currentPixels, setCurrentPixels] = useState(PIXELS_PER_BLOCK);
  const [formData, setFormData] = useState({
    image: null,
    adUrl: "",
    adDescription: "",
  });
  const imageBaseUrl = "https://api.billiondollarhomepage.io/public/blocks/";
  const [textDate, setTextDate] = useState({
    customText: "",
    textUrl: "",
    backgroundColor: "#FFFFFF",
    textColor: "#000000",
  });
  const [placedAds, setPlacedAds] = useState([]);
  const [selectionDimensions, setSelectionDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [solPrice, setSolPrice] = useState(null);

  const unlockNextPixels = useCallback(() => {
    setCurrentPixels((prev) => {
      if (prev + PIXELS_PER_BLOCK <= TOTAL_PIXELS) {
        return prev + PIXELS_PER_BLOCK; // Unlock next 1M pixels only when fully sold
      }
      return prev; // Do nothing if max is reached
    });
  }, []);

  const handlePostAd = async () => {
    try {
      if (!startCoord || !endCoord) {
        alert("Please select an area on the grid before posting an ad.");
        return false;
      }
      if (activeTab === "image") {
        if (!formData.image) {
          alert("Please upload an image before placing the advertisement.");
          return false;
        }
        if (!formData.adUrl) {
          alert("Please Add Website Url placing the advertisement.");
          return false;
        }
      }

      // Start loading
      setLoading(true);
      const payment = await sendSol();
      if (!payment) {
        setLoading(true);
        alert("Failed to post ad. Please try again.");

        return false;
      }

      const fd = new FormData();
      fd.append("walletAddress", publicKey?.toBase58() || ""); // Use publicKey from the wallet
      fd.append("startCoord", `(${startCoord.x},${startCoord.y})`);
      fd.append("endCoord", `(${endCoord.x},${endCoord.y})`);

      if (activeTab === "image" && formData.image) {
        fd.append("file", formData.image);
        fd.append("addUrl", formData.adUrl);
        fd.append("addDescription", formData.adDescription);
      }

      if (activeTab === "text") {
        fd.append("customText", textDate.customText);
        fd.append("textUrl", textDate.textUrl);
        fd.append("backgroundColor", textDate.backgroundColor);
        fd.append("textColor", textDate.textColor);
      }

      axios.defaults.baseURL = "https://api.billiondollarhomepage.io/";

      // Send POST request
      const response = await axios.post("/api/blocks/add", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Ad posted successfully:", response.data);
      alert("Ad posted successfully!");

      // Refetch grid data
      fetchAds();

      // ✅ Check if the next batch should unlock
      calculatePixels();

      // Clear the form and selection
      setFormData({ image: null, adUrl: "", adDescription: "" });
      setTextDate({
        customText: "",
        textUrl: "",
        backgroundColor: "#FFFFFF",
        textColor: "#000000",
      });
      clearSelection();
    } catch (error) {
      console.error("Error posting ad:", error);
      alert("Failed to post ad. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchAds = useCallback(async () => {
    try {
      axios.defaults.baseURL = "https://api.billiondollarhomepage.io/";
      const response = await axios.get("/api/blocks");
      const ads = response.data;

      const formattedAds = ads.map((ad) => {
        const extractCoords = (coord) => {
          const match = coord.match(/\((\d+),\s*(\d+)\)/);
          return match ? [parseInt(match[1]), parseInt(match[2])] : [0, 0];
        };

        const [startX, startY] = extractCoords(ad.startCoord);
        const [endX, endY] = extractCoords(ad.endCoord);

        return {
          type: ad.image ? "image" : "text",
          coordinates: {
            minX: startX * 10,
            minY: startY * 10,
            width: (endX - startX + 1) * 10,
            height: (endY - startY + 1) * 10,
          },
          ...(ad.image
            ? {
                image: imageBaseUrl + ad.image,
                adUrl: ad.addUrl,
                adDescription: ad.addDescription,
              }
            : {
                customText: ad.customText,
                textUrl: ad.textUrl,
                backgroundColor: ad.backgroundColor || "#000",
                textColor: ad.textColor || "#fff",
              }),
        };
      });

      setPlacedAds(formattedAds);
    } catch (error) {
      console.error("Error fetching ads:", error);
    }
  }, []);

  useEffect(() => {
    fetchAds();
  }, [fetchAds]);

  const sendSol = useCallback(async () => {
    try {
      if (!publicKey) {
        console.log("Wallet not connected!");
        return false;
      }

      console.log("Creating transaction...");

      // Replace with your recipient address
      const recipientAddress = "5pZvGUtt2euBs8tTtgfnnHWkkoaDSEkVqCErzzTR5Exj";
      const connection = new Connection(clusterApiUrl(network));
      const price = selectedPixels.size * 0.004;
      console.log(price, "price");
      // Create transaction
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(recipientAddress),
          lamports: Math.round(1000000000 * price), // 1 SOL
        })
      );

      console.log("Getting recent blockhash...");
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;

      console.log("Signing transaction...");
      const signedTransaction = await signTransaction(transaction);

      console.log("Sending transaction...");
      const signature = await connection.sendRawTransaction(
        signedTransaction.serialize()
      );

      console.log(`Transaction sent! Signature: ${signature}`);

      // Confirm transaction
      await connection.confirmTransaction(signature);
      console.log("Transaction confirmed!");
      return true;
    } catch (error) {
      console.error(error.message);
      return false;
    }
  }, [publicKey, signTransaction, selectedPixels]);
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const existingPixels = grid.childNodes.length; // ✅ Prevents replacing all pixels

    if (existingPixels >= currentPixels) return; // ✅ Only add missing pixels

    const fragment = document.createDocumentFragment();
    for (let i = existingPixels; i < currentPixels / 10; i++) {
      const pixel = document.createElement("div");
      pixel.className = "pixel";
      pixel.dataset.x = i % 100;
      pixel.dataset.y = Math.floor(i / 100);
      fragment.appendChild(pixel);
    }
    grid.appendChild(fragment);
  }, [currentPixels]);

  //new logic to prevent selection
  const handleMouseDown = (e) => {
    const rect = gridRef.current.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / 10);
    const y = Math.floor((e.clientY - rect.top) / 10);

    // Check if the clicked pixel is part of an existing ad
    const clickedAd = placedAds.find(
      (ad) =>
        x >= ad.coordinates.minX / 10 &&
        x <= (ad.coordinates.minX + ad.coordinates.width - 10) / 10 &&
        y >= ad.coordinates.minY / 10 &&
        y <= (ad.coordinates.minY + ad.coordinates.height - 10) / 10
    );

    if (clickedAd) {
      window.open(
        clickedAd.type === "image" ? clickedAd.adUrl : clickedAd.textUrl,
        "_blank"
      );
      return;
    }

    clearSelection();
    setIsSelecting(true);

    setStartCoord({ x, y });
    setEndCoord({ x, y });

    if (selectedPixels.size === 1 && selectedPixels.has(`${x},${y}`)) {
      clearSelection();
    } else {
      setSelectedPixels(new Set([`${x},${y}`]));
    }
  };

  const handleMouseMove = (e) => {
    if (!isSelecting) return;

    const rect = gridRef.current.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / 10);
    const y = Math.floor((e.clientY - rect.top) / 10);
    setEndCoord({ x, y });
    updateSelectionDisplay();
  };

  const handleMouseUp = () => {
    setIsSelecting(false);
    updateSelectionDisplay();

    if (startCoord && endCoord) {
      // Combine selected blocks in one block
      const minX = Math.min(startCoord.x, endCoord.x);
      const maxX = Math.max(startCoord.x, endCoord.x);
      const minY = Math.min(startCoord.y, endCoord.y);
      const maxY = Math.max(startCoord.y, endCoord.y);

      // Create a new combined block
      const combinedBlock = {
        minX: minX * 10,
        minY: minY * 10,
        width: (maxX - minX + 1) * 10,
        height: (maxY - minY + 1) * 10,
      };

      const grid = gridRef.current;

      // Remove any existing combined block
      const existingBlock = document.querySelector(".combined-block");
      if (existingBlock) {
        grid.removeChild(existingBlock);
      }
      // Calculate dynamic font size

      const fontSize = calculateFontSize(
        combinedBlock.width,
        combinedBlock.height
      );

      // Create and append the new combined block
      const block = document.createElement("div");
      block.className = "combined-block"; // Assign a class for the combined block
      block.style.position = "absolute";
      block.style.left = `${combinedBlock.minX}px`;
      block.style.top = `${combinedBlock.minY}px`;
      block.style.width = `${combinedBlock.width}px`;
      block.style.height = `${combinedBlock.height}px`;
      block.style.backgroundColor = "gray";
      block.style.display = "flex";
      block.style.alignItems = "center";
      block.style.justifyContent = "center";
      block.style.color = "white";
      block.style.fontSize = `${fontSize}px`;
      block.style.textAlign = "center";
      block.style.padding = "2px";
      block.innerHTML = `${selectionDimensions.width * 10} X ${
        selectionDimensions.height * 10
      }\n Your Logo Here`;

      grid.appendChild(block);
    }

    setSidebarVisible(true);
  };

  const updateSelectionDisplay = useCallback(() => {
    if (!startCoord || !endCoord) return;

    const minX = Math.min(startCoord.x, endCoord.x);
    const maxX = Math.max(startCoord.x, endCoord.x);
    const minY = Math.min(startCoord.y, endCoord.y);
    const maxY = Math.max(startCoord.y, endCoord.y);

    // Check for overlap with placed ads
    for (const ad of placedAds) {
      const adMinX = ad.coordinates.minX / 10;
      const adMinY = ad.coordinates.minY / 10;
      const adMaxX = (ad.coordinates.minX + ad.coordinates.width - 10) / 10;
      const adMaxY = (ad.coordinates.minY + ad.coordinates.height - 10) / 10;

      // Detect overlap using boundary comparison
      const isOverlap = !(
        maxX < adMinX ||
        minX > adMaxX ||
        maxY < adMinY ||
        minY > adMaxY
      );
      if (isOverlap) {
        alert(
          "Selection overlaps with an already placed ad. Try another area."
        );
        clearSelection();
        return;
      }
    }

    // If no overlap, calculate and highlight the selection
    const newSelection = new Set();
    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        newSelection.add(`${x},${y}`);
      }
    }

    // Clear previous selection
    selectedPixels.forEach((coord) => {
      const pixel = document.querySelector(
        `.pixel[data-x="${coord.split(",")[0]}"][data-y="${
          coord.split(",")[1]
        }"]`
      );
      if (pixel) pixel.classList.remove("selected");
    });

    // Apply new selection
    newSelection.forEach((coord) => {
      const pixel = document.querySelector(
        `.pixel[data-x="${coord.split(",")[0]}"][data-y="${
          coord.split(",")[1]
        }"]`
      );
      if (pixel) pixel.classList.add("selected");
    });

    setSelectedPixels(newSelection);

    const totalWidth = maxX - minX + 1; // Each block is 10px
    const totalHeight = maxY - minY + 1;
    setSelectionDimensions({ width: totalWidth, height: totalHeight });
  }, [startCoord, endCoord, selectedPixels, placedAds]);

  const clearSelection = () => {
    selectedPixels.forEach((coord) => {
      const pixel = document.querySelector(
        `.pixel[data-x="${coord.split(",")[0]}"][data-y="${
          coord.split(",")[1]
        }"]`
      );
      if (pixel) pixel.classList.remove("selected");
    });

    setSelectedPixels(new Set());
    setStartCoord(null);
    setEndCoord(null);
    setSidebarVisible(false);
  };

  const placeAd = async () => {
    if (activeTab === "image") {
      if (!formData.image || !formData.adUrl || !formData.adDescription) {
        alert("Please fill all fields and select an image");
        return;
      }
    }
    if (activeTab === "text") {
      if (!textDate.customText || !textDate.textUrl) {
        alert("Please fill all fields and Custom text");
        return;
      }
    }

    if (selectedPixels.size === 0) {
      alert("Please select an area for the advertisement");
      return;
    }
    const payment = await sendSol();
    const coordinates = Array.from(selectedPixels).map((coord) =>
      coord.split(",").map(Number)
    );
    const minX = Math.min(...coordinates.map(([x]) => x)) * 10;
    const minY = Math.min(...coordinates.map(([, y]) => y)) * 10;
    const maxX = Math.max(...coordinates.map(([x]) => x)) * 10;
    const maxY = Math.max(...coordinates.map(([, y]) => y)) * 10;
    const width = maxX - minX + 10;
    const height = maxY - minY + 10;

    const ad = {
      type: activeTab,
      ...(activeTab === "image"
        ? {
            image: formData.image,
            adUrl: formData.adUrl,
            adDescription: formData.adDescription,
          }
        : {
            customText: textDate.customText,
            textUrl: textDate.textUrl,
            backgroundColor: textDate.backgroundColor,
            textColor: textDate.textColor,
          }),
      coordinates: { minX, minY, width, height },
    };

    setPlacedAds([...placedAds, ad]);

    // Clear the form
    setFormData({ image: null, adUrl: "", adDescription: "" });
    setTextDate({
      customText: "",
      textUrl: "",
      backgroundColor: "#FFFFFF",
      textColor: "#000000",
    });

    // Reset the file input field
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }

    clearSelection();
    const grid = gridRef.current;
    const existingBlock = document.querySelector(".combined-block");
    if (existingBlock) {
      grid.removeChild(existingBlock);
    }
  };
  const calculatePixels = useCallback(() => {
    let occupiedPixels = 0;

    placedAds.forEach((ad) => {
      occupiedPixels += ad.coordinates.width * ad.coordinates.height;
    });

    const soldPixels = occupiedPixels;
    const remainingPixels = TOTAL_PIXELS - soldPixels;

    updatePixels(remainingPixels, soldPixels);

    if (soldPixels >= currentPixels) {
      console.log(
        `✔️ All ${currentPixels} pixels sold! Unlocking next batch...`
      );
      unlockNextPixels();
    }
  }, [placedAds, currentPixels, unlockNextPixels]);

  useEffect(() => {
    calculatePixels();
  }, [placedAds]);
  useEffect(() => {
    const fetchSolPrice = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd"
        );
        setSolPrice(response.data.solana.usd);
      } catch (error) {
        console.error("Error fetching SOL price:", error);
      }
    };

    fetchSolPrice();
  }, []);

  const totalUsd = selectedPixels.size * 100;
  // total usd in Solona
  const totalSolana = solPrice
    ? (totalUsd / solPrice).toFixed(4)
    : "Loading...";

  return (
    <div className="main-container">
      <div className="scroll-container">
        <div
          className="container"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <div ref={gridRef} className="grid">
            {placedAds.map((ad, index) => (
              <div
                key={index}
                style={{
                  position: "absolute",
                  left: ad.coordinates.minX,
                  top: ad.coordinates.minY,
                  width: ad.coordinates.width,
                  height: ad.coordinates.height,
                  ...(ad.type === "image"
                    ? {
                        backgroundImage: `url(${ad.image})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                      }
                    : {
                        backgroundColor: ad.backgroundColor,
                        color: ad.textColor,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "12px",
                        textAlign: "center",
                      }),
                  cursor: "pointer",
                }}
                title={ad.type === "image" ? ad.adDescription : ad.customText}
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(
                    ad.type === "image" ? ad.adUrl : ad.textUrl,
                    "_blank"
                  );
                }}
              >
                {ad.type === "text" && ad.customText}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Sidebar
        sidebarVisible={sidebarVisible}
        formData={formData}
        setFormData={setFormData}
        clearSelection={clearSelection}
        selectedPixels={selectedPixels}
        startCoord={startCoord}
        endCoord={endCoord}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        textDate={textDate}
        setTextDate={setTextDate}
        selectionDimensions={selectionDimensions}
        fileInputRef={fileInputRef}
        handlePostAd={handlePostAd}
        loading={loading}
        totalSolana={totalSolana}
      />
    </div>
  );
}

export default Grid;
