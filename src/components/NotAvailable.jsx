import React from "react";

export default function NotAvailable({ type }) {
  const messageDisplay = (type) => {
    switch (type) {
      case "movies":
        return "No Movies avaialble for the selected genre. Please select a different genre.";
      case "tv":
        return "No TV Shows avaialble for the selected genre. Please select a different genre.";
      default:
        return "Not Available";
    }
  };

  return <h1 className="not-available">{messageDisplay(type)}</h1>;
}
