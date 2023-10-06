import React, { useState } from "react";
import Cropper from "react-easy-crop";
import "react-easy-crop/react-easy-crop.css";
import { generateDownload } from "./utils/cropImage.jsx";

function Crop({
  image,
  setImageFiles,
  setCurrentSelectedImage,
  setImagePaths,
}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setcroppedAreaPixels] = useState(null);

  const onCropComplete = (percentage, pixels) => {
    setcroppedAreaPixels(pixels);
  };

  const onDownload = async () => {
    const responseArray = await generateDownload(image, croppedAreaPixels);
    setImageFiles((prev) => [...prev, responseArray[0]]);
    setCurrentSelectedImage(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setImagePaths((prev) => [...prev, responseArray[1]]);

    // Close the modal
    document.getElementById("exampleModal").classList.remove("show");
    document.body.classList.remove("modal-open");
    const modalBackdrop = document.getElementsByClassName("modal-backdrop")[0];
    modalBackdrop.parentNode.removeChild(modalBackdrop);
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        id="crop-button"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        style={{ display: "none" }}
      ></button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Crop and Zoom Image
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body" style={{ height: "412px" }}>
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                maxZoom={10}
                onCropComplete={onCropComplete}
              />
            </div>
            <div className="modal-footer">
              <label htmlFor="zoomRange" className="form-label">
                Zoom
              </label>
              <input
                type="range"
                className="form-range"
                min="1"
                max="10"
                step="0.1"
                id="zoomRange"
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
              />
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={onDownload}
              >
                Crop and Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Crop;
