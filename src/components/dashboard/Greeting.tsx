
import { useEffect, useState } from "react";

export const Greeting = () => {
  const [greeting, setGreeting] = useState("");
  const [quote, setQuote] = useState({
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill"
  });

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  return (
    <div className="space-y-2 animate-fadeIn">
      <h1 className="text-3xl font-display font-bold text-navy">
        {greeting}, Sarah! 👋
      </h1>
      <p className="text-gray-600 italic">
        "{quote.text}" - {quote.author}
      </p>
    </div>
  );
};
