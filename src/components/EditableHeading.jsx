import React, { useState, useContext } from "react";
import Context from "/Coding/billi-reaction-vite-v8/src/contexts/Context";

// EditableHeading component with modifications
export default function EditableHeading({
  initialContent,
  name,
  id,
  maxLength,
  size,
  bold,
  img,
}) {
  // State to hold the content object
  const [content, setContent] = useState({ [name]: initialContent });
  const [isEditing, setIsEditing] = useState(false);
  const { updateStore } = useContext(Context);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    if (content[name].length >= 3) {
      setIsEditing(false);
      updateStore(id, content, null, null, img);
    } else {
      alert("length must be at least 3");
    }
  };

  const handleInputChange = (e) => {
    // Update the content object with the new value
    setContent({ ...content, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div>
        {isEditing ? (
          <input
            className="d-inline-block border-0"
            minLength={5}
            style={{
              outline: "none",
              backgroundColor: "white",
              width: "1150px",
              padding: "0",
              fontSize: `${size}px`,
              fontWeight: `${bold}`,
            }}
            type="text"
            maxLength={maxLength}
            value={content[name]}
            onChange={handleInputChange}
            name={name}
          />
        ) : (
          <p
            className="d-inline-block"
            style={{
              fontSize: `${size}px`,
              fontWeight: `${bold}`,
            }}
          >
            {content[name]}
          </p>
        )}
        <button
          className="border-0 bg-white d-inline-block ms-3"
          onClick={isEditing ? handleSaveClick : handleEditClick}
          style={{ fontSize: "17px" }}
        >
          {isEditing ? (
            <>
              <i className="me-2 fa-solid fa-floppy-disk"></i>Save
            </>
          ) : (
            <>
              <i className="me-2 fa-regular fa-pen-to-square"></i>Edit
            </>
          )}
        </button>
      </div>
    </>
  );
}
