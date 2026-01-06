import React from "react";
import "./footer.css";

export const HomeFooter = () => {
  const handleSubmit = () => {
    console.log("Submit");
  };

  return (
    <div className="footerContainer">
      <span className="footerTitle">Contact Us</span>
      <input className="footerInput" type="text" placeholder="Name" />
      <input className="footerInput" type="email" placeholder="Email" />
      <input className="footerInput" type="number" placeholder="Phone" />
      <input className="footerInput" type="text" placeholder="Subject" />
      <textarea className="footerInput textarea" placeholder="Message" />
      <button onClick={handleSubmit} className="footerButton">
        Submit
      </button>
    </div>
  );
};
