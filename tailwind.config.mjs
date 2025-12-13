/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Vazirmatn', 'sans-serif'],
                // فونت نستعلیق برای تیترهای خاص (اگر در سیستم کاربر باشد لود می‌شود، وگرنه وزیر)
                'nastaliq': ['IranNastaliq', 'Vazirmatn', 'serif'], 
			},
            colors: {
                'lajevard': '#1e3a8a',   // لاجوردی (سرمه‌ای عمیق کاشی‌ها)
                'firoozeh': '#0ea5e9',   // فیروزه‌ای (آسمانی روشن)
                'firoozeh-dark': '#0284c7', // فیروزه‌ای تیره
                'ajor': '#b45309',       // آجری (رنگ خاک و گرما)
                'kashi': '#f0f9ff',      // سفید یخچالی (زمینه کاشی)
                'tala': '#d97706',       // طلایی (برای تذهیب)
            },
            backgroundImage: {
                // پترن‌های اسلیمی و گره‌چینی (لینک‌های پایدار)
                'eslimi': "url('https://www.transparenttextures.com/patterns/arabesque.png')",
                'girih': "url('https://www.transparenttextures.com/patterns/black-scales.png')", // شبیه پولک یا گره
            },
            boxShadow: {
                'glaze': '0 4px 14px 0 rgba(14, 165, 233, 0.39)', // درخشش لعاب کاشی
            }
		},
	},
	plugins: [],
}