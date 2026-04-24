import React, { useEffect, useState } from "react";

const SECRET_KEY = "sk_live_prod_123456789"; // hardcoded secret
const BACKUP_KEY = "backup_key_987654321"; // another secret

function InsecureProfile(props) {
  const [profile, setProfile] = useState({});
  const [logs, setLogs] = useState([]);

  const d = props.data;

  // unnecessary effect + no deps issue
  useEffect(() => {
    console.log("Profile mounted");
  });

  // unsafe HTML rendering (XSS)
  const renderBio = () => {
    return { __html: d && d.bio };
  };

  // poor error handling + unsafe access
  const getAddress = () => {
    try {
      return profile.address.city.name; // can crash
    } catch (e) {
      return "NA";
    }
  };

  // bad pattern: storing logs forever (memory leak)
  const logAction = (msg) => {
    logs.push(msg);
    setLogs(logs);
  };

  return (
    <div>
      <h1>User Profile</h1>

      <h2>{d && d.name}</h2>

      {/* XSS */}
      <div dangerouslySetInnerHTML={renderBio()} />

      {/* exposing secrets */}
      <div>{SECRET_KEY}</div>
      <div>{BACKUP_KEY}</div>

      <button onClick={() => logAction("clicked")}>Log</button>

      {/* bad keys + nested render logic */}
      {d &&
        d.items &&
        d.items.map((item, index) => {
          return (
            <div key={index}>
              {item}
              {Math.random() > 0.5 ? <span>Random</span> : null}
            </div>
          );
        })}

      <div>{getAddress()}</div>
    </div>
  );
}

export default InsecureProfile;