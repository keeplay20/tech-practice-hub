import React from "react";

const Tile = ({ type }) => {
  const colors = {
    player: "blue",
    target: "green",
    obstacle: "black",
    empty: "white",
  };

  return (
    <div
      style={{
        background: colors[type] || "white",
        width: 50,
        height: 50,
        border: "1px solid gray",
        margin: 1,
      }}
    />
  );
};

export default Tile;