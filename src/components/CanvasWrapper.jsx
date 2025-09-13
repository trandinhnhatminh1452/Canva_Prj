import React from "react";
import PageManager from "../components/PageManager";

const CanvasWrapper = ({
  children,
  pages,
  activePage,
  setActivePage,
  onAddPage,
  onDeletePage,
}) => {
  return (
    <div className="flex flex-col items-center min-h-screen pt-10">
      <div className="w-[960px] h-[540px] border border-gray-300 bg-white relative overflow-hidden shadow-lg">
        {children}
      </div>

      <PageManager
        pages={pages}
        activePage={activePage}
        setActivePage={setActivePage}
        onAddPage={onAddPage}
        onDeletePage={onDeletePage}
      />
    </div>
  );
};

export default CanvasWrapper;
