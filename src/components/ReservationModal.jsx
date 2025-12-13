import React, { useState } from 'react';

export default function ReservationModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', seats: 1 });
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      const response = await fetch('/api/reserve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Network error');
      
      setStatus('success');
      // بستن مودال بعد از ۲ ثانیه
      setTimeout(() => {
        setIsOpen(false);
        setStatus('idle');
        setFormData({ name: '', phone: '', seats: 1 });
      }, 2000);
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <>
      {/* دکمه اصلی فراخوان */}
      <button 
        onClick={() => setIsOpen(true)}
        className="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white transition-all duration-200 bg-indigo-600 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 shadow-lg hover:shadow-xl hover:-translate-y-1"
      >
        <span>رزرو صندلی در نشست بعدی</span>
        <svg className="w-5 h-5 mr-2 -ml-1 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
      </button>

      {/* پس‌زمینه مودال (Backdrop) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm transition-opacity duration-300" onClick={() => setIsOpen(false)}>
          
          {/* باکس مودال */}
          <div 
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative transform transition-all scale-100" 
            onClick={e => e.stopPropagation()}
          >
            {/* هدر */}
            <div className="bg-indigo-600 p-6 flex justify-between items-center text-white">
              <h3 className="text-xl font-bold">فرم اعلام حضور</h3>
              <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white text-2xl font-bold">&times;</button>
            </div>

            {/* بدنه فرم */}
            <div className="p-8">
              {status === 'success' ? (
                <div className="text-center py-6 animate-pulse">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <p className="text-lg font-bold text-slate-800">رزرو شما ثبت شد!</p>
                  <p className="text-sm text-slate-500 mt-2">منتظر دیدار شما هستیم.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-slate-700 text-sm font-bold mb-2">نام و نام خانوادگی</label>
                    <input 
                      type="text" 
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      placeholder="مثال: کوروش بزرگ"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 text-sm font-bold mb-2">شماره تماس</label>
                    <input 
                      type="tel" 
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      placeholder="0912..."
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 text-sm font-bold mb-2">تعداد نفرات</label>
                    <select 
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                      value={formData.seats}
                      onChange={e => setFormData({...formData, seats: Number(e.target.value)})}
                    >
                      {[1, 2, 3, 4, 5].map(num => <option key={num} value={num}>{num} نفر</option>)}
                    </select>
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={status === 'submitting'}
                    className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700 transition duration-300 shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                  >
                    {status === 'submitting' ? (
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    ) : 'تایید و ثبت نهایی'}
                  </button>
                  {status === 'error' && <p className="text-red-500 text-sm text-center">خطایی رخ داد. لطفا دوباره تلاش کنید.</p>}
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}