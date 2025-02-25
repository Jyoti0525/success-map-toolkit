
import { useEffect, useState } from "react";

interface TypingTextProps {
  text: string;
  delay?: number;
  className?: string;
}

export const TypingText = ({ text, delay = 50, className = "" }: TypingTextProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let currentIndex = 0;
    let timer: NodeJS.Timeout;

    if (isTyping) {
      timer = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          setIsTyping(false);
          clearInterval(timer);
        }
      }, delay);
    }

    return () => clearInterval(timer);
  }, [text, delay, isTyping]);

  return <span className={className}>{displayedText}</span>;
};
