"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { styles } from "~/styles";

const stylesWithCssVar = (styles) => styles;

const Contact = () => {
  return (
    <>
      <Oga />
    </>
  );
};

export default Contact;

const Oga = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end end"],
  });

  const scale = useTransform(scrollYProgress, [1, 1, 1, 1], [1.9, 1.8, 1.5, 1]);
  const x = useTransform(scrollYProgress, [0.3, 1], ["-50%", "0%"]);

  /*  const opacity = useTransform(
    scrollYProgress,
    [0, 0.5, 0.6, 0.85, 0.9],
    [1, 1, 0.4, 0.4, 1]
  ); */

  const getInTouchOpacity = useTransform(
    scrollYProgress,
    [1, 1, 0.8, 0.3],
    [1, 1, 0, 0]
  );

  const contactOpacity = useTransform(
    scrollYProgress,
    [1, 0.8, 0.5],
    [1, 0, 0]
  );

  const text2Opacity = useTransform(
    scrollYProgress,
    [0.5, 0.6, 0.7],
    [0, 1, 0]
  );

  const text3Opacity = useTransform(
    scrollYProgress,
    [0.7, 0.8, 0.9, 1],
    [0.5, 1, 1, 1]
  );

  const text3Y = useTransform(
    scrollYProgress,
    [0.7, 0.8, 0.9],
    ["100px", "0px", "-150px"]
  );

  const formWidth = useTransform(
    scrollYProgress,
    [0, 0.8, 1],
    ["30%", "30%", "50%"]
  );

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
  };

  return (
    <section ref={targetRef} className="flex h-[300vh] flex-col justify-start">
      <span className="hash-span" id={"contact"}>
        &nbsp;
      </span>

      <div className="sticky top-[16.7vh] leading-[1] text-red-100">
        <div className="flex w-full justify-center">
          <motion.div
            style={{ x, scale }}
            className="h-[924px] w-[1362px] bg-contact bg-no-repeat text-2xl leading-[1] text-red-100"
          >
            <div className="translate-y-centered-offset absolute left-0 top-10 w-[1362px] p-8">
              <motion.p
                className={styles.sectionSubText}
                style={stylesWithCssVar({
                  opacity: getInTouchOpacity,
                })}
              >
                Get in touch
              </motion.p>

              <motion.p
                className={styles.sectionHeadText}
                style={stylesWithCssVar({
                  opacity: contactOpacity,
                })}
              >
                Contact.
              </motion.p>

              <motion.form className="mt-12 flex w-6/12 flex-col gap-8 text-base">
                <motion.label className="flex flex-col">
                  <span className="mb-4 font-medium text-red-100">
                    Your Name
                  </span>
                  <input
                    type="text"
                    name="contact-name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="What's your full name?"
                    className="rounded-lg border-none bg-gradient-to-r from-[#2f2035] to-[#37253d] px-6 py-4 font-medium text-red-100 outline-none placeholder:text-red-100"
                  />
                </motion.label>
                <motion.label className="flex flex-col">
                  <span className="mb-4 font-medium text-red-100">
                    Your email
                  </span>
                  <input
                    type="email"
                    name="contact-email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="What's your email?"
                    className="rounded-lg border-none bg-gradient-to-r from-[#2f2035] to-[#37253d] px-6 py-4 font-medium text-red-100 outline-none placeholder:text-red-100"
                  />
                </motion.label>
                <label className="flex flex-col">
                  <span className="mb-4 font-medium text-red-100">
                    Your Message
                  </span>
                  <textarea
                    rows={7}
                    name="contact-message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="What you want to say?"
                    className="rounded-lg border-none bg-gradient-to-r from-[#2f2035] to-[#37253d] px-6 py-4 font-medium text-red-100 outline-none placeholder:text-red-100"
                  />
                </label>
                <button
                  type="submit"
                  className="shadow-primary w-fit rounded-xl bg-gradient-to-r from-[#2f2035] to-[#37253d] px-8 py-3 font-bold text-red-100 shadow-md outline-none"
                >
                  {loading ? "Sending..." : "Send"}
                </button>
              </motion.form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
