import React from "react";
import { Link } from "react-router-dom";

export const HomeBottomText = () => {
  return (
    <div className="flex gap-2 justify-center items-center font-[Lausanne500]">
      <Link className="uppercase  text-[6.5vw] border-5 border-white rounded-full px-10 py-2 leading-[7vw]">
        Projects
      </Link>
      <Link className="uppercase  text-[6.5vw] border-5 border-white rounded-full px-10 py-2 leading-[7vw]">
        Agence
      </Link>
    </div>
  );
};
