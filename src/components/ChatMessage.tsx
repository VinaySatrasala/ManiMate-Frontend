import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, User, Bot } from 'lucide-react';

interface MessageProps {
  message: {
    sender: 'user' | 'animate';
    type?: 'code' | 'error';
    content: string;
    filename?: string;
  };
}

const ChatMessage = ({ message }: MessageProps) => {
  const isUser = message.sender === 'user';
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };
  
  const renderContent = () => {
    if (message.type === 'code') {
      return (
        <div className="mt-4 rounded-2xl overflow-hidden neo-shadow">
          <div className="glass-dark px-6 py-4 flex justify-between items-center border-b border-white/10">
            <span className="text-white/80 font-medium">Python</span>
            <button 
              onClick={() => copyToClipboard(message.content)}
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm"
            >
              <Copy size={16} />
              Copy code
            </button>
          </div>
          <SyntaxHighlighter 
            language="python" 
            style={atomDark} 
            customStyle={{ 
              margin: 0, 
              borderRadius: '0 0 16px 16px',
              background: 'rgba(0, 0, 0, 0.3)',
              fontSize: '14px',
              padding: '24px'
            }}
          >
            {message.content}
          </SyntaxHighlighter>
        </div>
      );
    }
    
    return <p className="whitespace-pre-wrap text-white/90 leading-relaxed">{message.content}</p>;
  };
  
  return (
    <div className={`mb-8 ${isUser ? 'pl-16' : 'pr-16'}`}>
      <div className="flex items-center mb-4">
        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center mr-3 ${
          isUser ? 'glass pulse-glow' : 'glass-dark'
        }`}>
          {isUser ? (
            <User className="w-5 h-5 text-white" />
          ) : (
            <Bot className="w-5 h-5 text-white" />
          )}
        </div>
        <span className="text-lg font-medium text-white">
          {isUser ? 'You' : 'ManiMate'}
        </span>
      </div>
      
      <div className={`p-6 rounded-3xl neo-shadow ${
        isUser 
          ? 'glass-dark ml-13' 
          : 'glass ml-13'
      }`}>
        {renderContent()}
      </div>
    </div>
  );
};

export default ChatMessage;