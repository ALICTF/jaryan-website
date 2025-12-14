import React, { useState, useEffect } from 'react';

export default function HeaderNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // تشخیص اسکرول برای تغییر پس‌زمینه
      setIsScrolled(window.scrollY > 20);

      // محاسبه نوار پیشرفت
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));
    };
    
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'معرفی', href: '#about', delay: '100ms' },
    { name: 'بنیان‌گذاران', href: '#founders', delay: '200ms' },
    { name: 'جریان‌ها', href: '#flows', delay: '300ms' },
    { name: 'تماس', href: '#contact', delay: '400ms' },
  ];

  // --- تنظیمات استایل ---
  // رنگ متن و اجزا همیشه مشکی است (طبق درخواست شما)
  const textColor = 'text-black';
  const burgerColor = 'bg-black';
  const borderColor = 'border-black';

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
        ${isScrolled 
            ? 'bg-[#F9F7F1]/90 backdrop-blur-lg py-3 shadow-lg border-b border-black/5' // حالت اسکرول: زمینه کاغذی مات
            : (mobileMenuOpen ? 'bg-transparent' : 'bg-transparent py-6') // حالت بالا: کاملا شفاف (اما متن مشکی)
        }`}
      >
        {/* نوار پیشرفت طلایی */}
        <div 
            className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent z-50 transition-all duration-100 ease-out opacity-0"
            style={{ width: `${scrollProgress * 100}%`, opacity: isScrolled ? 1 : 0 }}
        ></div>

        <div className="container mx-auto px-6 my-3 flex justify-between items-center relative">
          
          {/* --- لوگو --- */}
          <div className="flex items-center gap-3 relative z-50 group cursor-pointer">
              <div className={`w-12 h-12 rounded-xl rotate-45 flex items-center justify-center border-2 transition-all duration-700 bg-white border-black shadow-none group-hover:shadow-lg`}>
                  
                  <span className={`-rotate-45 font-black text-2xl mb-1 transition-colors duration-500 text-black`}>
                    جـ
                  </span>
              </div>
              <div className="flex flex-col">
                  <h1 className={`text-2xl font-black tracking-tighter transition-colors duration-500 ${textColor}`}>
                      جـریـان.
                  </h1>
              </div>
          </div>

          {/* --- منوی دسکتاپ --- */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href} 
                className={`text-sm font-bold relative group py-2 ${textColor}`}
              >
                {link.name}
                {/* نقطه طلایی هاور */}
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-yellow-500 opacity-0 group-hover:opacity-100 group-hover:w-full transition-all duration-300 h-[2px]`}></span>
              </a>
            ))}
            
            <a href="#contact" className={`mr-2 px-6 py-2.5 rounded-xl font-bold text-sm border-2 border-black text-black hover:bg-black hover:text-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1 active:translate-y-0`}>
                پیوستن
            </a>
          </div>

          {/* --- دکمه همبرگری --- */}
          <button 
            className="md:hidden z-50 p-2 focus:outline-none group relative"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="منو"
          >
            <div className="w-8 h-6 flex flex-col justify-between relative overflow-hidden">
              <span className={`block h-0.5 w-full rounded-full transition-all duration-500 origin-right delay-75 ${burgerColor} 
                  ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
              
              <span className={`block h-0.5 w-full rounded-full transition-all duration-500 ${burgerColor} 
                  ${mobileMenuOpen ? 'translate-x-full opacity-0' : ''}`}></span>
              
              <span className={`block h-0.5 w-full rounded-full transition-all duration-500 origin-right delay-75 ${burgerColor} 
                  ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            </div>
          </button>

        </div>
      </nav>

      {/* --- منوی موبایل --- */}
      <div 
        className={`fixed inset-0 z-40 bg-[#F9F7F1] transition-transform duration-700 ease-[cubic-bezier(0.86,0,0.07,1)] flex flex-col justify-center items-center
        ${mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}
      >
            <div className="absolute inset-0 opacity-5 pointer-events-none" 
                 style={{backgroundImage: "url('https://www.transparenttextures.com/patterns/arabesque.png')"}}>
            </div>
            
            <div className="flex flex-col items-center space-y-8 w-full px-6 relative z-10">
                {navLinks.map((link, idx) => (
                    <a 
                        key={link.name}
                        href={link.href} 
                        onClick={() => setMobileMenuOpen(false)}
                        style={{ transitionDelay: `${mobileMenuOpen ? idx * 100 + 200 : 0}ms` }}
                        className={`text-4xl font-black text-black hover:text-cyan-600 transition-all duration-700 transform
                        ${mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                    >
                        {link.name}
                    </a>
                ))}
            </div>

            <div className={`mt-12 w-24 h-px bg-black/10 transition-all duration-1000 delay-500 ${mobileMenuOpen ? 'scale-x-100' : 'scale-x-0'}`}></div>
            
            <div className={`mt-6 text-sm text-gray-400 font-bold transition-all duration-700 delay-700 ${mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                گروه ادبی جریان
            </div>
      </div>
    </>
  );
}