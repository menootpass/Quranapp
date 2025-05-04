import React, { createContext, useContext, useState } from 'react';

interface Settings {
  isTranslationEnabled: boolean;
  isLatinEnabled: boolean;
  isWordTranslationEnabled: boolean;
  arabicFontSize: number;
  latinFontSize: number;
  translationFontSize: number;
  arabicFontType: 'USTMANI' | 'STANDARD';
  theme: 'LIGHT' | 'DARK' | 'SYSTEM';
}

interface SettingsContextType {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
}

const defaultSettings: Settings = {
  isTranslationEnabled: true,
  isLatinEnabled: true,
  isWordTranslationEnabled: false,
  arabicFontSize: 40,
  latinFontSize: 40,
  translationFontSize: 40,
  arabicFontType: 'USTMANI',
  theme: 'SYSTEM',
};

const SettingsContext = createContext<SettingsContextType>({
  settings: defaultSettings,
  updateSettings: () => {},
});

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext); 