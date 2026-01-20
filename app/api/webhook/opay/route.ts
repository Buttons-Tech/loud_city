import { NextResponse } from 'next/server';
import crypto from 'crypto';

// --- TYPES ---
interface OPayWebhookBody {
  payload: {
    reference: string;
    amount: string;
    status: 'SUCCESS' | 'FAIL' | 'PENDING';
    orderNo: string;
  };
  sha512: string; // The signature sent by OPay to verify authenticity
}

export async function POST(req: Request) {
  try {
    const body: OPayWebhookBody = await req.json();
    const { payload, sha512 } = body;

    // 1. VERIFY SIGNATURE (Security Check)
    // We recreate the hash using our Secret Key to ensure hackers didn't send this
    const secret = process.env.OPAY_SECRET_KEY!;
    const calculatedHash = crypto
      .createHmac('sha512', secret)
      .update(JSON.stringify(payload))
      .digest('hex');

    if (calculatedHash !== sha512) {
      console.error("❌ Invalid Webhook Signature Detected!");
      return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
    }

    // 2. PROCESS THE STATUS
    if (payload.status === 'SUCCESS') {
      console.log(`✅ Payment Verified for Order: ${payload.reference}`);

      // LOGIC: Update your Database here
      // await db.order.update({ 
      //    where: { id: payload.reference }, 
      //    data: { paid: true, status: 'dispatched' } 
      // });

      // LOGIC: Trigger Vendor Notification
      // await sendVendorWhatsApp(payload.reference);
      
      return NextResponse.json({ code: "00000", message: "SUCCESS" });
    }

    return NextResponse.json({ message: "Status acknowledged" });
  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}