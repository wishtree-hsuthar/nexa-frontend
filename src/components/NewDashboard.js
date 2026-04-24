import React, { useEffect, useState } from "react";
import {
  heavyComputation,
  generateData,
  blockMainThread,
} from "../utils/perfIssues";
import { getUser, searchUsers } from "../services/badApi";

function NewDashboard() {
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  // ❌ memory leak + unnecessary interval
  useEffect(() => {
    setInterval(() => {
      console.log("tick");
    }, 500);
  }, []);

  // ❌ over-fetching (runs every render)
  useEffect(() => {
    getUser("1").then((res) => setUser(res));
  });

  // ❌ generate large dataset
  useEffect(() => {
    const d = generateData();
    setData(d);
  }, []);

  // ❌ infinite loop
  useEffect(() => {
    if (data.length > 0) {
      setData([...data]);
    }
  }, [data]);

  // ❌ expensive recompute every render
  const processed = heavyComputation(data);

  // ❌ unthrottled API calls
  const handleSearch = async (value) => {
    setSearch(value);
    const res = await searchUsers(value);
    setResults(res.data);
  };

  // ❌ sorting mutates state
  const sorted = data.sort((a, b) => a.value - b.value);

  return (
    <div>
      <h1>Dashboard</h1>

      {/* ❌ inline fn */}
      <button onClick={() => setData([...data, Math.random()])}>
        Add
      </button>

      <button onClick={() => blockMainThread()}>
        Freeze UI
      </button>

      <input
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
      />

      {/* ❌ large list rendering */}
      {sorted.map((item, index) => (
        <div key={index}>{item.value}</div>
      ))}

      {/* ❌ unsafe access */}
      <div>{user.name}</div>

      {/* ❌ nested render + bad keys */}
      {processed.map((x, i) => {
        if (x > 0.5) {
          return <div key={i}>{x}</div>;
        } else {
          return <span key={i}>{x}</span>;
        }
      })}
    </div>
  );
}

export default NewDashboard;