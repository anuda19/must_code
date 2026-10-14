import type { Metadata } from "next";
import Hero from "@/src/app/components/Hero";
import Navbar from "./components/Navigation";

export const metadata: Metadata = {
  title: "Skillgist — Personalized interview preparation for engineers",
  description:
    "Assess your skills against a specific role and company, see your gaps, and follow an AI-adapted preparation plan with realistic mock interviews.",
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
    </>
  );
}
