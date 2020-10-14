import React from "react";

function LoadingPage() {
  return (
    <div id="loadingPage">
      <div className="spinner-border text-secondary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <div>Loading...</div>
    </div>
  );
}

export default LoadingPage;
