import React from "react";
import Frame1 from "../../assets/frames/frame1.svg";
import Frame2 from "../../assets/frames/frame2.svg";
import Frame3 from "../../assets/frames/frame3.svg";
import Frame4 from "../../assets/frames/frame4.svg";

const elements = [
  { id: "frame1", name: "Frame 1", src: Frame1 },
  { id: "frame2", name: "Frame 2", src: Frame2 },
  { id: "frame3", name: "Frame 3", src: Frame3 },
  { id: "frame4", name: "Frame 4", src: Frame4 },
];

const Element = ({ onSelect }) => {
  // ✅ đổi lại từ onAddFrame → onSelect
  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Elements</h2>
      <div className="grid grid-cols-2 gap-4">
        {elements.map(({ id, name, src }) => (
          <button
            key={id}
            className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-gray-100"
            onClick={() => onSelect(src)} //
          >
            <img src={src} alt={name} className="w-16 h-16 object-contain" />
            <span className="mt-2 text-sm">{name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Element;
