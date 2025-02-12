import Chatbot from "./components/chatbot";
import Home from "./pages/home";
import { Buffer } from "buffer";
import process from "process";

// Add Buffer and process to the global scope
window.Buffer = Buffer;
window.process = process;
function App() {
  return (
    <>
      <Chatbot />
      <Home />
    </>
  );
}

export default App;
