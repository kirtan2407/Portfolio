"use server";

import { Resend } from "resend";

// You will need to add RESEND_API_KEY to your .env.local
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { error: "Please fill out all fields." };
  }

  try {
    const data = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // update to your verified domain later
      to: ["kirtankankotiya24@gmail.com"],
      subject: `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    return { success: true, data };
  } catch (error: any) {
    return { error: error.message || "Failed to send message." };
  }
}
