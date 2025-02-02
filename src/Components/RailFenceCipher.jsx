import React, { useState } from "react";
import "./styles.css";

const RailFenceCipher = () => {
  const [text, setText] = useState("");
  const [rails, setRails] = useState();
  const [offset, setOffset] = useState();  // New state for offset
  const [output, setOutput] = useState("");
  const [grid, setGrid] = useState("");  // New state to show the grid

  // Encrypt function with offset
  const encrypt = (input, rails, offset) => {
    let fence = Array.from({ length: rails }, () => []);
    let rail = offset, dir = 1;

    for (let char of input) {
      fence[rail].push(char);
      rail += dir;
      if (rail === 0 || rail === rails - 1) dir *= -1;
    }

    // Show grid for encryption
    const gridRepresentation = fence.map((rail, index) => `Rail ${index + 1}: ${rail.join(" ")}`).join("\n");
    setGrid(gridRepresentation); // Set the grid for visualization

    return fence.flat().join("");
  };

  // Decrypt function with offset
  const decrypt = (input, rails, offset) => {
    let fence = Array.from({ length: rails }, () => []);
    let rail = offset, dir = 1, pos = 0;

    // Fill fence with placeholders
    for (let char of input) {
      fence[rail].push(null);
      rail += dir;
      if (rail === 0 || rail === rails - 1) dir *= -1;
    }

    // Fill the fence with actual characters
    for (let i = 0; i < rails; i++) {
      for (let j = 0; j < fence[i].length; j++) {
        fence[i][j] = input[pos++];
      }
    }

    // Show grid for decryption
    const gridRepresentation = fence.map((rail, index) => `Rail ${index + 1}: ${rail.join(" ")}`).join("\n");
    setGrid(gridRepresentation); // Set the grid for visualization

    // Now, read the characters out in the zig-zag pattern
    rail = offset;
    dir = 1;
    pos = 0;
    return input.split("").map(() => {
      let char = fence[rail].shift();
      rail += dir;
      if (rail === 0 || rail === rails - 1) dir *= -1;
      return char;
    }).join("");
  };

  // Handle Encrypt button click
  const handleEncrypt = () => {
    setOutput(encrypt(text, rails, offset));  // Encrypt the text with offset
  };

  // Handle Decrypt button click
  const handleDecrypt = () => {
    setOutput(decrypt(text, rails, offset));  // Decrypt the text with offset
  };

  return (
    <div>
      <h2>Rail Fence Cipher</h2>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)} // Update text state
        placeholder="Enter text"
      />
      <input
        type="number"
        value={rails}
        onChange={(e) => setRails(parseInt(e.target.value))} // Update rails state
        placeholder="Enter number of rails"
        min="2"
      />
      <input
        type="number"
        value={offset}
        onChange={(e) => setOffset(parseInt(e.target.value))} // Update offset state
        placeholder="Enter offset"
      />
      <button className="encrypt" onClick={handleEncrypt}>Encrypt</button>
      <button className="decrypt" onClick={handleDecrypt}>Decrypt</button>

      <p>Output: {output}</p>

      <h3>Grid Representation:</h3>
      <pre>{grid}</pre>
    </div>
  );
};

export default RailFenceCipher;
