import React, { useState, useEffect } from "react";

function VoteSystem({ currentUrl }) {
  const [votes, setVotes] = useState({ up: 0, down: 0 });
  const [hasVoted, setHasVoted] = useState(false);
  const [userVote, setUserVote] = useState(null);

  useEffect(() => {
    const savedVotes = JSON.parse(localStorage.getItem("votes") || "{}");

    let upCount = 0;
    let downCount = 0;

    Object.values(savedVotes).forEach((vote) => {
      if (vote === "up") upCount++;
      if (vote === "down") downCount++;
    });

    setVotes({ up: upCount, down: downCount });

    if (currentUrl && savedVotes[currentUrl]) {
      setHasVoted(true);
      setUserVote(savedVotes[currentUrl]);
    } else {
      setHasVoted(false);
      setUserVote(null);
    }
  }, [currentUrl]);

  const saveVote = (type) => {
    if (!currentUrl) return;

    const savedVotes = JSON.parse(localStorage.getItem("votes") || {});
    if (savedVotes[currentUrl]) return;

    savedVotes[currentUrl] = type;
    localStorage.setItem("votes", JSON.stringify(savedVotes));

    setHasVoted(true);
    setUserVote(type);

    setVotes((prev) => ({
      up: type === "up" ? prev.up + 1 : prev.up,
      down: type === "down" ? prev.down + 1 : prev.down,
    }));

    // Save history ONLY for VoteHistory component
    const history = JSON.parse(localStorage.getItem("voteHistory")) || [];
    history.push({ url: currentUrl, vote: type });
    localStorage.setItem("voteHistory", JSON.stringify(history));
  };

  return (
    <div style={containerStyle}>
      <div style={voteButtonRow}>
        <button
          onClick={() => saveVote("up")}
          disabled={hasVoted}
          style={{
            ...buttonStyle,
            ...(userVote === "up" ? activeUpvoteStyle : {}),
          }}
        >
          👍 <span style={upvoteText}>Upvote</span>
          <span style={countStyle}>{votes.up}</span>
        </button>

        <button
          onClick={() => saveVote("down")}
          disabled={hasVoted}
          style={{
            ...buttonStyle,
            ...(userVote === "down" ? activeDownvoteStyle : {}),
          }}
        >
          👎 <span style={downvoteText}>Downvote</span>
          <span style={countStyle}>{votes.down}</span>
        </button>
      </div>
    </div>
  );
}

/* ---------- Styles ---------- */

const containerStyle = {
  marginTop: "24px",
  textAlign: "center",
};

const voteButtonRow = {
  display: "flex",
  justifyContent: "center",
  gap: "18px",
};

const buttonStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "12px 22px",
  fontSize: "16px",
  fontWeight: "600",
  cursor: "pointer",
  borderRadius: "10px",
  border: "2px solid #00d8ff",
  backgroundColor: "#121622",
  color: "#00d8ff",
};

const activeUpvoteStyle = {
  backgroundColor: "#00d8ff",
  color: "#121622",
};

const activeDownvoteStyle = {
  backgroundColor: "#ff4d4d",
  color: "#121622",
};

const upvoteText = {
  color: "#005066",
  fontWeight: "600",
};

const downvoteText = {
  color: "#660000",
  fontWeight: "600",
};

const countStyle = {
  marginLeft: "10px",
  fontSize: "20px",
  fontWeight: "800",
  color: "#ffffff",
};

export default VoteSystem;
