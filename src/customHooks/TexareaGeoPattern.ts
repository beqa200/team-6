import React, { useState } from "react";

const useGeorgianPatternTextarea = () => {
  const [geoErrorMessageTextarea, setGeoErrorMessageTextarea] = useState<{
    [key: string]: string;
  }>({});
  const handleTextarea = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const georgianPattern = /^[\u10A0-\u10FF\u2D00-\u2D2F]+$/;

    const allowedKeys = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
      "Home",
      "End",
      "Enter",
      "Shift",
      "-",
      "Shift",
      "CapsLock",
      " ",
      ",",
      ".",
      "!",
      "?",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      "(",
      ")",
      "/",
    ];
    const currentId = event.currentTarget.id;
    if (allowedKeys.includes(event.key) || georgianPattern.test(event.key)) {
      setGeoErrorMessageTextarea((prevErrors) => ({
        ...prevErrors,
        [currentId]: "",
      }));
      return;
    } else {
      setGeoErrorMessageTextarea((prevErrors) => ({
        ...prevErrors,
        [currentId]: "გთხოვთ, შეავსოთ ქართულად",
      }));
      return event.preventDefault();
    }
  };

  return { handleTextarea, geoErrorMessageTextarea };
};

export default useGeorgianPatternTextarea;
