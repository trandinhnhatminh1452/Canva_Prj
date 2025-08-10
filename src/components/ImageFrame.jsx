import React, { useState, useRef } from "react";
import { Rnd } from "react-rnd";

const ImageFrame = ({
  src,
  initialPosition = { x: 100, y: 100 },
  initialSize = { width: 200, height: 200 },
  onDelete,
  id,
}) => {
  const [size, setSize] = useState(initialSize);
  const [position, setPosition] = useState(initialPosition);
  const [isResizing, setIsResizing] = useState(false);
  const imgRef = useRef(null); // 🔷 Ref cho thẻ img

  return (
    <Rnd
      default={{
        x: initialPosition.x,
        y: initialPosition.y,
        width: initialSize.width,
        height: initialSize.height,
      }}
      onDragStop={(e, d) => setPosition({ x: d.x, y: d.y })}
      onResizeStart={() => setIsResizing(true)}
      onResizeStop={(e, direction, ref, delta, position) => {
        setSize({
          width: ref.offsetWidth,
          height: ref.offsetHeight,
        });
        setPosition(position);
        setIsResizing(false);

        // 🔷 Focus lại sau khi resize
        if (imgRef.current) {
          imgRef.current.focus();
        }
      }}
      bounds="parent"
      className="select-none cursor-move"
      enableResizing={{
        top: true,
        right: true,
        bottom: true,
        left: true,
        topRight: true,
        bottomRight: true,
        bottomLeft: true,
        topLeft: true,
      }}
    >
      <div className="relative w-full h-full group focus-within:z-20">
        <button
          className="absolute top-[-10px] right-[-10px] bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center z-10 opacity-0 group-focus-within:opacity-100 transition-opacity"
          onClick={() => onDelete(id)}
        >
          ×
        </button>
        <img
          ref={imgRef} // 🔷 Gắn ref
          src={src}
          alt="Framed"
          tabIndex={0}
          className={`border transition-colors duration-200 w-full h-full rounded-md bg-white p-2 font-bold focus:outline-none overflow-auto resize-none ${
            isResizing
              ? "border-blue-400"
              : "border-transparent hover:border-blue-400 focus:border-blue-400"
          }`}
          draggable={false}
        />
      </div>
    </Rnd>
  );
};

export default ImageFrame;
