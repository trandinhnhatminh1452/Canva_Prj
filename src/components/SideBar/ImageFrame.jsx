import React, { useState, useRef } from "react";
import { Rnd } from "react-rnd";

const ImageFrame = ({
  src: initialSrc,
  initPosition = { x: 100, y: 100 },
  initSize = { width: 200, height: 200 },
  onDelete,
  onUpdateImage,
  id,
}) => {
  const [src, setSrc] = useState(initialSrc || null);
  const imgRef = useRef(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setSrc(ev.target.result);
        onUpdateImage(id, ev.target.result); // ✅ báo cho Home
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Rnd
      default={{
        x: initPosition.x,
        y: initPosition.y,
        width: initSize.width,
        height: initSize.height,
      }}
      onDragStop={(e, d) =>
        onUpdateImage(id, src, {
          x: d.x,
          y: d.y,
          width: initSize.width,
          height: initSize.height,
        })
      }
      onResizeStop={(e, direction, ref, delta, pos) =>
        onUpdateImage(id, src, {
          x: pos.x,
          y: pos.y,
          width: ref.offsetWidth,
          height: ref.offsetHeight,
        })
      }
      bounds="parent"
      className="select-none cursor-move"
    >
      <div className="relative w-full h-full group focus-within:z-20">
        {/* nút xoá */}
        <button
          className="absolute top-[-10px] right-[-10px] bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center z-10 opacity-0 group-focus-within:opacity-100 transition-opacity"
          onClick={() => onDelete(id)}
        >
          ×
        </button>

        {/* ảnh */}
        <img
          ref={imgRef}
          src={src || null}
          alt="Framed"
          tabIndex={0}
          className="border w-full h-full rounded-md bg-white"
          draggable={false}
        />

        {/* nút upload ảnh mới */}
        <label className="absolute top-[-10px] left-[-10px] bg-blue-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center z-10 opacity-0 group-focus-within:opacity-100 transition-opacity cursor-pointer">
          ⬆
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />
        </label>
      </div>
    </Rnd>
  );
};

export default ImageFrame;
