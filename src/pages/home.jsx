// Home.jsx
import React, { useState, useEffect } from "react";
import CanvasWrapper from "../components/CanvasWrapper";
import TextBox from "../components/SideBar/TextBox";
import ImageFrame from "../components/SideBar/ImageFrame";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
import Frame from "../components/SideBar/Frame";

const STORAGE_KEY = "canvas_pages";

const Home = () => {
  const [pages, setPages] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved).map((page) => ({
          textBoxes: page.textBoxes || [],
          images: page.images || [],
          elements: page.elements || [],
        }));
      }
    } catch (e) {
      console.error("Failed to load pages", e);
    }
    return [{ textBoxes: [], images: [], elements: [] }];
  });

  const [activePage, setActivePage] = useState(0);

  // Lưu vào localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pages));
  }, [pages]);

  // --- Helpers ---
  const updatePage = (updater) => {
    setPages((prev) => {
      const updated = [...prev];
      updated[activePage] = updater(updated[activePage]);
      return updated;
    });
  };

  // --- TextBox ---
  const handleAddTextBox = () => {
    const newTextBox = {
      id: Date.now(),
      text: "New Text",
      x: 100,
      y: 100,
      width: 200,
      height: 80,
      fontSize: 20,
    };
    updatePage((page) => ({
      ...page,
      textBoxes: [...page.textBoxes, newTextBox],
    }));
  };

  const handleUpdateText = (id, text) => {
    updatePage((page) => ({
      ...page,
      textBoxes: page.textBoxes.map((tb) =>
        tb.id === id ? { ...tb, text } : tb
      ),
    }));
  };

  const handleUpdateTextBox = (id, newProps) => {
    setPages((prevPages) => {
      const updatedPages = [...prevPages];
      updatedPages[activePage] = {
        ...updatedPages[activePage],
        textBoxes: updatedPages[activePage].textBoxes.map((tb) =>
          tb.id === id ? { ...tb, ...newProps } : tb
        ),
      };
      return updatedPages;
    });
  };

  const handleDeleteTextBox = (id) => {
    updatePage((page) => ({
      ...page,
      textBoxes: page.textBoxes.filter((tb) => tb.id !== id),
    }));
  };

  // --- Image ---
  const handleAddImage = () => {
    const newImage = {
      id: Date.now(),
      src: null, // ✅ tránh empty string
      x: 120,
      y: 120,
      width: 200,
      height: 200,
    };
    updatePage((page) => ({
      ...page,
      images: [...page.images, newImage],
    }));
  };

  const handleUpdateImage = (id, newSrc, newProps = null) => {
    updatePage((page) => ({
      ...page,
      images: page.images.map((img) =>
        img.id === id
          ? {
              ...img,
              src: newSrc ?? img.src,
              ...(newProps || {}),
            }
          : img
      ),
    }));
  };

  const handleDeleteImage = (id) => {
    updatePage((page) => ({
      ...page,
      images: page.images.filter((img) => img.id !== id),
    }));
  };

  // --- Element ---
  const handleAddElement = (src) => {
    const randomX = Math.floor(Math.random() * 300) + 50; // 50 → 350
    const randomY = Math.floor(Math.random() * 200) + 50; // 50 → 250
    const newElement = {
      id: Date.now(),
      src,
      x: randomX,
      y: randomY,
      width: 200,
      height: 200,
    };
    updatePage((page) => ({
      ...page,
      elements: [...page.elements, newElement],
    }));
  };

  const handleDeleteElement = (id) => {
    updatePage((page) => ({
      ...page,
      elements: page.elements.filter((el) => el.id !== id),
    }));
  };

  const handleUpdateElement = (id, newProps) => {
    updatePage((page) => ({
      ...page,
      elements: page.elements.map((el) =>
        el.id === id ? { ...el, ...newProps } : el
      ),
    }));
  };

  // --- Page ---
  const handleAddPage = () => {
    setPages((prev) => [...prev, { textBoxes: [], images: [], elements: [] }]);
    setActivePage(pages.length);
  };

  const handleDeletePage = (index) => {
    setPages((prev) => prev.filter((_, i) => i !== index));
    setActivePage((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-100">
      <div className="h-14">
        <NavBar />
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="h-full">
          <SideBar
            onAddTextBox={handleAddTextBox}
            onAddImage={handleAddImage}
            onElement={handleAddElement}
          />
        </div>

        {/* Canvas */}
        <div className="flex-1 flex justify-center items-center p-4 overflow-hidden">
          <CanvasWrapper
            pages={pages}
            activePage={activePage}
            setActivePage={setActivePage}
            onAddPage={handleAddPage}
            onDeletePage={handleDeletePage}
          >
            {pages[activePage].textBoxes.map((tb) => (
              <TextBox
                key={tb.id}
                id={tb.id}
                text={tb.text}
                initPosition={{ x: tb.x, y: tb.y }}
                initSize={{ width: tb.width, height: tb.height }}
                initFontSize={tb.fontSize}
                onDelete={handleDeleteTextBox}
                onUpdateText={handleUpdateText}
                onUpdateBox={handleUpdateTextBox}
              />
            ))}
            {pages[activePage].images.map((img) => (
              <ImageFrame
                key={img.id}
                id={img.id}
                src={img.src}
                initPosition={{ x: img.x, y: img.y }}
                initSize={{ width: img.width, height: img.height }}
                onDelete={handleDeleteImage}
                onUpdateImage={handleUpdateImage} // ✅ thêm update
              />
            ))}
            {pages[activePage].elements.map((el) => (
              <Frame
                key={el.id}
                id={el.id}
                src={el.src}
                initPosition={{ x: el.x, y: el.y }}
                initSize={{ width: el.width, height: el.height }}
                onDelete={handleDeleteElement}
                onUpdate={handleUpdateElement}
              />
            ))}
          </CanvasWrapper>
        </div>
      </div>
    </div>
  );
};

export default Home;
