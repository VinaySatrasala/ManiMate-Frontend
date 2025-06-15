import React, { useState, FormEvent } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { useChatContext } from '../context/ChatContext';

const ChatInput = () => {
  const [message, setMessage] = useState('');
  const { sendMessage } = useChatContext();
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center glass-dark rounded-3xl neo-shadow overflow-hidden">
        <div className="w-14 h-14 flex items-center justify-center ml-4">
          <div className="w-10 h-10 rounded-2xl glass flex items-center justify-center pulse-glow">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
        </div>
        
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Describe your animation idea..."
          className="flex-1 bg-transparent border-none focus:outline-none py-5 px-4 text-white placeholder-white/50 text-lg"
        />
        
        <button 
          type="submit"
          disabled={!message.trim()}
          className={`p-4 m-2 rounded-2xl transition-all duration-300 ${
            message.trim() 
              ? 'glass text-white hover:bg-white/20 smooth-hover' 
              : 'glass-dark text-white/30 cursor-not-allowed'
          }`}
        >
          <Send size={24} />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;