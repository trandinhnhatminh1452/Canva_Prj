import React from "react";

const PageManager = ({
  pages,
  onAddPage,
  onDeletePage,
  activePage,
  setActivePage,
}) => {
  return (
    <div className="w-[960px] mx-auto mt-[20px] flex items-center gap-2 overflow-x-auto overflow-y-visible justify-center">
      {pages.map((page, index) => (
        <div
          key={index}
          className={`group relative w-[114px] h-[64px] border rounded-md cursor-pointer flex items-center justify-center 
                      ${
                        activePage === index
                          ? "border-blue-500"
                          : "border-gray-300"
                      }`}
          onClick={() => setActivePage(index)}
        >
          {/* Nội dung thumbnail */}
          <span className="text-xs text-gray-500">Page {index + 1}</span>

          {/* Nút xoá - ẩn mặc định, hover mới hiện */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDeletePage(index);
            }}
            className="absolute top-0 right-0 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-xs hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            ✕
          </button>
        </div>
      ))}

      {/* Nút thêm trang */}
      <button
        onClick={onAddPage}
        className="w-[114px] h-[64px] border-dashed border-2 border-gray-400 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors"
      >
        <div className="text-2xl">+</div>
      </button>
    </div>
  );
};

export default PageManager;
