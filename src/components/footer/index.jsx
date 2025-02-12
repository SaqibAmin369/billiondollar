import React, { useState } from "react";
import "./footer.css";
import TermsCondition from "../../pages/terms-condition";
import Modal from "../modal";
const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const handleLinkClick = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };
  return (
    <footer>
      <p>
        The Billion Dollar Homepage © 2025 Ailex Tew. All rights reserved
        <span
          style={{ cursor: "pointer" , textDecoration: "underline" }}
          onClick={() => handleLinkClick(<TermsCondition />)}
        >
          {" "}
          Terms & Condition{" "}
        </span>
        Not responsible for external site content. Featured images &copy;
        their owners.
      </p>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        content={modalContent}
      />
    </footer>
  );
};

export default Footer;
