import React from "react";

const BottomLine = ({ className }) => {
  return (
    <div className={`w-fit flex items-center gap-4 my-4 ${className}`}>
      <p className="w-[50px] h-1.5 rounded-full bg-maroon"></p>
      <p className="w-[100px] h-1.5 rounded-full bg-[#922E2E]"></p>
    </div>
  );
};

export default BottomLine;
