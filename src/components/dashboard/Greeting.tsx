// src/components/dashboard/Greeting.tsx
import React, { useEffect, useState } from 'react';

export const Greeting = () => {
  const [greeting, setGreeting] = useState('');
  const [userName, setUserName] = useState('Sarah');
  
  useEffect(() => {
    const hour = new Date().getHours();
    
    if (hour < 12) {
      setGreeting('Good morning');
    } else if (hour < 18) {
      setGreeting('Good afternoon');
    } else {
      setGreeting('Good evening');
    }
  }, []);

  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-slate-800 mb-1 flex items-center">
        {greeting}, {userName}! <span className="ml-2">👋</span>
      </h1>
      <p className="text-slate-600 italic">
        "Success is not final, failure is not fatal: it is the courage to continue that counts." - Winston Churchill
      </p>
    </div>
  );
};