import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import config from "../Chatbot/config.js";
import MessageParser from "../Chatbot/MessageParser.jsx";
import ActionProvider from "../Chatbot/ActionProvider.jsx";

export const MyChatbotComponent = () => {
  return (
    <div>
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
    </div>
  );
};

//  export default MyChatbotComponent;
