import React from 'react';
import ReactPlayer from 'react-player';
import { useChatContext } from '../context/ChatContext';
import { Download, Share2, Play, Loader } from 'lucide-react';

// Thinking Loader Component
const ThinkingLoader = () => {
  return (
    <div className="flex items-center justify-center p-12">
      <div className="flex flex-col items-center space-y-6">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
        </div>
        <div className="text-center">
          <h3 className="text-white font-medium text-lg">Thinking...</h3>
          <p className="text-white/60 text-sm mt-2">Processing your request</p>
        </div>
      </div>
    </div>
  );
};

// Generating Video Loader Component
const GeneratingVideoLoader = () => {
  return (
    <div className="flex items-center justify-center p-12">
      <div className="flex flex-col items-center space-y-6">
        <div className="relative">
          {/* Animated video icon */}
          <div className="w-20 h-16 glass rounded-2xl flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
            <Play className="w-8 h-8 text-white" />
          </div>
          {/* Progress dots */}
          <div className="flex space-x-2 mt-4 justify-center">
            <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
        <div className="text-center">
          <h3 className="text-white font-medium text-lg">Generating Video...</h3>
          <p className="text-white/60 text-sm mt-2">This may take a few moments</p>
        </div>
      </div>
    </div>
  );
};

// Main Video Player Sidebar Component
const VideoPlayerSidebar = () => {
  const { videoUrl, isVideoReady, isPolling, messages } = useChatContext();
  
  // Check if we're waiting for AI response (thinking)
  const isThinking = messages.length > 0 && 
    messages[messages.length - 1].sender === 'user' && 
    !isPolling && 
    !isVideoReady;

  const renderVideoContent = () => {
    // Show thinking loader when waiting for AI response
    if (isThinking) {
      return <ThinkingLoader />;
    }
    
    // Show generating video loader when polling for video
    if (isPolling) {
      return <GeneratingVideoLoader />;
    }
    
    // Show video player when video is ready
    if (isVideoReady && videoUrl) {
      return (
        <>
          <div className="glass-dark rounded-2xl overflow-hidden neo-shadow">
            <ReactPlayer
              url={videoUrl}
              controls
              width="100%"
              height="280px"
              config={{
                file: {
                  attributes: {
                    crossOrigin: "anonymous",
                  },
                },
              }}
            />
          </div>

          {/* Video Info */}
          <div className="mt-6 space-y-3">
            <h3 className="text-white font-semibold text-lg">
              Generated Animation
            </h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Your custom animated video is ready to view and download
            </p>
          </div>
        </>
      );
    }
    
    // Default placeholder when no video
    return (
      <div className="glass-dark rounded-2xl overflow-hidden h-[280px] flex items-center justify-center neo-shadow">
        <div className="text-center">
          <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Play className="w-8 h-8 text-white/60" />
          </div>
          <p className="text-white font-medium mb-2">No video yet</p>
          <p className="text-white/60 text-sm">Start a conversation to generate content</p>
        </div>
      </div>
    );
  };

  return (
    <div className="w-[480px] glass-dark border-l border-white/10 flex flex-col">
      {/* Video Player Header */}
      <div className="p-8 border-b border-white/10">
        <h2 className="text-2xl font-semibold text-white mb-2">Video Player</h2>
        <p className="text-white/60">
          {isThinking ? 'Processing request...' : 
           isPolling ? 'Generating video...' : 
           isVideoReady ? 'Video ready!' : 
           'Watch generated content'}
        </p>
      </div>

      {/* Video Player Container */}
      <div className="flex-1 p-8">
        {renderVideoContent()}
      </div>

      {/* Video Controls/Options */}
      <div className="p-8 border-t border-white/10">
        <div className="flex space-x-4">
          <button 
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 glass hover:bg-white/20 text-white rounded-2xl transition-all smooth-hover disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!isVideoReady}
          >
            <Download size={18} />
            Download
          </button>
          <button 
            className="px-6 py-3 glass hover:bg-white/20 text-white rounded-2xl transition-all smooth-hover disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!isVideoReady}
          >
            <Share2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerSidebar;