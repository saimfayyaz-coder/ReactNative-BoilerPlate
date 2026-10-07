import { useState, useEffect, useCallback } from 'react';

export interface UseOtpTimerReturn {
  secondsLeft: number;
  isTimerActive: boolean;
  formattedTime: string;
  restartTimer: () => void;
}

export const useOtpTimer = (initialSeconds: number = 30): UseOtpTimerReturn => {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isTimerActive, setIsTimerActive] = useState(true);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isTimerActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft(prev => {
          if (prev <= 1) {
            setIsTimerActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerActive, secondsLeft]);

  const restartTimer = useCallback(() => {
    setSecondsLeft(initialSeconds);
    setIsTimerActive(true);
  }, [initialSeconds]);

  const minutes = Math.floor(secondsLeft / 60);
  const remainingSecs = secondsLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${remainingSecs
    .toString()
    .padStart(2, '0')}`;

  return {
    secondsLeft,
    isTimerActive,
    formattedTime,
    restartTimer,
  };
};
