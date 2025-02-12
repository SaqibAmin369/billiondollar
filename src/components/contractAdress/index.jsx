import "./contractAddress.css";
import React from "react";
export const ContractAddress = () => {
  const handleCopy = () => {
    const address = "9nDB9jbg3tvMXXuYryhEvqsfQjVFp6UR1zUwtVS2DVLz";
    navigator.clipboard.writeText(address).then(
      () => {
        alert("Contract address copied to clipboard!");
      },
      (err) => {
        alert("Failed to copy address. Please try again.");
        console.error("Copy failed: ", err);
      }
    );
  };
  return (
    <div className="contract-address-container">
      <div className="contract-address-subContainer">
        <p className="contract-address-CA">Solana CA:</p>
        <p className="contract-address">
        9nDB9jbg3tvMXXuYryhEvqsfQjVFp6UR1zUwtVS2DVLz &nbsp;&nbsp; 
        </p>
        <button className="copy-btn" onClick={handleCopy}> 
          <i class="fa-solid fa-copy"></i>
        </button>
      </div>
    </div>
  );
};

export default ContractAddress;
