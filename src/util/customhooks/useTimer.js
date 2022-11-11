import { useEffect, useRef } from "react";

export const useTimer = () => {
  const timerId = useRef();
  const time = useRef(0);
  useEffect(() => {
    timerId.current = setInterval(() => {
      time.current = time.current + 1;
    }, 1000);

    return () => {
      clearInterval(timerId.current);
    };
  }, []);

  const resetTimer = () => (time.current = 0);

  return { time, resetTimer };
};
