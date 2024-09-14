import React, { useState } from 'react';
import { Send } from 'lucide-react';

const ChatbotInterface = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages(prevMessages => [...prevMessages, { text: input, sender: 'user' }]);
      setInput('');
      
      // Simulate bot response
      setTimeout(() => {
        const aqi = Math.floor(Math.random() * 200); // Random AQI between 0 and 200
        const response = generateResponse(aqi);
        setMessages(prevMessages => [...prevMessages, { text: response, sender: 'bot' }]);
      }, 1000);
    }
  };

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
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div 
              className={`rounded-lg px-4 py-2 max-w-xs ${
                message.sender === 'user' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white text-gray-800 shadow-md'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex space-x-2">
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


// import React, { useState, useEffect } from 'react';
// import { Send } from 'lucide-react';
// import { predictAQI } from '../services/api';
// import { getUserLocation } from '../utils/location';
// import { generateResponse } from '../utils/aqi';

// const ChatbotInterface = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [location, setLocation] = useState(null);

//   useEffect(() => {
//     getUserLocation()
//       .then(setLocation)
//       .catch(error => {
//         console.error('Error getting user location:', error);
//         setMessages(prevMessages => [...prevMessages, { text: "I couldn't get your location. Can you please provide your city name?", sender: 'bot' }]);
//       });
//   }, []);

//   const handleSend = async () => {
//     if (input.trim()) {
//       setMessages(prevMessages => [...prevMessages, { text: input, sender: 'user' }]);
//       setInput('');

//       if (location) {
//         try {
//           const aqi = await predictAQI(location.latitude, location.longitude);
//           const response = generateResponse(aqi);
//           setMessages(prevMessages => [...prevMessages, { text: response, sender: 'bot' }]);
//         } catch (error) {
//           console.error('Error predicting AQI:', error);
//           setMessages(prevMessages => [...prevMessages, { text: "I'm sorry, I couldn't predict the AQI at this time. Please try again later.", sender: 'bot' }]);
//         }
//       } else {
//         setMessages(prevMessages => [...prevMessages, { text: "I'm still trying to get your location. Can you please provide your city name?", sender: 'bot' }]);
//       }
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gray-100">
//       <div className="flex-1 overflow-y-auto p-4 space-y-4">
//         {messages.map((message, index) => (
//           <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
//             <div 
//               className={`rounded-lg px-4 py-2 max-w-xs ${
//                 message.sender === 'user' 
//                   ? 'bg-blue-500 text-white' 
//                   : 'bg-white text-gray-800 shadow-md'
//               }`}
//             >
//               {message.text}
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="p-4 bg-white border-t border-gray-200">
//         <div className="flex space-x-2">
//           <input 
//             type="text"
//             value={input} 
//             onChange={(e) => setInput(e.target.value)}
//             onKeyPress={(e) => e.key === 'Enter' && handleSend()}
//             placeholder="Type your message..."
//             className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <button 
//             onClick={handleSend}
//             className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <Send size={24} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatbotInterface;