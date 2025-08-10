import React from "react";
import { Type, ImagePlus } from "lucide-react";
const SideBar = ({ onAddTextBox, onAddImage }) => {
  return (
    <div className="w-[100px] mt-[67px] bg-white border-r border-gray-300 shadow-lg">
      <div className="p-2 space-y-2">
        <button
          className=" hover:bg-gray-200 transition-colors duration-200 text-gray-500 px-2 py-2 rounded w-full flex flex-col items-center justify-center gap-1"
          onClick={onAddTextBox}
          title="Add Text Box"
        >
          <Type className="w-5 h-5 hover:scale-110 transition-transform duration-200" />
          <span className="text-sm">Add Text</span>
        </button>

        <button
          className=" hover:bg-gray-200 transition-colors duration-200 text-gray-500 px-2 py-2 rounded w-full flex flex-col items-center justify-center gap-1"
          onClick={onAddImage}
          title="Add Image"
        >
          <ImagePlus className="w-5 h-5 hover:scale-110 transition-transform duration-200" />
          <span className="image-sm">Add Image</span>
        </button>
      </div>
    </div>
  );
};

export default SideBar;
