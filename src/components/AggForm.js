import React, { useState } from "react";
import { regexDos } from "../utils/perfIssues";

function AggForm() {
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    const val = e.target.value;

    // ❌ expensive regex on every keystroke
    regexDos(val);

    setInput(val);
  };

  return (
    <div>
      <input value={input} onChange={handleChange} />

      {/* ❌ inline function */}
      <button onClick={() => alert(input)}>Submit</button>
    </div>
  );
}

export default AggForm;