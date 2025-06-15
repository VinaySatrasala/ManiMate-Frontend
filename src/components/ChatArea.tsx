import React, { useState } from "react";
import WelcomeScreen from "./WelcomeScreen";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import { useChatContext } from "../context/ChatContext";
import VideoPlayerSidebar from "./VideoPlayerSideBar";

const ChatArea = () => {
  const { messages } = useChatContext();

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Chat Section */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto px-8 py-8">
            {messages.length === 0 ? (
              <WelcomeScreen />
            ) : (
              <div className="space-y-8 max-w-4xl mx-auto">
                {messages.map((message, index) => (
                  <ChatMessage key={index} message={message} />
                ))}
              </div>
            )}
          </div>

          {/* Chat Input Section */}
          <div className="p-8 border-t border-white/10">
            <div className="max-w-4xl mx-auto">
              <ChatInput />
              <div className="text-center mt-4 text-sm text-white/50">
                ManiMate can make mistakes. Consider checking important information.
              </div>
            </div>
          </div>
        </div>

        {/* Video Player Sidebar */}
        <VideoPlayerSidebar />
      </div>
    </div>
  );
};

export default ChatArea;