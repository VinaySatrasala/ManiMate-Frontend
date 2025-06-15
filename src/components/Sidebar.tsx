import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useChatContext } from '../context/ChatContext';
import { Plus, Trash2, LogOut, Menu, X, MessageSquare } from 'lucide-react';

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
        className="lg:hidden fixed top-6 left-6 z-50 p-3 glass-dark rounded-2xl neo-shadow"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X size={24} className="text-white" /> : <Menu size={24} className="text-white" />}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-40 w-80 glass-dark border-r border-white/10 transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full p-6">
          {/* User info */}
          <div className="glass p-6 rounded-2xl mb-8 neo-shadow">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center pulse-glow">
                <span className="text-white font-bold text-lg">{user?.username?.[0]?.toUpperCase() || 'U'}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-lg font-medium text-white truncate">{user?.name || 'User'}</p>
                <p className="text-sm text-white/60 truncate">@{user?.username}</p>
              </div>
            </div>
          </div>

          {/* Sessions list */}
          <div className="flex-1 overflow-y-auto space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Sessions
              </h2>
              <button
                onClick={() => setIsCreatingSession(true)}
                className="p-2 glass rounded-xl hover:bg-white/20 text-white transition-all smooth-hover"
              >
                <Plus size={20} />
              </button>
            </div>

            {/* New session form */}
            {isCreatingSession && (
              <form onSubmit={handleCreateSession} className="mb-6">
                <input
                  type="text"
                  value={newSessionName}
                  onChange={(e) => setNewSessionName(e.target.value)}
                  placeholder="New session name"
                  className="w-full px-4 py-3 glass-dark rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all mb-3"
                  autoFocus
                />
                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 glass text-white rounded-xl hover:bg-white/20 transition-all font-medium"
                  >
                    Create
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCreatingSession(false);
                      setNewSessionName('');
                    }}
                    className="px-4 py-2 glass-dark text-white/70 rounded-xl hover:bg-white/10 hover:text-white transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* Sessions */}
            <div className="space-y-2">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className={`
                    flex items-center justify-between p-4 rounded-2xl cursor-pointer group transition-all smooth-hover
                    ${currentSession?.id === session.id ? 'glass neo-shadow' : 'glass-dark hover:bg-white/10'}
                  `}
                  onClick={() => switchSession(session.id)}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">{session.name}</p>
                    <p className="text-sm text-white/60">
                      {new Date(session.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteSession(session.id);
                    }}
                    className="p-2 rounded-xl opacity-0 group-hover:opacity-100 hover:bg-red-500/20 text-white/60 hover:text-red-400 transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Logout button */}
          <div className="pt-6 border-t border-white/10">
            <button
              onClick={logout}
              className="w-full flex items-center justify-center space-x-3 px-6 py-4 glass-dark text-white/80 rounded-2xl hover:bg-red-500/20 hover:text-red-300 transition-all smooth-hover"
            >
              <LogOut size={20} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;