import React from "react";
import { Rnd } from "react-rnd";

const Frame = ({ id, src, initPosition, initSize, onDelete, onUpdate }) => {
  return (
    <Rnd
      default={{
        x: initPosition.x,
        y: initPosition.y,
        width: initSize.width,
        height: initSize.height,
      }}
      onDragStop={(e, d) => {
        onUpdate(id, { x: d.x, y: d.y });
      }}
      onResizeStop={(e, dir, ref, delta, pos) => {
        onUpdate(id, {
          width: ref.offsetWidth,
          height: ref.offsetHeight,
          ...pos,
        });
      }}
      bounds="parent"
      className="group relative"
    >
      <img src={src} alt="frame" className="w-full h-full object-contain" />

      <button
        onClick={() => onDelete(id)}
        className="absolute top-1 right-1 bg-red-500 text-white rounded px-2 opacity-0 group-hover:opacity-100 transition"
      >
        ×
      </button>
    </Rnd>
  );
};

export default Frame;
