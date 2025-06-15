import axios from 'axios';
import { createContext, useContext, useState, useRef, useEffect } from 'react';
import { useAuth } from './AuthContext';

interface Message {
  sender: 'user' | 'animate';
  content: string;
  type?: string;
  filename?: string;
}

interface Session {
  id: string;
  name: string;
  created_at: string;
  prompts_count: number;
}

interface ChatContextType {
  messages: Message[];
  sendMessage: (content: string) => Promise<void>;
  videoFileName: string | null;
  isVideoReady: boolean;
  videoUrl: string | null;
  isPolling: boolean;
  sessions: Session[];
  currentSession: Session | null;
  createSession: (name: string) => Promise<void>;
  deleteSession: (sessionId: string) => Promise<void>;
  switchSession: (sessionId: string) => Promise<void>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [videoFileName, setVideoFileName] = useState<string | null>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isPolling, setIsPolling] = useState(false);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [currentSession, setCurrentSession] = useState<Session | null>(null);
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const { isAuthenticated } = useAuth();

  // Fetch sessions on mount and when authentication changes
  useEffect(() => {
    if (isAuthenticated) {
      fetchSessions();
    }
  }, [isAuthenticated]);

  const fetchSessions = async () => {
    try {
      const response = await axios.get('/sessions');
      setSessions(response.data.sessions);
      // Set the most recent session as current if none is selected
      if (!currentSession && response.data.sessions.length > 0) {
        setCurrentSession(response.data.sessions[0]);
      }
    } catch (error) {
      console.error('Error fetching sessions:', error);
    }
  };

  const createSession = async (name: string) => {
    try {
      const response = await axios.post('/create-session', { session_name: name });
      const newSession = response.data.session;
      setSessions(prev => [...prev, newSession]);
      setCurrentSession(newSession);
      setMessages([]); // Clear messages for new session
    } catch (error) {
      console.error('Error creating session:', error);
      throw error;
    }
  };

  const deleteSession = async (sessionId: string) => {
    try {
      await axios.post('/delete-session', { session_id: sessionId });
      setSessions(prev => prev.filter(session => session.id !== sessionId));
      if (currentSession?.id === sessionId) {
        setCurrentSession(null);
        setMessages([]);
      }
    } catch (error) {
      console.error('Error deleting session:', error);
      throw error;
    }
  };

  const switchSession = async (sessionId: string) => {
    const session = sessions.find(s => s.id === sessionId);
    if (session) {
      setCurrentSession(session);
      setMessages([]); // Clear messages when switching sessions
    }
  };

  const checkVideoStatus = async (filename: string) => {
    try {
      const response = await axios.post('/getvideo', { filename });
      if (response.status === 200 && response.data.video_url) {
        stopPolling();
        const fullVideoUrl = `http://localhost:3000${response.data.video_url}`;
        setVideoUrl(fullVideoUrl);
        setIsVideoReady(true);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        console.log('Video not ready yet, continuing to poll...');
      } else {
        console.error('Error checking video status:', error);
      }
    }
  };

  const startPolling = (filename: string) => {
    setIsPolling(true);
    pollingIntervalRef.current = setInterval(() => {
      checkVideoStatus(filename);
    }, 1000);
  };

  const stopPolling = () => {
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }
    setIsPolling(false);
  };

  const sendMessage = async (content: string) => {
    if (!currentSession) {
      throw new Error('No active session');
    }

    stopPolling();
    setIsVideoReady(false);
    setVideoUrl(null);
    setVideoFileName(null);
    
    setMessages(prev => [...prev, { sender: 'user', content }]);

    try {
      const response = await axios.post('/generate', {
        prompt: content,
        session_id: currentSession.id
      });

      if (response.data.filename) {
        setVideoFileName(response.data.filename);
        startPolling(response.data.filename);
      }

      setMessages(prev => [...prev, {
        sender: 'animate',
        content: response.data.response,
        type: response.data.type,
        filename: response.data.filename
      }]);

    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error details:', {
          status: error.response?.status,
          data: error.response?.data
        });
      }
      setMessages(prev => [...prev, {
        sender: 'animate',
        content: 'Sorry, I encountered an error processing your request.',
        type: 'error'
      }]);
    }
  };

  // Cleanup function
  useEffect(() => {
    return () => {
      stopPolling();
    };
  }, []);

  return (
    <ChatContext.Provider value={{
      messages,
      sendMessage,
      videoFileName,
      isVideoReady,
      videoUrl,
      isPolling,
      sessions,
      currentSession,
      createSession,
      deleteSession,
      switchSession
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within ChatProvider');
  }
  return context;
};