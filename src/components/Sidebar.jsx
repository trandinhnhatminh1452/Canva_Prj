// Sidebar.jsx
import React, { useState, useRef, useEffect } from "react";
import Element from "./SideBar/Element";
import { Type, ImagePlus, LayoutTemplate, Shapes } from "lucide-react";

const SideBar = ({ onAddTextBox, onAddImage, onElement }) => {
  const [showElements, setShowElements] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (elementRef.current && !elementRef.current.contains(e.target)) {
        setShowElements(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-[100px] bg-transparent h-full flex flex-col items-center">
      <div className="pt-[8px] space-y-2">
        {/* Text */}
        <button
          className="w-[72px] h-[72px] flex flex-col items-center justify-center gap-1 text-gray-500 rounded hover:bg-gray-200 transition-colors duration-200"
          onClick={onAddTextBox}
        >
          <Type className="w-5 h-5 hover:scale-110 transition-transform duration-200" />
          <span className="text-xs text-center">Text</span>
        </button>

        {/* Image */}
        <button
          className="w-[72px] h-[72px] flex flex-col items-center justify-center gap-1 text-gray-500 rounded hover:bg-gray-200 transition-colors duration-200"
          onClick={onAddImage}
        >
          <ImagePlus className="w-5 h-5 hover:scale-110 transition-transform duration-200" />
          <span className="text-xs text-center">Image</span>
        </button>

        {/* Design */}
        <button className="w-[72px] h-[72px] flex flex-col items-center justify-center gap-1 text-gray-500 rounded hover:bg-gray-200 transition-colors duration-200">
          <LayoutTemplate className="w-5 h-5 hover:scale-110 transition-transform duration-200" />
          <span className="text-xs text-center">Design</span>
        </button>

        {/* Element */}
        <div className="relative" ref={elementRef}>
          <button
            className="w-[72px] h-[72px] flex flex-col items-center justify-center gap-1 text-gray-500 rounded hover:bg-gray-200 transition-colors duration-200"
            onClick={() => setShowElements(!showElements)}
          >
            <Shapes className="w-5 h-5" />
            <span className="text-xs text-center">Element</span>
          </button>

          {showElements && (
            <div className="absolute top-12 left-0 bg-white shadow-lg rounded-lg w-64 z-50">
              <Element onSelect={onElement} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
