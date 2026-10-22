import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Toaster } from "react-hot-toast";
import SessionWrapper from "@/components/SessionWrapper";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Cartify | High-End Consumer Electronics & Lifestyle",
  description: "Curated electronics, tech devices, and essentials with verified merchant delivery.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionWrapper>
          <Header />
          <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            toastOptions={{
              className: "",
              duration: 3000,
              removeDelay: 1000,
              style: {
                background: "#0f172a",
                color: "#fff",
              },
            }}
          />
          <main className="bg-slate-50/60">{children}</main>
          <Footer/>
        </SessionWrapper>
      </body>
    </html>
  );
}
