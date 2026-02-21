"use client";
import React from "react";
import { MapPin, Phone, Mail, User } from "lucide-react";

const AboutPage = () => {
  const timelineSteps = [
    {
      title: "1. Initial Consultation",
      description: "We discuss your specific needs and gather requirements.",
    },
    {
      title: "2. Custom Strategy",
      description: "Our team designs a tailored approach for your goals.",
    },
    {
      title: "3. Execution & Delivery",
      description: "We implement the solution with precision and speed.",
    },
    {
      title: "4. Ongoing Support",
      description: "Continuous assistance to ensure lasting success.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-orange-200 selection:text-orange-900">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden bg-white">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-orange-100 blur-3xl opacity-50 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-orange-50 blur-3xl opacity-50 pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          <span className="inline-block py-1 px-4 rounded-full bg-orange-100 text-orange-600 font-bold text-sm mb-6 uppercase tracking-wider shadow-sm border border-orange-200">
            About Us
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-6 tracking-tight">
            Crafting{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-400">
              Beautiful
            </span>{" "}
            Experiences
          </h1>
          <p className="text-lg md:text-xl text-slate-500 mb-10 leading-relaxed font-medium">
            We are dedicated to providing top-notch custom solutions with a
            focus on quality, design, and robust functionality. Let&apos;s build
            something great together.
          </p>
        </div>
      </section>

      {/* Timeline Section for Customers */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Customer Journey
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              Our streamlined process ensures that every custom solution is
              delivered perfectly, from the first hello to the final launch.
            </p>
          </div>

          <div className="relative border-l-4 border-orange-200 ml-4 md:ml-0 md:mx-auto md:w-full md:grid md:grid-cols-2 md:gap-8 md:border-l-0">
            {/* Center line for desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-orange-200 -translate-x-1/2 rounded-full"></div>

            {timelineSteps.map((step, index) => (
              <div
                key={index}
                className={`relative pl-8 md:pl-0 mb-12 md:mb-16 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12 md:col-start-2"}`}
              >
                {/* Timeline Dot */}
                <div
                  className={`absolute left-[-11px] top-1 md:top-2 w-6 h-6 rounded-full bg-orange-500 border-4 border-white shadow-md ${index % 2 === 0 ? "md:left-auto md:-right-[14px]" : "md:-left-[14px]"}`}
                ></div>

                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 group">
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-orange-600 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map & Contact Section */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
            {/* Contact Info */}
            <div className="flex flex-col justify-center">
              <span className="text-orange-600 font-bold mb-3 uppercase tracking-wider text-sm">
                Get In Touch
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-10 tracking-tight">
                Let&apos;s start a conversation
              </h2>

              <div className="space-y-6">
                <div className="flex items-start p-5 rounded-3xl bg-slate-50 border border-slate-100 shadow-sm hover:shadow-md transition-all hover:border-orange-200 group">
                  <div className="flex-shrink-0 bg-white p-4 rounded-2xl text-orange-500 mr-6 shadow-sm border border-slate-100 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                    <User className="w-6 h-6" />
                  </div>
                  <div className="pt-1">
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-2">
                      Name
                    </p>
                    <p className="text-xl font-bold text-slate-800">
                      Magadi Hasan
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-5 rounded-3xl bg-slate-50 border border-slate-100 shadow-sm hover:shadow-md transition-all hover:border-orange-200 group pointer-events-none lg:pointer-events-auto">
                  <div className="flex-shrink-0 bg-white p-4 rounded-2xl text-orange-500 mr-6 shadow-sm border border-slate-100 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div className="pt-1 w-full overflow-hidden">
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-2">
                      Email
                    </p>
                    <a
                      href="mailto:mayhaydihasan.com@gmail.com"
                      className="text-xl font-bold text-slate-800 hover:text-orange-600 transition-colors pointer-events-auto truncate block w-full"
                    >
                      mayhaydihasan.com@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start p-5 rounded-3xl bg-slate-50 border border-slate-100 shadow-sm hover:shadow-md transition-all hover:border-orange-200 group">
                  <div className="flex-shrink-0 bg-white p-4 rounded-2xl text-orange-500 mr-6 shadow-sm border border-slate-100 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div className="pt-1">
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-2">
                      Phone
                    </p>
                    <a
                      href="tel:0735696417"
                      className="text-xl font-bold text-slate-800 hover:text-orange-600 transition-colors pointer-events-auto"
                    >
                      0735696417
                    </a>
                  </div>
                </div>

                <div className="flex items-start p-5 rounded-3xl bg-slate-50 border border-slate-100 shadow-sm hover:shadow-md transition-all hover:border-orange-200 group">
                  <div className="flex-shrink-0 bg-white p-4 rounded-2xl text-orange-500 mr-6 shadow-sm border border-slate-100 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div className="pt-1">
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-2">
                      Address
                    </p>
                    <p className="text-xl font-bold text-slate-800">
                      Asulia, Savar, Dhaka
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-slate-50 p-4 rounded-[2rem] shadow-sm border border-slate-100 h-[500px] lg:h-auto min-h-[500px] relative overflow-hidden group hover:shadow-xl transition-all duration-300">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58356.1264882193!2d90.27318712395563!3d23.915770308307018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755e8802d3cc45b%3A0xc3f8eec4a0cdef8c!2sAshulia!5e0!3m2!1sen!2sbd!4v1714570000000!5m2!1sen!2sbd"
                className="w-full h-full rounded-[1.5rem] filter grayscale-[0.8] contrast-[1.1] opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps location of Ashulia, Savar, Dhaka"
              ></iframe>
              <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-slate-900/5 rounded-[2rem]"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
