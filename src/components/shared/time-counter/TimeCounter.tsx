import React, { useState, useEffect } from "react";

interface TimeCounterProps {
  startTime: Date;
}

const TimeCounter: React.FC<TimeCounterProps> = ({ startTime }) => {
  const [elapsedTime, setElapsedTime] = useState<string>("");

  useEffect(() => {
    const updateElapsedTime = () => {
      const now = new Date();
      const difference = now.getTime() - startTime.getTime();

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setElapsedTime(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      );
    };

    const interval = setInterval(updateElapsedTime, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  return <span>{elapsedTime}</span>;
};

export default TimeCounter;
