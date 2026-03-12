import { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import SocialLinks from "@/components/SocialLinks";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "New Quest — KHOA.DEV",
  description: "Start a new quest with Tu Minh Khoa",
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      {/* Header */}
      <div className="flex items-center gap-3 mb-12">
        <h1 className="font-pixel text-2xl font-bold text-retro-amber">START A NEW QUEST</h1>
        <div className="flex-1 h-px bg-gradient-to-r from-retro-amber/30 to-transparent" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Form */}
        <div>
          <h2 className="font-pixel text-base font-semibold text-retro-orange mb-5">
            QUEST DETAILS
          </h2>
          <ContactForm />
        </div>

        {/* Social links */}
        <div>
          <h2 className="font-pixel text-base font-semibold text-retro-orange mb-5">
            CONNECT
          </h2>
          <div className="border border-retro-brown/15 bg-retro-card/20 p-5">
            <SocialLinks links={profile.socials} />
          </div>
        </div>
      </div>
    </div>
  );
}
