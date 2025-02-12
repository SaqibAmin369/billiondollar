import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import * as nsfwjs from "nsfwjs"; // Import NSFW detection library
import * as tf from "@tensorflow/tfjs"; // Import TensorFlow.js
import solanaLogo from "../../assets/solana.png";

function Sidebar({
  sidebarVisible,
  formData,
  setFormData,
  clearSelection,
  selectedPixels,
  activeTab,
  setActiveTab,
  textDate,
  setTextDate,
  fileInputRef,
  handlePostAd,
  loading,
  totalSolana,
}) {
  const [connection, setConnection] = useState(false);
  const { connected } = useWallet();
  useEffect(() => setConnection(connected), [connected]);

  const [tempImage, setTempImage] = useState(null);
  const [nsfwLoading, setNsfwLoading] = useState(false);

  // 🔹 NSFW Image Check Function
  const checkNSFW = async (file) => {
    if (!file) return;
    setNsfwLoading(true); // Show loading state

    const reader = new FileReader();
    reader.onload = async (e) => {
      const img = new Image();
      img.src = e.target.result;

      img.onload = async () => {
        try {
          const model = await nsfwjs.load(); // Load NSFW model
          const predictions = await model.classify(img); // Analyze image

          console.log(predictions); // Debugging: see classification results

          // Extract probabilities for Hentai and Porn
          const pornConfidence =
            predictions.find((pred) => pred.className === "Porn")
              ?.probability || 0;
          const hentaiConfidence =
            predictions.find((pred) => pred.className === "Hentai")
              ?.probability || 0;

          // Convert to percentage
          const pornPercentage = pornConfidence * 100;
          const hentaiPercentage = hentaiConfidence * 100;

          console.log(`🔍 Detection Results: 
            Porn: ${pornPercentage.toFixed(2)}%, 
            Hentai: ${hentaiPercentage.toFixed(2)}%`);

          // Reject only if Hentai or Porn is above 80%
          if (pornPercentage > 90 || hentaiPercentage > 90) {
            alert(
              "⚠️ NSFW content detected (Hentai or Porn > 70%)! The image cannot be uploaded."
            );
          } else {
            // Acceptable content
            setTempImage(URL.createObjectURL(file)); // Set preview image
            setFormData({ ...formData, image: file }); // Allow safe images
          }
        } catch (error) {
          console.error("NSFW Detection Error:", error);
          alert(
            "❌ An error occurred during NSFW detection. Please try again."
          );
        }
        setNsfwLoading(false); // Hide loading state
      };
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="sidebar" style={{ right: sidebarVisible ? "0" : "-320px" }}>
      <div className="sidebar-title">
        <h3>
          Purchase <span>{selectedPixels.size}</span> Blocks
        </h3>
        <h3 className="close-icon" onClick={clearSelection}>
          x
        </h3>
      </div>

      <div className="total-pixels-container">
        <p className="total-blocks-pixels">
          <span>{selectedPixels.size}</span> Block (
          <span>{selectedPixels.size * 100}</span> Pixels) ={" "}
          {selectedPixels.size * 100}$
        </p>
        <p className="block-price">Rate: 1 Pixel = 1$</p>
        <p className="solana-price">
          Price in Solana = {totalSolana}{" "}
          <img src={solanaLogo} alt="logo" width="12px" />
        </p>
      </div>

      <div>
        <button
          className={`${activeTab === "image" ? "active" : "tabs"} image`}
          onClick={() => setActiveTab("image")}
        >
          Image
        </button>
        <button
          className={`${activeTab === "text" ? "active" : "tabs"} text`}
          onClick={() => setActiveTab("text")}
        >
          Text
        </button>
      </div>

      {activeTab === "image" ? (
        <div className="image-advertisement-container">
          <div className="upload-advertisment">
            <label className="upload-image">
              {formData.image ? (
                <div className="image-preview-container">
                  <img
                    src={tempImage}
                    alt="Preview"
                    className="image-preview"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "200px",
                      borderRadius: "8px",
                      marginBottom: "10px",
                    }}
                  />
                </div>
              ) : (
                <div style={{ padding: "40px 20px" }}>
                  <p>{nsfwLoading ? "Scanning image..." : "Upload Image"}</p>
                  <p>(PNG, JPG, GIF)</p>
                </div>
              )}
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => checkNSFW(e.target.files[0])}
              />
            </label>
          </div>

          <input
            type="text"
            placeholder="Tooltip Description"
            value={formData.adDescription}
            onChange={(e) =>
              setFormData({ ...formData, adDescription: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Website URL"
            value={formData.adUrl}
            onChange={(e) =>
              setFormData({ ...formData, adUrl: e.target.value })
            }
          />
        </div>
      ) : (
        <div className="text-advertisement-container">
          <input
            type="text"
            placeholder="Custom Text"
            value={textDate.customText}
            onChange={(e) =>
              setTextDate({ ...textDate, customText: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Website URL"
            value={textDate.textUrl}
            onChange={(e) =>
              setTextDate({ ...textDate, textUrl: e.target.value })
            }
          />
          <div className="color-container">
            <p>{textDate.backgroundColor}</p>
            <input
              type="color"
              className="custom-color"
              value={textDate.backgroundColor}
              onChange={(e) =>
                setTextDate({ ...textDate, backgroundColor: e.target.value })
              }
            />
          </div>
          <div className="color-container">
            <p>{textDate.textColor}</p>
            <input
              type="color"
              value={textDate.textColor}
              className="custom-color"
              onChange={(e) =>
                setTextDate({ ...textDate, textColor: e.target.value })
              }
            />
          </div>
        </div>
      )}

      <div className="advertisement-buttons">
        <WalletMultiButton className="place-advertisement-button" />
        {connection && (
          <button onClick={handlePostAd} className="place-advertisement-button">
            {loading ? "Placing..." : "Place Advertisement"}
          </button>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
