import React from "react";
import { Video } from "./video";

const HomeHeroText = () => {
  return (
    <div className="font-[Lausanne500] pt-6 text-center">
      <div className="text-[9.5vw] uppercase leading-[8vw] flex items-center justify-center">
        L'étincelle
      </div>
      <div className="text-[9.5vw] uppercase leading-[8vw] flex items-center justify-center">
        qui
        <div className="h-[7vw] w-[16vw] rounded-full -mt-6 overflow-hidden">
          <Video />
        </div>
        génère
      </div>
      <div className="text-[9.5vw] uppercase leading-[8vw] flex items-center justify-center">
        LaCreativite
      </div>
    </div>
  );
};

export default HomeHeroText;
