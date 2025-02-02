import React, { useState } from "react";
import { multiply, inv, round, mod } from "mathjs";
import "./styles.css";

const HillCipher = () => {
  const [text, setText] = useState("");
  const [key, setKey] = useState("3,3,2,5");  // Default 2x2 matrix as a string
  const [output, setOutput] = useState("");

  // Function to parse the key matrix into a 2D array
  const parseMatrix = (key) => {
    let values = key.split(",").map(Number);
    let size = Math.sqrt(values.length);
    return Array.from({ length: size }, (_, i) => values.slice(i * size, (i + 1) * size));
  };

  // Function to calculate the modular inverse of a matrix
  const modInverse = (matrix, modValue) => {
    try {
      let invMatrix = inv(matrix);
      return round(mod(invMatrix.map(row => row.map(x => mod(x, modValue))), modValue));
    } catch {
      return null;  // In case the matrix is not invertible
    }
  };

  // Encryption function
  const encrypt = (text, keyMatrix) => {
    text = text.toUpperCase().replace(/[^A-Z]/g, "");  // Remove non-alphabetical characters and convert to uppercase
    let blockSize = keyMatrix.length;
    while (text.length % blockSize !== 0) text += "X";  // Pad the text with 'X' if necessary

    let blocks = [];
    for (let i = 0; i < text.length; i += blockSize) {
      let block = text.slice(i, i + blockSize).split("").map(char => char.charCodeAt(0) - 65);  // Convert characters to numbers (0-25)
      blocks.push(multiply(keyMatrix, block).map(num => mod(num, 26)));  // Matrix multiplication and mod 26
    }

    return blocks.flat().map(num => String.fromCharCode(num + 65)).join("");  // Convert back to letters
  };

  // Decryption function
  const decrypt = (text, keyMatrix) => {
    let inverseMatrix = modInverse(keyMatrix, 26);
    if (!inverseMatrix) return "Invalid Key (Not Invertible)";  // Check if the matrix is invertible

    let blockSize = keyMatrix.length;
    let blocks = [];
    for (let i = 0; i < text.length; i += blockSize) {
      let block = text.slice(i, i + blockSize).split("").map(char => char.charCodeAt(0) - 65);  // Convert characters to numbers (0-25)
      blocks.push(multiply(inverseMatrix, block).map(num => mod(num, 26)));  // Matrix multiplication with inverse and mod 26
    }

    return blocks.flat().map(num => String.fromCharCode(num + 65)).join("");  // Convert back to letters
  };

  // Handle Encrypt button click
  const handleEncrypt = () => {
    const keyMatrix = parseMatrix(key);
    setOutput(encrypt(text, keyMatrix));  // Set the output to encrypted text
  };

  // Handle Decrypt button click
  const handleDecrypt = () => {
    const keyMatrix = parseMatrix(key);
    setOutput(decrypt(text, keyMatrix));  // Set the output to decrypted text
  };

  return (
    <div>
      <h2>Hill Cipher</h2>
      {/* Input for text */}
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}  // Update text state
        placeholder="Enter text"
      />

      {/* Input for key (matrix as comma-separated values) */}
      <input
        type="text"
        value={key}
        onChange={(e) => setKey(e.target.value)}  // Update key state
        placeholder="Matrix (comma-separated)"
      />

      {/* Buttons */}
      <button className="encrypt" onClick={handleEncrypt}>
        Encrypt
      </button>
      <button className="decrypt" onClick={handleDecrypt}>
        Decrypt
      </button>

      {/* Output */}
      <p>Output: {output}</p>
    </div>
  );
};

export default HillCipher;
