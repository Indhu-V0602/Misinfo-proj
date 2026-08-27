import React from "react";

const TrustScoreBar = ({ score }) => {
  const safeScore = Math.min(100, Math.max(0, score));

  let barColor = "#4caf50"; // green
  if (safeScore < 40) barColor = "#f44336"; // red
  else if (safeScore < 70) barColor = "#ff9800"; // orange

  return (
    <div style={styles.container}>
      <div
        style={{ ...styles.bar, width: `${safeScore}%`, backgroundColor: barColor }}
      />
      <span style={styles.label}>{safeScore}% Trust Score</span>
    </div>
  );
};

const styles = {
  container: {
    position: "relative",
    height: 25,
    width: "100%",
    backgroundColor: "#222",
    borderRadius: 12,
    overflow: "hidden",
    boxShadow: "0 0 5px #000",
    marginTop: 20,
    paddingRight: 10,
  },
  bar: {
    height: "100%",
    borderRadius: 12,
    transition: "width 0.5s ease-in-out",
  },
  label: {
    position: "absolute",
    width: "100%",
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    top: 2,
    userSelect: "none",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    fontSize: 17,
    paddingRight: 0,
  },
};

export default TrustScoreBar;
