"use client";

import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { twMerge } from "tailwind-merge";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={twMerge(
        pending ? "cursor-not-allowed opacity-50" : "",
        "shadow-primary w-full rounded-xl bg-gradient-to-r from-[#2f2035] to-[#37253d] px-8 py-3 font-bold text-red-100 shadow-md outline-none lg:w-fit"
      )}
    >
      Send
    </button>
  );
};

export default SubmitButton;
