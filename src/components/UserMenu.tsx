import { useState, useRef, useEffect } from 'react';
import { User, Settings, LogOut, ChevronDown } from 'lucide-react';

interface UserMenuProps {
  username: string;
  roleName: string;
  onLogout: () => void;
}

export function UserMenu({ username, roleName, onLogout }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900/50 border border-slate-800 hover:bg-slate-800/50 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
          <User className="w-4 h-4 text-white" />
        </div>
        <div className="text-left">
          <p className="text-white text-sm">{username}</p>
          <p className="text-slate-400 text-xs">{roleName}</p>
        </div>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg bg-slate-900 border border-slate-800 shadow-xl shadow-black/20 overflow-hidden z-50">
          <div className="px-4 py-3 border-b border-slate-800">
            <p className="text-white text-sm font-medium">{username}</p>
            <p className="text-slate-400 text-xs">{roleName}</p>
          </div>
          <div className="py-1">
            <button
              onClick={() => {
                setIsOpen(false);
                // Add profile logic here
              }}
              className="w-full px-4 py-2 text-left text-slate-300 hover:bg-slate-800 hover:text-white flex items-center gap-2 transition-colors"
            >
              <User className="w-4 h-4" />
              Profile
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                // Add settings logic here
              }}
              className="w-full px-4 py-2 text-left text-slate-300 hover:bg-slate-800 hover:text-white flex items-center gap-2 transition-colors"
            >
              <Settings className="w-4 h-4" />
              Settings
            </button>
          </div>
          <div className="border-t border-slate-800">
            <button
              onClick={() => {
                setIsOpen(false);
                onLogout();
              }}
              className="w-full px-4 py-2 text-left text-red-400 hover:bg-slate-800 hover:text-red-300 flex items-center gap-2 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
