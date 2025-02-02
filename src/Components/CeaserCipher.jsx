import React, { useState } from "react";

const CaesarCipher = () => {
  const [text, setText] = useState("");
  const [shift, setShift] = useState(3);
  const [output, setOutput] = useState("");

  const encrypt = (input, shift) => {
    return input
      .split("")
      .map(char => {
        if (char.match(/[a-z]/i)) {
          let code = char.charCodeAt(0);
          let offset = char.toUpperCase() === char ? 65 : 97;
          return String.fromCharCode(((code - offset + shift) % 26) + offset);
        }
        return char;
      })
      .join("");
  };

  const decrypt = (input, shift) => encrypt(input, 26 - shift);

  return (
    <div>
      <h2>Caesar Cipher</h2>
      <input
        type="text"
        placeholder="Enter text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input
        type="number"
        placeholder="Shift"
        value={shift}
        onChange={(e) => setShift(parseInt(e.target.value))}
      />
      <button onClick={() => setOutput(encrypt(text, shift))}>Encrypt</button>
      <button onClick={() => setOutput(decrypt(text, shift))}>Decrypt</button>
      <p>Output: {output}</p>
    </div>
  );
};

export default CaesarCipher;
