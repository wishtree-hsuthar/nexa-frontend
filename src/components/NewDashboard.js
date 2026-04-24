import React, { useEffect, useState } from "react";
import {
  heavyComputation,
  generateData,
  blockMainThread,
} from "../utils/heavyTasks";
import { getUser, searchUsers } from "../services/badApi";

function BadDashboard() {
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  // memory leak (interval not cleared)
  useEffect(() => {
    setInterval(() => {
      console.log("running...");
    }, 1000);
  }, []);

  // unnecessary heavy computation on mount
  useEffect(() => {
    const d = generateData();
    setData(d);
  }, []);

  // no error handling
  useEffect(() => {
    getUser("1").then((res) => {
      setUser(res);
    });
  }, []);

  // expensive recompute every render
  const processed = heavyComputation(data);

  const handleSearch = async () => {
    const res = await searchUsers(search); // injection risk
    setResults(res.data);
  };

  return (
    <div>
      <h1>Dashboard</h1>

      <button onClick={() => setData([...data, Math.random()])}>
        Add Random
      </button>

      <button onClick={() => blockMainThread()}>
        Freeze UI
      </button>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button onClick={handleSearch}>Search</button>

      {/* bad key usage */}
      {processed.map((item, index) => (
        <div key={index}>{item}</div>
      ))}

      {/* no null safety */}
      <div>{user.name}</div>

      {/* nested render complexity */}
      {results &&
        results.map((r, i) => {
          if (r.active) {
            return <div key={i}>{r.name}</div>;
          } else {
            return <span key={i}>{r.name}</span>;
          }
        })}
    </div>
  );
}

export default BadDashboard;