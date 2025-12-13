import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    if (!data.name || !data.phone) {
      return new Response(JSON.stringify({ message: "اطلاعات ناقص است" }), { status: 400 });
    }

    console.log(`[Jaryan Log] New Reservation: ${data.name} - ${data.phone} - Seats: ${data.seats}`);

    await new Promise(resolve => setTimeout(resolve, 1500));

    return new Response(JSON.stringify({ 
      success: true,
      message: "رزرو با موفقیت انجام شد"
    }), { status: 200 });

  } catch (error) {
    return new Response(JSON.stringify({ message: "خطای سرور" }), { status: 500 });
  }
}