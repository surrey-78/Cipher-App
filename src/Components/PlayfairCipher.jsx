import React, { useState } from "react";

const PlayfairCipher = () => {
  const [text, setText] = useState("");
  const [key, setKey] = useState("");
  const [output, setOutput] = useState("");

  const generateMatrix = (key) => {
    key = key.toUpperCase().replace(/J/g, "I");
    let matrix = [], seen = new Set();

    let combined = (key + "ABCDEFGHIKLMNOPQRSTUVWXYZ").replace(/[^A-Z]/g, "");
    for (let char of combined) {
      if (!seen.has(char)) {
        seen.add(char);
        matrix.push(char);
      }
    }
    return Array.from({ length: 5 }, (_, i) => matrix.slice(i * 5, i * 5 + 5));
  };

  const findPosition = (matrix, letter) => {
    for (let i = 0; i < 5; i++)
      for (let j = 0; j < 5; j++)
        if (matrix[i][j] === letter) return [i, j];
  };

  const formatText = (text) => {
    text = text.toUpperCase().replace(/[^A-Z]/g, "").replace(/J/g, "I");
    let formatted = "";
    for (let i = 0; i < text.length; i += 2) {
      let pair = text[i] + (text[i + 1] || "X");
      if (pair[0] === pair[1]) pair = pair[0] + "X";
      formatted += pair;
    }
    return formatted;
  };

  const encrypt = (text, key) => {
    let matrix = generateMatrix(key);
    text = formatText(text);
    let result = "";

    for (let i = 0; i < text.length; i += 2) {
      let [r1, c1] = findPosition(matrix, text[i]);
      let [r2, c2] = findPosition(matrix, text[i + 1]);

      if (r1 === r2) {
        result += matrix[r1][(c1 + 1) % 5] + matrix[r2][(c2 + 1) % 5];
      } else if (c1 === c2) {
        result += matrix[(r1 + 1) % 5][c1] + matrix[(r2 + 1) % 5][c2];
      } else {
        result += matrix[r1][c2] + matrix[r2][c1];
      }
    }
    return result;
  };

  const decrypt = (text, key) => {
    let matrix = generateMatrix(key);
    let result = "";

    for (let i = 0; i < text.length; i += 2) {
      let [r1, c1] = findPosition(matrix, text[i]);
      let [r2, c2] = findPosition(matrix, text[i + 1]);

      if (r1 === r2) {
        result += matrix[r1][(c1 + 4) % 5] + matrix[r2][(c2 + 4) % 5];
      } else if (c1 === c2) {
        result += matrix[(r1 + 4) % 5][c1] + matrix[(r2 + 4) % 5][c2];
      } else {
        result += matrix[r1][c2] + matrix[r2][c1];
      }
    }
    return result;
  };

  return (
    <div>
      <h2>Playfair Cipher</h2>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text" />
      <input type="text" value={key} onChange={(e) => setKey(e.target.value)} placeholder="Enter key" />
      <button onClick={() => setOutput(encrypt(text, key))}>Encrypt</button>
      <button onClick={() => setOutput(decrypt(text, key))}>Decrypt</button>
      <p>Output: {output}</p>
    </div>
  );
};

export default PlayfairCipher;
