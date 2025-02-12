import React, { useEffect } from "react";
import "./Modal.css"; // Importing CSS for the modal styles

const Modal = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null; // If the modal isn't open, return null to render nothing

  // Close modal when clicking outside the modal content
  const handleOverlayClick = () => {
    onClose();
  };

  // Close modal when the Escape key is pressed
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Render the content (React Component or HTML) passed as a prop */}
        <div>{content}</div>
      </div>
    </div>
  );
};

export default Modal;
