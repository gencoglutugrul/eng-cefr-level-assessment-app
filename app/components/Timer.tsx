import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text } from "react-native";

interface TimerProps {
  totalTime: number;
  onTimeout: () => void;
  stop?: boolean;
}

export const Timer = ({ totalTime, onTimeout, stop = false }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(totalTime);
  const animationFrameRef = useRef<number>();
  const startTimeRef = useRef(Date.now());

  const animate = () => {
    const now = Date.now();
    const elapsed = (now - startTimeRef.current) / 1000;
    const remaining = Math.max(0, totalTime - elapsed);

    setTimeLeft(remaining);

    if (remaining > 0) {
      animationFrameRef.current = requestAnimationFrame(animate);
    } else {
      onTimeout();
    }
  };

  useEffect(() => {
    if (stop) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    startTimeRef.current = Date.now();
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [totalTime, stop]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = Math.floor(timeLeft % 60);

  return (
    <Text style={styles.timerText}>
      {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
    </Text>
  );
};

const styles = StyleSheet.create({
  timerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
});
