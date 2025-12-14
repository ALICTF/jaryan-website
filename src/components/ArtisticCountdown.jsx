import React, { useState, useEffect } from 'react';

// تابع کمکی (بیرون از کامپوننت اصلی)
const toPersianDigits = (num) => {
  const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return num.toString().split('').map((x) => farsiDigits[x]).join('');
};

// --- کامپوننت دایره زمان (بیرون از کامپوننت اصلی تعریف شده تا ری-رندر نشود) ---
const TimeCircle = ({ value, label, max, delayIndex, mounted }) => {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const targetOffset = circumference - (value / max) * circumference;
  // فقط نوار دور دایره آپدیت شود، نه کل انیمیشن ورود
  const strokeDashoffset = mounted ? targetOffset : circumference;

  return (
    <div 
      className="flex flex-col items-center mx-3 md:mx-6 group animate-fade-in-up"
      // انیمیشن فقط یک بار هنگام مانت شدن اجرا می‌شود
      style={{ 
        animationDelay: `${1.2 + (delayIndex * 0.2)}s`, 
        animationFillMode: 'forwards',
        opacity: 0 // مقدار اولیه صفر تا انیمیشن شروع شود
      }}
    >
      <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
        <svg className="absolute w-full h-full transform -rotate-90 drop-shadow-sm">
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="currentColor"
            strokeWidth="1.5"
            fill="transparent"
            className="text-ink/5"
          />
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="currentColor"
            strokeWidth="2.5"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="text-tala transition-all duration-[1000ms] ease-out"
          />
        </svg>
        
        <div className="relative z-10 flex flex-col items-center justify-center">
           <span className="text-2xl md:text-3xl font-black text-ink group-hover:scale-110 transition-transform duration-300 font-['Vazirmatn'] tracking-tight">
              {toPersianDigits(value)}
           </span>
        </div>
        
        <div className="absolute inset-0 bg-turquoise/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-50 group-hover:scale-100"></div>
      </div>
      
      <span className="mt-3 text-[10px] md:text-xs font-bold text-ink/60 uppercase tracking-widest group-hover:text-tala transition-colors duration-300">
          {label}
      </span>
    </div>
  );
};

// --- کامپوننت اصلی ---
const ArtisticCountdown = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // مانت شدن را با کمی تاخیر ست می‌کنیم تا انیمیشن stroke درست کار کند
    setTimeout(() => setMounted(true), 100);

    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex flex-wrap justify-center items-center py-4">
        {/* خط تزئینی راست */}
        <div className="hidden md:block w-0 h-px bg-gradient-to-l from-tala/50 to-transparent mx-4 animate-expand-width opacity-0" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}></div>
        
        <TimeCircle value={timeLeft.days} label="روز" max={30} delayIndex={0} mounted={mounted} />
        <TimeCircle value={timeLeft.hours} label="ساعت" max={24} delayIndex={1} mounted={mounted} />
        <TimeCircle value={timeLeft.minutes} label="دقیقه" max={60} delayIndex={2} mounted={mounted} />
        <TimeCircle value={timeLeft.seconds} label="ثانیه" max={60} delayIndex={3} mounted={mounted} />
        
        {/* خط تزئینی چپ */}
        <div className="hidden md:block w-0 h-px bg-gradient-to-r from-tala/50 to-transparent mx-4 animate-expand-width opacity-0" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}></div>
    </div>
  );
};

export default ArtisticCountdown;