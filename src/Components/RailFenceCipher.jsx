import React, { useState } from "react";

const RailFenceCipher = () => {
  const [text, setText] = useState("");
  const [rails, setRails] = useState(3);
  const [output, setOutput] = useState("");

  const encrypt = (input, rails) => {
    let fence = Array.from({ length: rails }, () => []);
    let rail = 0, dir = 1;

    for (let char of input) {
      fence[rail].push(char);
      rail += dir;
      if (rail === 0 || rail === rails - 1) dir *= -1;
    }

    return fence.flat().join("");
  };

  const decrypt = (input, rails) => {
    let fence = Array.from({ length: rails }, () => []);
    let rail = 0, dir = 1, pos = 0;

    for (let char of input) {
      fence[rail].push(null);
      rail += dir;
      if (rail === 0 || rail === rails - 1) dir *= -1;
    }

    for (let i = 0; i < rails; i++)
      for (let j = 0; j < fence[i].length; j++) fence[i][j] = input[pos++];

    rail = 0; dir = 1; pos = 0;
    return input.split("").map(() => {
      let char = fence[rail].shift();
      rail += dir;
      if (rail === 0 || rail === rails - 1) dir *= -1;
      return char;
    }).join("");
  };

  return (
    <div>
      <h2>Rail Fence Cipher</h2>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      <input type="number" value={rails} onChange={(e) => setRails(parseInt(e.target.value))} />
      <button onClick={() => setOutput(encrypt(text, rails))}>Encrypt</button>
      <button onClick={() => setOutput(decrypt(text, rails))}>Decrypt</button>
      <p>Output: {output}</p>
    </div>
  );
};

export default RailFenceCipher;
