import React, { useState } from "react";

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

  return (
    <div>
      <h2>Vigenère Cipher</h2>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Text"/>
      <input type="text" value={key} onChange={(e) => setKey(e.target.value)} placeholder="Key"/>
      <button onClick={() => setOutput(encrypt(text, key))}>Encrypt</button>
      <button onClick={() => setOutput(decrypt(text, key))}>Decrypt</button>
      <p>Output: {output}</p>
    </div>
  );
};

export default VigenereCipher;
