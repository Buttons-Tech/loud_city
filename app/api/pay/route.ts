import { NextResponse } from 'next/server';
import crypto from 'crypto';

// --- TYPES ---
interface PaymentRequest {
  amount: number;
  orderId: string;
  customerName: string;
  itemDescription: string;
}

export async function POST(req: Request) {
  try {
    const body: PaymentRequest = await req.json();
    const { amount, orderId, customerName, itemDescription } = body;

    // 1. Prepare OPay Payload
    const payload = {
      amount: {
        total: (amount * 100).toString(), // OPay often expects amounts in kobo/cents
        currency: "NGN"
      },
      reference: orderId,
      returnUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/tracking/${orderId}`,
      callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/webhook/opay`,
      expireAt: 30, // Link expires in 30 mins
      userInfo: {
        userEmail: "customer@solace.app", // Use actual email if available
        userName: customerName
      },
      productDesc: itemDescription
    };

    // 2. Generate Signature (Security requirement for OPay)
    const authData = JSON.stringify(payload);
    const signature = crypto
      .createHmac('sha512', process.env.OPAY_SECRET_KEY!)
      .update(authData)
      .digest('hex');

    // 3. Request OPay Checkout URL
    const response = await fetch('https://api.opaycheckout.com/api/v1/international/cashier/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPAY_PUBLIC_KEY}`,
        'MerchantId': process.env.OPAY_MERCHANT_ID!,
        'Signature': signature
      },
      body: authData,
    });

    const data = await response.json();

    if (data.code === "00000") {
      // Success: Return the payment URL to the frontend
      return NextResponse.json({ url: data.data.cashierUrl });
    } else {
      console.error("OPay Error:", data.message);
      return NextResponse.json({ error: "Failed to initialize payment" }, { status: 500 });
    }
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}