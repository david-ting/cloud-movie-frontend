import React, { useState } from "react";

function CardImage({ image_path, title }) {
  const [spin, setSpin] = useState(true);

  const loadingStyle = {
    height: "70%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const completeStyle = {
    ...loadingStyle,
    display: "none",
  };

  return (
    <>
      <div className="card-img-top" style={spin ? loadingStyle : completeStyle}>
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
