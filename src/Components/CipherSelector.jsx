import React, { useState } from "react";
import CaesarCipher from "./CeaserCipher";
import RailFenceCipher from "./RailfenceCipher";
import VigenereCipher from "./VigenereCipher";
import PlayfairCipher from "./PlayFairCipher";

const CipherSelector = () => {
  const [selectedCipher, setSelectedCipher] = useState("Caesar");

  const renderCipherComponent = () => {
    switch (selectedCipher) {
      case "Caesar": return <CaesarCipher />;
      case "Rail Fence": return <RailFenceCipher />;
      case "Vigenere": return <VigenereCipher />;
      case "Playfair": return <PlayfairCipher />;
      default: return <p>Select a cipher.</p>;
    }
  };

  return (
    <div className="container">
      <h1>Cipher Encryption & Decryption</h1>
      <select value={selectedCipher} onChange={(e) => setSelectedCipher(e.target.value)}>
        <option value="Caesar">Caesar Cipher</option>
        <option value="Rail Fence">Rail Fence Cipher</option>
        <option value="Vigenere">Vigenère Cipher</option>
        <option value="Playfair">Playfair Cipher</option>
      </select>
      {renderCipherComponent()}
    </div>
  );
};

export default CipherSelector;
