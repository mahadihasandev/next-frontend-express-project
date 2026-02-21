"use client";
import React from "react";
import { MapPin, Phone, Mail, User, Send } from "lucide-react";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-orange-200 selection:text-orange-900">
      {/* Hero Header */}
      <section className="bg-white py-16 md:py-24 border-b border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 rounded-full bg-orange-50 blur-3xl opacity-70 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 rounded-full bg-orange-50 blur-3xl opacity-70 pointer-events-none"></div>

        <div className="container mx-auto px-6 text-center max-w-3xl relative z-10">
          <span className="text-orange-600 font-bold mb-4 uppercase tracking-wider text-sm block">
            Contact Us
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            We&apos;d love to hear from you
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed font-medium">
            Whether you have a question about features, pricing, need a demo, or
            anything else, our team is ready to answer all your questions.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Contact Details & Info */}
            <div className="flex flex-col justify-start">
              <h2 className="text-3xl font-bold text-slate-900 mb-8">
                Get in touch
              </h2>
              <p className="text-slate-500 mb-10 leading-relaxed">
                Reach out to us directly via email or phone. We&apos;re always
                open to discussing new projects, creative ideas or opportunities
                to be part of your visions.
              </p>

              <div className="space-y-8">
                <div className="flex items-start group">
                  <div className="shrink-0 bg-white p-3 rounded-2xl text-orange-500 mr-5 shadow-sm border border-slate-100 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Name
                    </h3>
                    <p className="text-lg font-bold text-slate-800">
                      Magadi Hasan
                    </p>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="shrink-0 bg-white p-3 rounded-2xl text-orange-500 mr-5 shadow-sm border border-slate-100 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="w-full overflow-hidden">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Email
                    </h3>
                    <a
                      href="mailto:mayhaydihasan.com@gmail.com"
                      className="text-lg font-bold text-slate-800 hover:text-orange-600 transition-colors block truncate"
                    >
                      mayhaydihasan.com@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="shrink-0 bg-white p-3 rounded-2xl text-orange-500 mr-5 shadow-sm border border-slate-100 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Phone
                    </h3>
                    <a
                      href="tel:0735696417"
                      className="text-lg font-bold text-slate-800 hover:text-orange-600 transition-colors"
                    >
                      0735696417
                    </a>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="shrink-0 bg-white p-3 rounded-2xl text-orange-500 mr-5 shadow-sm border border-slate-100 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Address
                    </h3>
                    <p className="text-lg font-bold text-slate-800">
                      Asulia, Savar,
                      <br />
                      Dhaka
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                Send us a message
              </h3>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="firstName"
                      className="text-sm font-semibold text-slate-700"
                    >
                      First name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      placeholder="John"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all placeholder:text-slate-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="lastName"
                      className="text-sm font-semibold text-slate-700"
                    >
                      Last name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      placeholder="Doe"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all placeholder:text-slate-400"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Your message
                  </label>
                  <textarea
                    id="message"
                    rows="5"
                    placeholder="Tell us how we can help you..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all resize-none placeholder:text-slate-400"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-[0_4px_14px_0_rgba(249,115,22,0.39)] hover:shadow-[0_6px_20px_rgba(249,115,22,0.23)] hover:-translate-y-0.5"
                >
                  <span>Send Message</span>
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
