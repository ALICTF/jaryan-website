import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

// --- کامپوننت اینپوت (بیرون آورده شد تا مشکل تایپ حل شود) ---
const InputField = ({ label, name, type, placeholder, value, onChange, errorText, isFocused, onFocus, onBlur }) => (
  <div className="relative group pb-4">
    <label className={`block text-sm font-bold mb-2 transition-colors duration-300 ${errorText ? 'text-red-500' : (isFocused ? 'text-tala' : 'text-ink/70')}`}>
      {label}
    </label>

    <div className={`relative overflow-hidden rounded-xl border-2 transition-all duration-500 
          ${errorText ? 'border-red-400 bg-red-50' :
        (isFocused ? 'border-tala shadow-[0_0_15px_rgba(217,119,6,0.2)]' : 'border-ink/10 group-hover:border-ink/30')}`}>

      <input
        type={type}
        className="w-full px-4 py-3.5 bg-white/50 focus:bg-white focus:outline-none transition-all text-ink placeholder-ink/30 font-['Vazirmatn']"
        placeholder={placeholder}
        value={value}      // مقدار از پراپس می‌آید
        onChange={onChange} // تابع تغییر از پراپس می‌آید
        onFocus={onFocus}
        onBlur={onBlur}
      />

      {/* خط نورانی زیر اینپوت */}
      <div className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r transition-all duration-700 
              ${errorText ? 'from-red-500 via-red-400 to-red-500 w-full opacity-100' :
          (isFocused ? 'from-transparent via-tala to-transparent w-full opacity-100' : 'w-0 opacity-0')}`}>
      </div>
    </div>

    {errorText && (
      <p className="absolute bottom-0 right-0 text-xs text-red-500 font-medium mt-1 animate-fade-in">
        {errorText}
      </p>
    )}
  </div>
);

// --- کامپوننت اصلی ---
export default function ReservationModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', seats: 1 });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [mounted, setMounted] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const validateForm = () => {
    let newErrors = {};
    const nameRegex = /^[\u0600-\u06FF\s]{3,}$/;

    if (!formData.name.trim()) {
      newErrors.name = "لطفا نام خود را وارد کنید.";
    } else if (!nameRegex.test(formData.name)) {
      newErrors.name = "لطفا فقط از حروف فارسی استفاده کنید (حداقل ۳ حرف).";
    }

    const phoneRegex = /^09[0-9]{9}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "لطفا شماره تماس را وارد کنید.";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "فرمت شماره همراه صحیح نیست (مثال: 09123456789).";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus('submitting');

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStatus('success');
      setTimeout(() => {
        setIsOpen(false);
        setStatus('idle');
        setFormData({ name: '', phone: '', seats: 1 });
        setErrors({});
      }, 2500);
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  // هندلر تغییر ورودی‌ها
  const handleInputChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
    if (errors[field]) setErrors({ ...errors, [field]: null });
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-lajevard/40 backdrop-blur-sm transition-opacity duration-500 animate-fade-in"
      onClick={() => setIsOpen(false)}
      style={{ perspective: '1000px' }}
    >
      <div
        className="bg-[#F9F7F1] rounded-[30px] shadow-2xl w-full max-w-md relative transition-all duration-700 animate-slide-up-elastic overflow-hidden border-[3px] border-tala/30 will-change-transform"
        onClick={e => e.stopPropagation()}
        style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cream-paper.png')" }}
      >
        {/* --- هدر --- */}
        <div className="relative h-32 bg-gradient-to-b from-[#FFFBF0] to-[#F2EBD9] overflow-hidden rounded-t-[26px] border-b border-tala/20">
          <div className="absolute inset-0 opacity-[0.07] bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] mix-blend-multiply animate-pulse-slow"></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-20 bg-tala/20 blur-2xl rounded-full mix-blend-multiply"></div>
          <svg className="absolute bottom-0 w-full h-16 text-[#F9F7F1]" preserveAspectRatio="none" viewBox="0 0 100 100">
            <path d="M0 100 C 20 0, 80 0, 100 100 Z" fill="currentColor" />
          </svg>
          <div className="relative z-10 flex justify-between items-center p-6 text-ink">
            <h3 className="text-2xl font-black tracking-tight drop-shadow-sm">فرم اعلام حضور</h3>
            <button onClick={() => setIsOpen(false)} className="text-ink/50 hover:text-red-600 hover:rotate-90 transition-all duration-300 text-4xl leading-none">&times;</button>
          </div>
        </div>

        {/* --- بدنه --- */}
        <div className="p-8 relative z-10 pt-4">
          {status === 'success' ? (
            <div className="text-center py-10 animate-fade-in-up">
              <div className="w-24 h-24 bg-gradient-to-tr from-turquoise to-lajevard rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-bounce-slow relative">
                <div className="absolute inset-0 bg-tala/30 rounded-full blur-xl animate-pulse"></div>
                <svg className="w-12 h-12 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <p className="text-2xl font-black text-ink mb-3 drop-shadow-sm">رزرو شما ثبت شد!</p>
              <p className="text-ink/70 text-lg font-medium">مشتاق دیدار شما در محفل گرم جریان هستیم.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-right" dir="rtl" noValidate>

              {/* استفاده از کامپوننت InputField که حالا بیرون تعریف شده */}
              <InputField
                label="نام و نام خانوادگی"
                name="name"
                type="text"
                placeholder="مثال: سهراب سپهری"
                value={formData.name}
                onChange={(e) => handleInputChange(e, 'name')}
                errorText={errors.name}
                isFocused={focusedInput === 'name'}
                onFocus={() => setFocusedInput('name')}
                onBlur={() => setFocusedInput(null)}
              />

              <InputField
                label="شماره تماس"
                name="phone"
                type="tel"
                placeholder="0912..."
                value={formData.phone}
                onChange={(e) => handleInputChange(e, 'phone')}
                errorText={errors.phone}
                isFocused={focusedInput === 'phone'}
                onFocus={() => setFocusedInput('phone')}
                onBlur={() => setFocusedInput(null)}
              />

              <div className="relative group pt-2">
                <label className="block text-sm font-bold mb-2 text-ink/70 group-hover:text-tala transition-colors">تعداد نفرات</label>
                <div className="relative overflow-hidden rounded-xl border-2 border-ink/10 group-hover:border-tala/50 transition-all duration-300 bg-white/50">
                  <select
                    className="w-full px-4 py-3.5 appearance-none text-ink bg-transparent focus:outline-none cursor-pointer font-['Vazirmatn'] relative z-10"
                    value={formData.seats}
                    onChange={e => setFormData({ ...formData, seats: Number(e.target.value) })}
                  >
                    {[1, 2, 3, 4, 5].map(num => <option key={num} value={num}>{num} نفر (همراه با پذیرایی)</option>)}
                  </select>
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-ink/50 group-hover:text-tala transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-gradient-to-r from-lajevard to-[#1e3a8a] text-white font-bold py-4 rounded-xl hover:shadow-[0_10px_25px_rgba(30,58,138,0.4)] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-3 group relative overflow-hidden transition-all duration-300 mt-8"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 skew-x-12"></div>

                {status === 'submitting' ? (
                  <>
                    <svg className="animate-spin h-6 w-6 text-tala" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    <span className="text-lg">در حال اعتبارسنجی...</span>
                  </>
                ) : (
                  <>
                    <span className="text-lg relative z-10">تایید و نهایی‌سازی</span>
                    <svg className="w-6 h-6 transition-transform group-hover:-translate-x-2 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="group relative inline-flex items-center justify-center px-8 py-3.5 text-lg font-bold text-white transition-all duration-300 bg-gradient-to-r from-lajevard to-[#1e3a8a] rounded-full hover:shadow-[0_10px_25px_rgba(30,58,138,0.4)] hover:-translate-y-1 overflow-hidden"
      >
        <span className="relative z-10 flex items-center gap-2">
          <span>رزرو صندلی</span>
          <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        </span>
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"></div>
      </button>

      {mounted && isOpen && createPortal(modalContent, document.body)}

      // ✅ درست
      <style>{`
  @keyframes slideUpElastic {
    0% { opacity: 0; transform: translateY(100px) scale(0.8); }
    60% { opacity: 1; transform: translateY(-20px) scale(1.02); }
    100% { opacity: 1; transform: translateY(0) scale(1); }
  }
  .animate-slide-up-elastic {
    animation: slideUpElastic 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }

  @keyframes bounceSlow {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  .animate-bounce-slow {
    animation: bounceSlow 3s ease-in-out infinite;
  }
  
  @keyframes pulseSlow {
      0%, 100% { opacity: 0.05; }
      50% { opacity: 0.15; }
  }
  .animate-pulse-slow {
      animation: pulseSlow 6s ease-in-out infinite;
  }
`}</style>
    </>
  );
}