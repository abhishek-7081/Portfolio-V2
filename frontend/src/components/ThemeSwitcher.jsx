import React from 'react';
import { Sun, Moon, Palette } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeSwitcher = () => {
  const { theme, changeTheme } = useTheme();

  const themes = [
    { id: 'light', icon: Sun, label: 'Light' },
    { id: 'dark', icon: Moon, label: 'Dark' },
    { id: 'navy', icon: Palette, label: 'Navy' }
  ];

  return (
    <div className="theme-switcher">
      {themes.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          className={`theme-btn ${theme === id ? 'active' : ''}`}
          onClick={() => changeTheme(id)}
          aria-label={`${label} theme`}
          title={`${label} theme`}
        >
          <Icon size={16} />
        </button>
      ))}
      <style>{`
        .theme-switcher {
          display: flex;
          background: var(--input-bg);
          border-radius: 24px;
          padding: 4px;
          gap: 4px;
          border: 1px solid var(--glass-border);
          backdrop-filter: blur(10px);
        }
        .theme-btn {
          background: transparent;
          border: none;
          padding: 6px 10px;
          border-radius: 20px;
          color: var(--text-muted);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition);
        }
        .theme-btn:hover {
          color: var(--primary);
          background: var(--glass-bg);
        }
        .theme-btn.active {
          color: white; /* Important for contrast against primary bg */
          background: var(--primary);
          box-shadow: 0 2px 10px var(--primary-glow);
        }
      `}</style>
    </div>
  );
};

export default ThemeSwitcher;
