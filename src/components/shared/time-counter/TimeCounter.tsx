import React, { useState, useEffect } from "react";

interface TimeCounterProps {
  startTime: Date;

  onTimeUpdate: (timeElapsed: string) => void;
}

const TimeCounter: React.FC<TimeCounterProps> = ({
  startTime,
  onTimeUpdate,
}) => {
  const [elapsedTime, setElapsedTime] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const difference = now.getTime() - startTime.getTime();

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

      setElapsedTime(formattedTime);

      if (onTimeUpdate) {
        onTimeUpdate(formattedTime);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, onTimeUpdate]);

  return <span>{elapsedTime}</span>;
};

export default TimeCounter;
