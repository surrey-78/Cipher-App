import React, { useState } from "react";
import "./styles.css";

const VigenereCipher = () => {
  const [text, setText] = useState("");
  const [key, setKey] = useState("");
  const [output, setOutput] = useState("");

  const encrypt = (input, key) => {
    let result = "";
    key = key.toUpperCase();
    let keyIndex = 0;

    for (let char of input) {
      if (char.match(/[a-z]/i)) {
        let shift = key.charCodeAt(keyIndex % key.length) - 65;
        let offset = char.toUpperCase() === char ? 65 : 97;
        result += String.fromCharCode(((char.charCodeAt(0) - offset + shift) % 26) + offset);
        keyIndex++;
      } else {
        result += char;
      }
    }
    return result;
  };

  const decrypt = (input, key) => {
    let result = "";
    key = key.toUpperCase();
    let keyIndex = 0;

    for (let char of input) {
      if (char.match(/[a-z]/i)) {
        let shift = key.charCodeAt(keyIndex % key.length) - 65;
        let offset = char.toUpperCase() === char ? 65 : 97;
        result += String.fromCharCode(((char.charCodeAt(0) - offset - shift + 26) % 26) + offset);
        keyIndex++;
      } else {
        result += char;
      }
    }
    return result;
  };

  // Handle Encrypt button click
  const handleEncrypt = () => {
    if (key) {
      setOutput(encrypt(text, key)); // Encrypt the text and set the output
    } else {
      setOutput("Please enter a key.");
    }
  };

  // Handle Decrypt button click
  const handleDecrypt = () => {
    if (key) {
      setOutput(decrypt(text, key)); // Decrypt the text and set the output
    } else {
      setOutput("Please enter a key.");
    }
  };

  return (
    <div>
      <h2>Vigenère Cipher</h2>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)} // Update text state
        placeholder="Text"
      />
      <input
        type="text"
        value={key}
        onChange={(e) => setKey(e.target.value)} // Update key state
        placeholder="Key"
      />
      <button className="encrypt" onClick={handleEncrypt}>Encrypt</button>
      <button className="decrypt" onClick={handleDecrypt}>Decrypt</button>

      <p>Output: {output}</p>
    </div>
  );
};

export default VigenereCipher;
