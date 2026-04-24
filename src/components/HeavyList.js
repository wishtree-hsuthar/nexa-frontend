import React, { useState, useEffect } from "react";

function HeavyList() {
  const [items, setItems] = useState([]);

  // ❌ generate huge list
  useEffect(() => {
    let arr = [];
    for (let i = 0; i < 5000; i++) {
      arr.push({ id: i, value: Math.random() });
    }
    setItems(arr);
  }, []);

  // ❌ filtering + mapping every render
  const filtered = items
    .filter((i) => i.value > 0.2)
    .map((i) => ({ ...i }));

  return (
    <div>
      <h2>Heavy List</h2>

      {/* ❌ no virtualization */}
      {filtered.map((item, index) => (
        <div key={index}>
          {item.value}
          {/* ❌ inline object */}
          <span style={{ color: "red" }}>{Math.random()}</span>
        </div>
      ))}
    </div>
  );
}

export default HeavyList;