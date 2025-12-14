import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// فقط ماژول‌ها (بدون CSS)
import { EffectCreative, Pagination, Autoplay } from 'swiper/modules';

export default function FlowsSlider({ flows }) {
  
  return (
    <div className="relative w-full py-10 flex justify-center">
      <Swiper
        grabCursor={true}
        effect={'creative'}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, -400],
          },
          next: {
            translate: ['100%', 0, 0],
          },
        }}
        // تنظیمات برای حالت کارتی (Stack)
        centeredSlides={true}
        slidesPerView={'auto'}
        initialSlide={0}
        loop={true}
        speed={500}
        autoplay={{
            delay: 3000,
            disableOnInteraction: false,
        }}
        pagination={{ clickable: true, dynamicBullets: true }}
        modules={[EffectCreative, Pagination, Autoplay]}
        className="w-[280px] md:w-[320px] !overflow-visible" // سایز باکس‌ها همینجا کنترل می‌شود
      >
        {flows.map((flow, index) => {
           const themeColor = flow.style.replace('border-', '').replace('bg-', '');
           
           return (
            <SwiperSlide key={index} className="rounded-3xl">
              {({ isActive }) => (
                <div 
                  className={`relative h-[420px] rounded-3xl overflow-hidden transition-all duration-500 ease-out border border-white/50 bg-white
                  ${isActive ? 'shadow-[0_25px_60px_-12px_rgba(0,0,0,0.25)]' : 'shadow-sm opacity-50 scale-95 grayscale'}`}
                >
                  {/* === افکت نئونی دور کارت (فقط اکتیو) === */}
                  <div className={`absolute -inset-1 bg-${themeColor} opacity-0 transition-opacity duration-500 blur-xl ${isActive ? 'opacity-30' : ''}`}></div>

                  {/* === بدنه کارت === */}
                  <div className="relative h-full flex flex-col z-10">
                      
                      {/* 1. بخش تصویر/پرچم (بالا) */}
                      <div className={`relative h-[45%] bg-${themeColor}/10 overflow-hidden flex items-center justify-center`}>
                          {/* پترن پس‌زمینه */}
                          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-multiply"></div>
                          
                          {/* دایره رنگی متحرک */}
                          <div className={`absolute w-32 h-32 bg-${themeColor} rounded-full blur-[50px] opacity-40 animate-pulse`}></div>

                          {/* پرچم */}
                          <div className="relative z-10 text-6xl drop-shadow-md transform transition-transform duration-700 hover:scale-110 hover:rotate-12 cursor-default">
                              {flow.flag}
                          </div>

                          {/* نام کشور (عمودی در پس‌زمینه) */}
                          <h4 className="absolute -right-4 top-1/2 -translate-y-1/2 text-6xl font-black text-ink/5 rotate-90 select-none pointer-events-none uppercase">
                              {flow.country}
                          </h4>
                      </div>

                      {/* 2. بخش محتوا (پایین) */}
                      <div className="flex-grow bg-white/80 backdrop-blur-md p-6 flex flex-col relative">
                          
                          {/* خط جداکننده موج‌دار */}
                          <div className="absolute -top-3 left-0 w-full h-6 bg-white rounded-t-[50%] scale-x-150"></div>

                          <div className="relative z-10 pt-2 text-center">
                              <h3 className="text-2xl font-black text-ink mb-1">{flow.country}</h3>
                              <p className={`text-[10px] font-bold text-${themeColor} uppercase tracking-[0.2em] mb-6`}>Literary Collection</p>

                              {/* لیست کتاب‌ها (فشرده) */}
                              <div className="space-y-3 text-right">
                                  {flow.books.slice(0, 3).map((book, idx) => (
                                      <div key={idx} className="flex items-center gap-3 group/item">
                                          <div className={`w-1.5 h-1.5 rounded-full bg-slate-300 group-hover/item:bg-${themeColor} transition-colors`}></div>
                                          <span className="text-sm font-bold text-slate-600 group-hover/item:text-ink transition-colors truncate">
                                              {book}
                                          </span>
                                      </div>
                                  ))}
                              </div>
                          </div>

                          {/* دکمه پایین */}
                          <div className="mt-auto pt-6 flex justify-center">
                              <div className={`w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-${themeColor} hover:text-white hover:border-${themeColor} transition-all duration-300 cursor-pointer`}>
                                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                  </svg>
                              </div>
                          </div>
                      </div>
                  </div>
                </div>
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}