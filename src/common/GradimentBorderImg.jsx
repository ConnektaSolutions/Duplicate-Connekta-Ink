import React from "react";

const GradientBorderImg = ({ image }) => {
  return (
    <div className="images-wrapper relative md:w-40 md:h-40 xl:w-50 xl:h-50 rounded-full p-[4px] before:absolute before:inset-0 border-3 border-red-800 before:from-[#5D0322] before:to-[#C30647] before:rounded-full before:-z-10">
      <img
        className="w-full h-full rounded-full object-contain"
        src={image}
        alt=""
      />
    </div>
  );
};

export default GradientBorderImg;
