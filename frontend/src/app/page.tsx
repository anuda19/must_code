import type { Metadata } from "next";
import Hero from "@/src/app/components/Hero";
import Navbar from "./components/Navigation";
import HowItWorks from "./components/Home/HowItWorks";
import Features from "./components/Home/Features";
import InterviewPreview from "./components/Home/InterviewPreview";
import PreparationRoadmap from "./components/Home/PreparationRoadmap";
import FinalCTA from "./components/Home/FinalCTA";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "MustCode — Personalized interview preparation for engineers",
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
      <HowItWorks />
      <Features />
      <InterviewPreview />
      <PreparationRoadmap />
      <FinalCTA />
      <Footer />
    </>
  );
}
