import React, { useState } from "react";
import CanvasWrapper from "./components/CanvasWrapper";
import TextBox from "./components/TextBox";
import ImageFrame from "./components/ImageFrame";
import SideBar from "./components/Sidebar";
import { Type, ImagePlus } from "lucide-react";

const App = () => {
  const [textBoxes, setTextBoxes] = useState([]);
  const [images, setImages] = useState([]);

  const handleAddTextBox = () => {
    const newTextBox = {
      id: Date.now(),
      text: "New Text",
      top: 100,
      left: 100,
    };
    setTextBoxes([...textBoxes, newTextBox]);
  };

  const handleAddImage = () => {
    const newImage = {
      id: Date.now(),
      src: "", // sau này bạn có thể mở file picker
      top: 150,
      left: 150,
    };
    setImages([...images, newImage]);
  };

  const handleDeleteTextBox = (id) => {
    setTextBoxes(textBoxes.filter((tb) => tb.id !== id));
  };

  const handleDeleteImage = (id) => {
    setImages(images.filter((img) => img.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* sidebar */}
      <SideBar onAddTextBox={handleAddTextBox} onAddImage={handleAddImage} />

      <div className="flex-1 flex justify-center items-center p-4">
        {/* canvas */}
        <CanvasWrapper>
          {textBoxes.map((tb) => (
            <TextBox
              id={tb.id}
              key={tb.id}
              text={tb.text}
              top={tb.top}
              left={tb.left}
              onDelete={handleDeleteTextBox}
            />
          ))}
          {images.map((img) => (
            <ImageFrame
              id={img.id}
              key={img.id}
              src={img.src}
              top={img.top}
              left={img.left}
              onDelete={handleDeleteImage}
            />
          ))}
        </CanvasWrapper>
      </div>
    </div>
  );
};

export default App;
