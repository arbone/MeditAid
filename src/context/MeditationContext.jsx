import { createContext, useState } from "react";

export const MeditationContext = createContext();

export function MeditationProvider({ children }) {
  const [time, setTime] = useState(300); // 5 minuti predefiniti

  return (
    <MeditationContext.Provider value={{ time, setTime }}>
      {children}
    </MeditationContext.Provider>
  );
}