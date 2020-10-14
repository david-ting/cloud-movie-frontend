import React from "react";

function LoadingIndicator() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ width: "100%", height: "200px" }}
    >
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default LoadingIndicator;
