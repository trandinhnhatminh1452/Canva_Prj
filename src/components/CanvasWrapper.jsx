import React from "react";

const CanvasWrapper = ({ children }) => {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-[960px] h-[540px] border border-gray-300 bg-white relative overflow-hidden shadow-lg">
        {children}
      </div>
    </div>
  );
};

export default CanvasWrapper;
