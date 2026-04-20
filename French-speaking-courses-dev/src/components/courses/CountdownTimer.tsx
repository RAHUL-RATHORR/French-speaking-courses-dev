"use client";

import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  endDate: Date | string | null;
  message?: string;
  compact?: boolean;
}

export default function CountdownTimer({ 
  endDate, 
  message = "Offer expires in:", 
  compact = false 
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (!endDate) return;
    
    const targetDate = typeof endDate === 'string' ? new Date(endDate) : endDate;
    
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference <= 0) {
        // Time's up
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        return;
      }
      
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => {
      clearInterval(timer);
    };
  }, [endDate]);

  // If no endDate provided or it's invalid, use a fallback
  if (!endDate || new Date(String(endDate)) <= new Date()) {
    return null;
  }
  
  if (compact) {
    return (
      <div className="bg-slate-200 p-4 rounded-lg mb-4">
        <p className="text-center font-medium text-slate-700">{message}</p>
        <div className="flex justify-center gap-2 text-center">
          <div className="bg-slate-800 text-white w-14 p-2 rounded-lg shadow-md">
            <div className="text-xl font-bold">{timeLeft.days}</div>
            <div className="text-xs">Days</div>
          </div>
          <div className="bg-slate-800 text-white w-14 p-2 rounded-lg shadow-md">
            <div className="text-xl font-bold">{timeLeft.hours}</div>
            <div className="text-xs">Hours</div>
          </div>
          <div className="bg-slate-800 text-white w-14 p-2 rounded-lg shadow-md">
            <div className="text-xl font-bold">{timeLeft.minutes}</div>
            <div className="text-xs">Mins</div>
          </div>
          <div className="bg-slate-800 text-white w-14 p-2 rounded-lg shadow-md">
            <div className="text-xl font-bold">{timeLeft.seconds}</div>
            <div className="text-xs">Secs</div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col items-center md:items-end">
      <p className="text-gray-600 mb-3">{message}</p>
      <div className="flex space-x-3">
        <div className="bg-gray-100 px-3 py-2 rounded-lg text-center min-w-[60px]">
          <div className="text-2xl font-bold text-french-blue">{timeLeft.days}</div>
          <div className="text-xs text-gray-500">Days</div>
        </div>
        <div className="bg-gray-100 px-3 py-2 rounded-lg text-center min-w-[60px]">
          <div className="text-2xl font-bold text-french-blue">{timeLeft.hours}</div>
          <div className="text-xs text-gray-500">Hours</div>
        </div>
        <div className="bg-gray-100 px-3 py-2 rounded-lg text-center min-w-[60px]">
          <div className="text-2xl font-bold text-french-blue">{timeLeft.minutes}</div>
          <div className="text-xs text-gray-500">Mins</div>
        </div>
        <div className="bg-gray-100 px-3 py-2 rounded-lg text-center min-w-[60px]">
          <div className="text-2xl font-bold text-french-blue">{timeLeft.seconds}</div>
          <div className="text-xs text-gray-500">Secs</div>
        </div>
      </div>
    </div>
  );
}
