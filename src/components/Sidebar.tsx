import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useChatContext } from '../context/ChatContext';
import { Plus, Trash2, LogOut, Menu, X } from 'lucide-react';

const Sidebar = () => {
  const { logout, user } = useAuth();
  const { sessions, currentSession, createSession, deleteSession, switchSession } = useChatContext();
  const [isCreatingSession, setIsCreatingSession] = useState(false);
  const [newSessionName, setNewSessionName] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleCreateSession = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newSessionName.trim()) {
      try {
        await createSession(newSessionName.trim());
        setNewSessionName('');
        setIsCreatingSession(false);
      } catch (error) {
        console.error('Error creating session:', error);
      }
    }
  };

  const handleDeleteSession = async (sessionId: string) => {
    try {
      await deleteSession(sessionId);
    } catch (error) {
      console.error('Error deleting session:', error);
    }
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-[#1E1E1E] border border-[#333333]"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-40 w-64 bg-[#1E1E1E] border-r border-[#333333] transform transition-transform duration-200 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* User info */}
          <div className="p-4 border-b border-[#333333]">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-[#2EEE2E] flex items-center justify-center">
                <span className="text-black font-bold">{user?.username?.[0]?.toUpperCase() || 'U'}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{user?.name || 'User'}</p>
                <p className="text-xs text-gray-400 truncate">@{user?.username}</p>
              </div>
            </div>
          </div>

          {/* Sessions list */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-medium text-gray-400">Sessions</h2>
              <button
                onClick={() => setIsCreatingSession(true)}
                className="p-1 rounded-lg hover:bg-[#252525] text-gray-400 hover:text-white"
              >
                <Plus size={18} />
              </button>
            </div>

            {/* New session form */}
            {isCreatingSession && (
              <form onSubmit={handleCreateSession} className="mb-4">
                <input
                  type="text"
                  value={newSessionName}
                  onChange={(e) => setNewSessionName(e.target.value)}
                  placeholder="New session name"
                  className="w-full px-3 py-2 bg-[#252525] border border-[#333333] rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#2EEE2E]"
                  autoFocus
                />
                <div className="flex space-x-2 mt-2">
                  <button
                    type="submit"
                    className="flex-1 px-3 py-1 bg-[#2EEE2E] text-black text-sm rounded-lg hover:bg-[#25C825]"
                  >
                    Create
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCreatingSession(false);
                      setNewSessionName('');
                    }}
                    className="px-3 py-1 bg-[#252525] text-gray-400 text-sm rounded-lg hover:bg-[#333333] hover:text-white"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* Sessions */}
            <div className="space-y-1">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className={`
                    flex items-center justify-between p-2 rounded-lg cursor-pointer group
                    ${currentSession?.id === session.id ? 'bg-[#252525]' : 'hover:bg-[#252525]'}
                  `}
                  onClick={() => switchSession(session.id)}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white truncate">{session.name}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(session.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteSession(session.id);
                    }}
                    className="p-1 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-500/10 text-gray-400 hover:text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Logout button */}
          <div className="p-4 border-t border-[#333333]">
            <button
              onClick={logout}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-[#252525] text-gray-400 rounded-lg hover:bg-red-500/10 hover:text-red-500"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;