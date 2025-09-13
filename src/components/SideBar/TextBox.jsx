// TextBox.jsx
import React, { useRef, useEffect } from "react";
import { Rnd } from "react-rnd";

const TextBox = ({
  text,
  initPosition = { x: 50, y: 50 },
  initSize = { width: 200, height: 80 },
  initFontSize = 20,
  onDelete,
  onUpdateText,
  onUpdateBox, // ✅ thêm props mới
  id,
}) => {
  const textRef = useRef(null);

  const handleChange = (e) => {
    const newText = e.target.innerText;
    onUpdateText && onUpdateText(id, newText); // chỉ update text
  };

  const handleDoubleClick = () => {
    if (textRef.current) {
      const range = document.createRange();
      range.selectNodeContents(textRef.current);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  useEffect(() => {
    if (textRef.current && text) {
      textRef.current.innerText = text;
    }
  }, []);

  return (
    <Rnd
      default={{
        x: initPosition.x,
        y: initPosition.y,
        width: initSize.width,
        height: initSize.height,
      }}
      onDragStop={(e, d) =>
        onUpdateBox &&
        onUpdateBox(id, {
          x: d.x,
          y: d.y,
          width: initSize.width,
          height: initSize.height,
        })
      }
      onResizeStop={(e, direction, ref, delta, pos) =>
        onUpdateBox &&
        onUpdateBox(id, {
          x: pos.x,
          y: pos.y,
          width: ref.offsetWidth,
          height: ref.offsetHeight,
        })
      }
      bounds="parent"
      className="cursor-move"
    >
      <div className="relative w-full h-full group focus-within:z-20">
        <button
          className="absolute top-[-10px] right-[-10px] bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center z-10 opacity-0 group-focus-within:opacity-100 transition-opacity"
          onClick={() => onDelete(id)}
        >
          ×
        </button>

        <div
          ref={textRef}
          contentEditable
          suppressContentEditableWarning={true}
          tabIndex={0}
          onInput={handleChange}
          onDoubleClick={handleDoubleClick}
          className="border transition-colors duration-200 w-full h-full rounded-md bg-white p-2 font-bold focus:outline-none overflow-auto resize-none border-transparent hover:border-blue-400 focus:border-blue-400"
          style={{
            fontSize: `${initFontSize}px`,
            lineHeight: 1.2,
            whiteSpace: "pre-wrap",
          }}
        ></div>
      </div>
    </Rnd>
  );
};

export default TextBox;
