import { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import SocialLinks from "@/components/SocialLinks";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Contact \u2014 KHOA.DEV",
  description: "Get in touch with Tu Minh Khoa",
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Header */}
      <div className="flex items-center gap-3 mb-10">
        <h1 className="font-pixel text-lg text-retro-amber">GET IN TOUCH</h1>
        <div className="flex-1 h-px bg-gradient-to-r from-retro-amber/30 to-transparent" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Form */}
        <div>
          <h2 className="font-pixel text-[11px] text-retro-orange mb-4">
            SEND MESSAGE
          </h2>
          <ContactForm />
        </div>

        {/* Social links */}
        <div>
          <h2 className="font-pixel text-[11px] text-retro-orange mb-4">
            FIND ME
          </h2>
          <SocialLinks links={profile.socials} />
        </div>
      </div>
    </div>
  );
}
