import { useEffect } from "react";
import "./chatbot.css"
const Chatbot = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.chatbase.co/embed.min.js";
    script.id = "_Vi-oQGgLd3aAp6OA_GeF"; // Your Chatbase ID
    script.domain = "www.chatbase.co";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Cleanup script on unmount
    };
  }, []);

  return <div id="chatbot-container" className="chatbot-wrapper"></div>;
};

export default Chatbot;
