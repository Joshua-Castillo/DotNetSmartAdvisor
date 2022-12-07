import {
  createChatBotMessage,
  createCustomMessage,
} from 'react-chatbot-kit';

const config = {
  initialMessages: [createChatBotMessage("How can I help you? Ask me a question."),createCustomMessage('Test','custom')],
  botName: 'Smart Advisor',
  customStyles: {
    botMessageBox: {
      backgroundColor: 'maroon',
    },
    chatButton: {
      backgroundColor: '#3d4e8d',
    },
  },
};

export default config;
