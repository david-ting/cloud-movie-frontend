import React, { useState } from "react";

function SwitchButton({ checked, setChecked }) {
  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={checked}
        onChange={() => {
          setChecked(!checked);
        }}
      />
      <span className="slider-background">
        <span>{checked ? "stop" : "play"}</span>
      </span>
      <span className="slider round" />
    </label>
  );
}

export default SwitchButton;
