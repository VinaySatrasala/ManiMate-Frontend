import React from 'react';
import Sidebar from './Sidebar';
import ChatArea from './ChatArea';

const ChatInterface = () => {
  return (
    <div className="flex h-screen relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="floating-blob blob-1"></div>
      <div className="floating-blob blob-2"></div>
      <div className="floating-blob blob-3"></div>
      
      <div className="relative z-10 flex w-full">
        <Sidebar />
        <ChatArea />
      </div>
    </div>
  );
};

export default ChatInterface;