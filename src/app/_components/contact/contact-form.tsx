import React from "react";
import { env } from "~/env.mjs";

import SubmitButton from "./submit";

const ContactForm = () => {
  async function contactMe(formData: FormData) {
    "use server";

    if (
      !formData.has("name") ||
      !formData.has("email") ||
      !formData.has("message")
    ) {
      return;
    }

    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    if (name?.length === 0 || email?.length === 0 || message?.length === 0) {
      return;
    }

    const webhookBody = {
      embeds: [
        {
          title: "Contact Form",
          fields: [
            { name: "Sender", value: `${name} - ${email}` },
            { name: "Message", value: message },
          ],
        },
      ],
    };

    const response = await fetch(env.DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(webhookBody),
    });
  }

  return (
    <form action={contactMe} className="flex flex-col gap-4">
      <label className="flex flex-col">
        <span className="mb-4 font-medium text-red-100">Your Name</span>
        <input
          type="text"
          name="name"
          placeholder="What's your full name?"
          className="rounded-lg border-none bg-gradient-to-r from-[#2f2035] to-[#37253d] px-6 py-4 font-medium text-red-100 outline-none placeholder:text-red-100"
        />
      </label>
      <label className="flex flex-col">
        <span className="mb-4 font-medium text-red-100">Your email</span>
        <input
          type="email"
          name="email"
          placeholder="What's your email?"
          className="rounded-lg border-none bg-gradient-to-r from-[#2f2035] to-[#37253d] px-6 py-4 font-medium text-red-100 outline-none placeholder:text-red-100"
        />
      </label>
      <label className="flex flex-col">
        <span className="mb-4 font-medium text-red-100">Your Message</span>
        <textarea
          name="message"
          rows={7}
          placeholder="What you want to say?"
          className="rounded-lg border-none bg-gradient-to-r from-[#2f2035] to-[#37253d] px-6 py-4 font-medium text-red-100 outline-none placeholder:text-red-100"
        />
      </label>

      <SubmitButton />
    </form>
  );
};

export default ContactForm;
