import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

const ChatbotInterface = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatContainerRef = useRef(null);

  const handleSend = () => {
    if (input.trim()) {
      setMessages((prevMessages) => [...prevMessages, { text: input, sender: 'user' }]);
      setInput('');

      // Simulate bot response
      setTimeout(() => {
        const aqi = Math.floor(Math.random() * 200); // Random AQI between 0 and 200
        const response = generateResponse(aqi);
        setMessages((prevMessages) => [...prevMessages, { text: response, sender: 'bot' }]);
      }, 1000);
    }
  };

  // Scroll to the bottom when a new message is added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const generateResponse = (aqi) => {
    if (aqi <= 50) {
      return `The air quality is good! The AQI is ${aqi}. It's a great day to spend time outdoors!`;
    } else if (aqi <= 100) {
      return `The air quality is moderate. The AQI is ${aqi}. Sensitive individuals should consider limiting prolonged outdoor exertion.`;
    } else if (aqi <= 150) {
      return `The air quality is unhealthy for sensitive groups. The AQI is ${aqi}. People with respiratory or heart conditions should limit outdoor activities.`;
    } else {
      return `The air quality is unhealthy. The AQI is ${aqi}. Everyone should limit outdoor activities and stay indoors if possible.`;
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-gray-100">
      {/* Chat Container */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
        style={{ maxHeight: 'calc(100vh - 100px)' }}
      >
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`rounded-lg px-4 py-2 max-w-xs break-words ${
                message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-white text-gray-800 shadow-md'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Section */}
      <div className="bg-white p-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSend}
            className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Send size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotInterface;
