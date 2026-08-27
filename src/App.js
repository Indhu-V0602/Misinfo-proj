import React, { useState } from "react";
import "./App.css";
import TrustScoreBar from "./components/TrustScoreBar";
import VoteSystem from "./components/VoteSystem";
import VoteHistory from "./components/VoteHistory";

function App() {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState("");
  const [trustScore, setTrustScore] = useState(0);
  const [voteKey, setVoteKey] = useState(null);

  const checkURL = () => {
    if (!url) {
      setStatus("Unknown");
      setTrustScore(0);
      return;
    }

    let domain = "";

    try {
      const tempUrl = url.startsWith("http") ? url : `https://${url}`;
      const parsedUrl = new URL(tempUrl);
      domain = parsedUrl.hostname.replace("www.", "").toLowerCase();
    } catch (error) {
      setStatus("Unverified");
      setTrustScore(0);
      return;
    }

    const trustedDomains = [
      "bbc.com",
      "reuters.com",
      "nasa.gov",
      "cnn.com",
      "theguardian.com",
      "nytimes.com"
    ];

    let newStatus = "Unknown";
    let score = 0;

    // ✅ Exact match
    if (trustedDomains.includes(domain)) {
      newStatus = "Trusted";
      score = 85;
    } else {
      // 🔎 One-character typo detection
      const suspicious = trustedDomains.some((td) => {
        if (domain.length !== td.length) return false;

        let diff = 0;
        for (let i = 0; i < domain.length; i++) {
          if (domain[i] !== td[i]) diff++;
        }

        return diff === 1;
      });

      if (suspicious) {
        newStatus = "Unverified";
        score = 25;
      }
    }

    setStatus(newStatus);
    setTrustScore(score);

    // Save to localStorage
    const stored = JSON.parse(localStorage.getItem("checkedUrls")) || [];
    const alreadyExists = stored.some((item) => item.url === url);

    if (!alreadyExists) {
      stored.unshift({
        url,
        status: newStatus,
        score,
        timestamp: new Date().toISOString(),
      });

      localStorage.setItem("checkedUrls", JSON.stringify(stored));
    }
  };

  const handleUndoVote = (undoUrl) => {
    if (undoUrl === url) {
      setVoteKey(Date.now());
    }
  };

  return (
    <div className="app">
      <div className="floating-icons">
        <span>🔐</span>
        <span>🛡️</span>
        <span>🌐</span>
        <span>🔍</span>
        <span>⚙️</span>
        <span>📡</span>
        <span>🧠</span>
      </div>

      <div className="dashboard">
        <div className="card">
          <h1 className="title">
            🛡️ <span>VeriChain</span>
          </h1>

          <input
            type="text"
            placeholder="Paste news URL here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <button onClick={checkURL}>Check</button>

          <div className="result">
            {status === "Trusted" && <span>✅ Trusted Source</span>}
            {status === "Unverified" && (
              <span>❌ Suspicious / Possible Fake</span>
            )}
            {status === "Unknown" && (
              <span>❓ Unknown – Not yet verified</span>
            )}
          </div>

          <TrustScoreBar score={trustScore} />

          <VoteSystem key={voteKey || url} currentUrl={url} />
        </div>

        <div className="history-panel">
          <VoteHistory onUndo={handleUndoVote} />
        </div>
      </div>
    </div>
  );
}

export default App;
