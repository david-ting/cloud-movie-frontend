import React, { useState } from "react";

function CardImage({ image_path, title, spin, setSpin }) {
  const loadingStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
  };
  const completeStyle = {
    display: "none",
  };

  return (
    <>
      <div
        className="spinner-wrapper"
        style={spin ? loadingStyle : completeStyle}
      >
        <div className="spinner-border text-secondary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
      <img
        src={`https://image.tmdb.org/t/p/w500/${image_path}`}
        className="card-img-top"
        alt={title}
        onLoad={() => setSpin(false)}
      ></img>
    </>
  );
}

export default CardImage;
