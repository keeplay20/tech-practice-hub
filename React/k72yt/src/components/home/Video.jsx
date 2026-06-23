import React from "react";

export const Video = () => {
  return (
    <div className="w-full h-full">
      <video
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted
        src={
          "https://download-video-ak.vimeocdn.com/v3-1/playback/36bc59b8-6671-4358-abc2-15555fc6ae59/69496b2d?__token__=st=1780210838~exp=1780214438~acl=%2Fv3-1%2Fplayback%2F36bc59b8-6671-4358-abc2-15555fc6ae59%2F69496b2d%2A~hmac=4ec88daae5483aa3532d52086d55a0e552235f960784be7547c8bc2df0567fa5&r=dXMtZWFzdDE%3D"
        }
      ></video>
    </div>
  );
};
