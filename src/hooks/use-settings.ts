import { useState, useEffect } from "react";

export interface AppSettings {
  enabledSections: {
    equipment: boolean;
    projects: boolean;
    forum: boolean;
    events: boolean;
    schedule: boolean;
    documents: boolean;
    discussions: boolean;
  };
}

const DEFAULT_SETTINGS: AppSettings = {
  enabledSections: {
    equipment: true,
    projects: true,
    forum: true,
    events: true,
    schedule: true,
    documents: true,
    discussions: true,
  },
};

export const useSettings = () => {
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem("campus-connect-settings");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse settings", e);
      }
    }
    return DEFAULT_SETTINGS;
  });

  useEffect(() => {
    localStorage.setItem("campus-connect-settings", JSON.stringify(settings));
    // Dispatch a custom event to notify other components (like Navigation)
    window.dispatchEvent(new Event("settings-updated"));
  }, [settings]);

  const toggleSection = (section: keyof AppSettings["enabledSections"]) => {
    setSettings((prev) => ({
      ...prev,
      enabledSections: {
        ...prev.enabledSections,
        [section]: !prev.enabledSections[section],
      },
    }));
  };

  return { settings, toggleSection };
};
