import React, { useState } from "react";
import "./styles.css";

const CaesarCipher = () => {
  const [text, setText] = useState("");  // Input text
  const [shift, setShift] = useState(3);  // Shift for Caesar Cipher
  const [output, setOutput] = useState("");  // Output text

  // Function to encrypt text
  const encrypt = (input, shift) => {
    return input
      .split("")
      .map((char) => {
        if (char.match(/[a-z]/i)) {
          let code = char.charCodeAt(0);
          let offset = char.toUpperCase() === char ? 65 : 97;
          return String.fromCharCode(((code - offset + shift) % 26) + offset);
        }
        return char;
      })
      .join("");
  };

  // Function to decrypt text (using the same encrypt function with a reverse shift)
  const decrypt = (input, shift) => encrypt(input, 26 - shift);

  // Handle Encrypt button click
  const handleEncrypt = () => {
    setOutput(encrypt(text, shift));  // Update output state with encrypted text
  };

  // Handle Decrypt button click
  const handleDecrypt = () => {
    setOutput(decrypt(text, shift));  // Update output state with decrypted text
  };

  return (
    <div>
      <h2>Caesar Cipher</h2>
      <input
        type="text"
        placeholder="Enter text"
        value={text}
        onChange={(e) => setText(e.target.value)}  // Update state with user input
      />

      <input
        type="number"
        placeholder="Shift"
        value={shift}
        onChange={(e) => setShift(parseInt(e.target.value))}  // Update shift value
      />

      <button className="encrypt" onClick={handleEncrypt}>
        Encrypt
      </button>
      <button className="decrypt" onClick={handleDecrypt}>
        Decrypt
      </button>

      <p>Output: {output}</p>
    </div>
  );
};

export default CaesarCipher;
