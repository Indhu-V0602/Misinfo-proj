import React, { useEffect, useState } from "react";

function VoteHistory() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("checkedUrls")) || [];
    setItems(stored);
  }, []);

  return (
    <div className="history-panel">
      <h3>📊 Checked URLs</h3>

      {items.length === 0 ? (
        <p className="empty">No URLs checked yet</p>
      ) : (
        items.map((item, index) => (
          <div key={index} className="history-item">
            <div className="url">{item.url}</div>

            <div className="meta">
              <span className="score">
                Trust Score: {item.score}%
              </span>

              <span
                className={
                  item.status === "Trusted"
                    ? "status trusted"
                    : "status unverified"
                }
              >
                {item.status === "Trusted"
                  ? "✅ Trusted"
                  : "❌ Unverified"}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default VoteHistory;
