import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from "react";

export interface Station {
  id: string;
  name: string;
  freq: string;
  color: string;
  url: string;
}

export const STATIONS: Station[] = [
  { 
    id: "inter",
    name: "France Inter", 
    freq: "87.8", 
    color: "#E11D48", 
    url: "https://icecast.radiofrance.fr/franceinter-midfi.mp3" 
  },
  { 
    id: "culture",
    name: "France Culture", 
    freq: "93.5", 
    color: "#7C3AED", 
    url: "https://icecast.radiofrance.fr/franceculture-midfi.mp3" 
  },
  { 
    id: "musique",
    name: "France Musique", 
    freq: "91.7", 
    color: "#2563EB", 
    url: "https://icecast.radiofrance.fr/francemusique-midfi.mp3" 
  },
  { 
    id: "fip",
    name: "FIP", 
    freq: "105.1", 
    color: "#E11D48", 
    url: "https://icecast.radiofrance.fr/fip-midfi.mp3" 
  },
];

interface RadioContextType {
  isPlaying: boolean;
  isLoading: boolean;
  currentStation: Station;
  volume: number;
  isMuted: boolean;
  togglePlay: () => void;
  setStation: (station: Station) => void;
  setVolume: (volume: number) => void;
  setIsMuted: (isMuted: boolean) => void;
}

const RadioContext = createContext<RadioContextType | undefined>(undefined);

export const RadioProvider = ({ children }: { children: ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStation, setCurrentStation] = useState(STATIONS[0]);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize Audio instance once
  useEffect(() => {
    audioRef.current = new Audio(currentStation.url);
    audioRef.current.volume = volume;

    const handleCanPlay = () => setIsLoading(false);
    const handleWaiting = () => setIsLoading(true);
    const handleError = () => {
      setIsLoading(false);
      setIsPlaying(false);
      console.error("Prisma OS Radio: Global Stream Error");
    };

    audioRef.current.addEventListener("canplay", handleCanPlay);
    audioRef.current.addEventListener("waiting", handleWaiting);
    audioRef.current.addEventListener("error", handleError);

    return () => {
      console.log("Prisma OS Radio: RadioProvider unmounting, stopping audio");
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener("canplay", handleCanPlay);
        audioRef.current.removeEventListener("waiting", handleWaiting);
        audioRef.current.removeEventListener("error", handleError);
      }
    };
  }, []);

  // Sync station change
  useEffect(() => {
    if (audioRef.current) {
      const wasPlaying = isPlaying;
      audioRef.current.pause();
      audioRef.current.src = currentStation.url;
      audioRef.current.load();
      if (wasPlaying) {
        setIsLoading(true);
        audioRef.current.play().catch(() => setIsPlaying(false));
      }
    }
  }, [currentStation]);

  // Sync volume/mute
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setIsLoading(true);
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsLoading(false));
    }
  };

  const setStation = (station: Station) => {
    setCurrentStation(station);
  };

  return (
    <RadioContext.Provider value={{
      isPlaying,
      isLoading,
      currentStation,
      volume,
      isMuted,
      togglePlay,
      setStation,
      setVolume,
      setIsMuted
    }}>
      {children}
    </RadioContext.Provider>
  );
};

export const useRadio = () => {
  const context = useContext(RadioContext);
  if (context === undefined) {
    throw new Error("useRadio must be used within a RadioProvider");
  }
  return context;
};
