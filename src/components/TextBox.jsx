import React, { useRef, useState, useEffect } from "react";
import { Rnd } from "react-rnd";

const TextBox = ({ initialPosition = { x: 50, y: 50 }, onDelete, id }) => {
  const initialWidth = 200;
  const initialFontSize = 20;

  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState({
    width: initialWidth,
    height: 80,
  });
  const [fontSize, setFontSize] = useState(initialFontSize);
  const [isResizing, setIsResizing] = useState(false);

  const textRef = useRef(null);

  const updateHeightFromContent = () => {
    if (textRef.current) {
      const newHeight = textRef.current.scrollHeight;
      setSize((prev) => ({ ...prev, height: newHeight }));
    }
  };

  useEffect(() => {
    updateHeightFromContent();
  }, []);

  const handleResizeStart = () => {
    setIsResizing(true);
  };

  const handleResizeStop = (e, direction, ref, delta, newPosition) => {
    setIsResizing(false);
    handleResize(e, direction, ref, delta, newPosition);
    // Sau khi resize xong, focus lại vào vùng nhập
    if (textRef.current) {
      textRef.current.focus();
    }
  };

  const handleResize = (e, direction, ref, delta, newPosition) => {
    const newWidth = ref.offsetWidth;
    const newHeight = ref.offsetHeight;

    if (direction === "bottomRight") {
      const scale = newWidth / initialWidth;
      setFontSize(initialFontSize * scale);
    }

    setSize({ width: newWidth, height: newHeight });
    setPosition(newPosition); //
  };

  return (
    <Rnd
      size={{ width: size.width, height: size.height }}
      position={position}
      onDragStop={(e, d) => setPosition({ x: d.x, y: d.y })}
      onResize={handleResize}
      onResizeStart={handleResizeStart}
      onResizeStop={handleResizeStop}
      bounds="parent"
      enableResizing={{
        topLeft: true,
        top: true,
        topRight: true,
        left: true,
        right: true,
        bottomLeft: true,
        bottomRight: true,
        bottom: true,
      }}
      className="cursor-move"
    >
      <div className="relative w-full h-full group focus-within:z-20">
        {/* Nút xóa */}
        <button
          className="absolute top-[-10px] right-[-10px] bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center z-10 opacity-0 group-focus-within:opacity-100 transition-opacity"
          onClick={() => onDelete(id)}
        >
          ×
        </button>

        {/* Vùng nhập nội dung */}
        <div
          ref={textRef}
          contentEditable
          suppressContentEditableWarning={true}
          tabIndex={0}
          onInput={updateHeightFromContent}
          className={`border transition-colors duration-200 w-full h-full rounded-md bg-white p-2 font-bold focus:outline-none overflow-auto resize-none ${
            isResizing
              ? "border-blue-400"
              : "border-transparent hover:border-blue-400 focus:border-blue-400"
          }`}
          style={{
            fontSize: `${fontSize}px`,
            lineHeight: 1.2,
            whiteSpace: "pre-wrap",
          }}
        >
          Nhập chữ tại đây
        </div>
      </div>
    </Rnd>
  );
};

export default TextBox;
