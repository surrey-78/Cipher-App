import React, { useState } from "react";
import { multiply, inv, round, mod } from "mathjs";

const HillCipher = () => {
  const [text, setText] = useState("");
  const [key, setKey] = useState("3,3,2,5");
  const [output, setOutput] = useState("");

  const parseMatrix = (key) => {
    let values = key.split(",").map(Number);
    let size = Math.sqrt(values.length);
    return Array.from({ length: size }, (_, i) => values.slice(i * size, (i + 1) * size));
  };

  const modInverse = (matrix, modValue) => {
    try {
      let invMatrix = inv(matrix);
      return round(mod(invMatrix.map(row => row.map(x => mod(x, modValue))), modValue));
    } catch {
      return null;
    }
  };

  const encrypt = (text, keyMatrix) => {
    text = text.toUpperCase().replace(/[^A-Z]/g, "");
    let blockSize = keyMatrix.length;
    while (text.length % blockSize !== 0) text += "X";

    let blocks = [];
    for (let i = 0; i < text.length; i += blockSize) {
      let block = text.slice(i, i + blockSize).split("").map(char => char.charCodeAt(0) - 65);
      blocks.push(multiply(keyMatrix, block).map(num => mod(num, 26)));
    }

    return blocks.flat().map(num => String.fromCharCode(num + 65)).join("");
  };

  const decrypt = (text, keyMatrix) => {
    let inverseMatrix = modInverse(keyMatrix, 26);
    if (!inverseMatrix) return "Invalid Key (Not Invertible)";

    let blockSize = keyMatrix.length;
    let blocks = [];
    for (let i = 0; i < text.length; i += blockSize) {
      let block = text.slice(i, i + blockSize).split("").map(char => char.charCodeAt(0) - 65);
      blocks.push(multiply(inverseMatrix, block).map(num => mod(num, 26)));
    }

    return blocks.flat().map(num => String.fromCharCode(num + 65)).join("");
  };

  return (
    <div>
      <h2>Hill Cipher</h2>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text" />
      <input type="text" value={key} onChange={(e) => setKey(e.target.value)} placeholder="Matrix (comma-separated)" />
      <button onClick={() => setOutput(encrypt(text, parseMatrix(key)))}>Encrypt</button>
      <button onClick={() => setOutput(decrypt(text, parseMatrix(key)))}>Decrypt</button>
      <p>Output: {output}</p>
    </div>
  );
};

export default HillCipher;
