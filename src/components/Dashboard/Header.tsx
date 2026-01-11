import { useAuth } from '../../contexts/AuthContext';
import { LogOut, Sparkles } from 'lucide-react';

export default function Header() {
  const { user, signOut } = useAuth();

  return (
    <header className="bg-gray-800/50 backdrop-blur-xl border-b border-gray-700/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              RePurposeAI
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-gray-300 text-sm hidden sm:block">
              {user?.email}
            </span>
            <button
              onClick={signOut}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-700/50 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
