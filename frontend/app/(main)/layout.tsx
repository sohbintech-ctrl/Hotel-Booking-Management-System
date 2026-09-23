import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/app/(main)/components/Navbar";
import Footer from "@/app/(main)/components/Footer";
import { Toaster } from "@/components/ui/sonner";


export const metadata: Metadata = {
  title: "BookIt — Slot Booking System",
  description: "Book available slots easily",
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
        <Navbar />

        <div className="flex-1">
          {children}
          <Toaster position="top-center" richColors />
        </div>

        <Footer />
    </>
  );
}