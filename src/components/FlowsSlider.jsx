import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Pagination, Autoplay } from 'swiper/modules';

export default function FlowsSlider({ flows }) {
  
  return (
    <div className="relative w-full py-10 flex justify-center items-center">
      <Swiper
        effect={'cards'}
        grabCursor={true}
        cardsEffect={{
            perSlideOffset: 15,
            perSlideRotate: 4,
            slideShadows: true,
        }}
        autoplay={{
            delay: 4000,
            disableOnInteraction: false,
        }}
        pagination={{ clickable: true, dynamicBullets: true }}
        modules={[EffectCards, Pagination, Autoplay]}
        className="w-[280px] md:w-[320px] h-[480px]"
      >
        {flows.map((flow, index) => {
           const isRed = flow.style.includes('red') || flow.style.includes('rose');
           // const themeColor = isRed ? 'ajor' : 'lajevard'; // (استفاده نشده اما اگر نیاز دارید نگه دارید)
           
           return (
            <SwiperSlide key={index} className="rounded-2xl">
              <div className="relative w-full h-full bg-[#FDFCF8] rounded-2xl overflow-hidden border-4 border-lajevard/20 shadow-2xl flex flex-col">
                  
                  {/* حاشیه تذهیب */}
                  <div className="absolute inset-2 border border-tala/40 rounded-xl pointer-events-none z-20"></div>
                  <div className="absolute inset-3 border border-lajevard/10 rounded-lg pointer-events-none z-20"></div>

                  {/* سرلوحه (Header) */}
                  <div className="h-[40%] bg-lajevard relative flex flex-col items-center justify-center p-4 overflow-hidden">
                      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>
                      
                      {/* ترنج مرکزی */}
                      <div className="relative w-24 h-24 flex items-center justify-center">
                          <div className="absolute inset-0 bg-tala/20 rotate-45 rounded-lg backdrop-blur-sm border border-tala/50 animate-spin-slow-reverse"></div>
                          <div className="absolute inset-0 bg-firoozeh/20 -rotate-12 rounded-lg backdrop-blur-sm border border-firoozeh/50 animate-spin-slow"></div>
                          
                          <div className="relative z-10 text-5xl drop-shadow-lg grayscale-[20%]">
                              {flow.flag}
                          </div>
                      </div>

                      <h4 className="mt-4 text-2xl font-black text-tala drop-shadow-md tracking-wider z-10 font-['Vazirmatn']">
                          {flow.country}
                      </h4>
                      
                      <div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-lajevard via-tala to-lajevard"></div>
                  </div>

                  {/* بدنه کتاب */}
                  <div className="flex-grow p-6 relative bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]">
                      
                      <div className="text-center mb-4">
                           <span className="text-xs font-bold text-lajevard/60 bg-lajevard/5 px-3 py-1 rounded-full border border-lajevard/10">
                               منتخب آثار
                           </span>
                      </div>

                      <ul className="space-y-3 relative z-10">
                          {flow.books.slice(0, 4).map((book, idx) => (
                              <li key={idx} className="flex items-center gap-3 group/book cursor-default">
                                  <div className="w-2 h-2 rotate-45 bg-tala group-hover/book:bg-firoozeh transition-colors duration-300"></div>
                                  <span className="text-ink/80 font-bold text-sm leading-relaxed group-hover/book:text-lajevard transition-colors duration-300">
                                      {book}
                                  </span>
                              </li>
                          ))}
                      </ul>

                      {/* اصلاح باگ class -> className در اینجا */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-30">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-lajevard">
                              <path d="M12 2L14.5 9.5H22L16 14.5L18.5 22L12 17.5L5.5 22L8 14.5L2 9.5H9.5L12 2Z"/>
                          </svg>
                      </div>
                  </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}