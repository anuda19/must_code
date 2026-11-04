
import Footer from "../components/Footer";
import Navbar from "../components/Navigation";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--clay-bg)] font-sans text-[var(--clay-ink)] selection:bg-[var(--clay-peach)] selection:text-[var(--clay-ink)]">
      <Navbar />

      <main className="relative flex-1 overflow-hidden bg-[var(--clay-bg)]">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 left-1/2 size-[520px] -translate-x-1/2 rounded-full bg-[var(--clay-peach)]/30 blur-[110px]" />
          <div className="absolute right-[-180px] top-[35%] size-[420px] rounded-full bg-[var(--clay-sage)]/40 blur-[120px]" />
          <div className="absolute bottom-[-180px] left-[-150px] size-[400px] rounded-full bg-[var(--clay-blue)]/60 blur-[120px]" />
        </div>

        <div className="relative z-10">{children}</div>
      </main>
      <Footer />
    </div>
  );
}