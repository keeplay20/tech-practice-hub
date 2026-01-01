import React from "react";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-10 py-5">
      <h4 className="bg-black text-white px-6 py-2 rounded-full uppercase text-xs tracking-wider">
        Target Audience
      </h4>
      <button className="bg-gray-200 px-6 py-2 uppercase rounded-full text-xs tracking-wider">
        Digital Banking Platform
      </button>
    </div>
  );
};

export default Navbar;
