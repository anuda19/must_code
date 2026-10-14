"use client";
import Link from "next/link";

// Sample result shown inside the floating card — illustrative numbers only,
// styled with the same growth/gap logic used across the product (>=60 reads
// as strong, below that reads as a gap).
const SAMPLE_RESULT = [
  { skill: "Algorithms", score: 82 },
  { skill: "System design", score: 41 },
  { skill: "Communication", score: 65 },
];

const ROLE_CHIPS = ["Frontend", "Backend", "Full Stack", "Data"];

const STATS = [
  { value: "240+", label: "Skills mapped across roles" },
  { value: "500+", label: "Companies supported" },
  { value: "10,000+", label: "Practice questions" },
  { value: "6-stage", label: "Adaptive preparation loop" },
];

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-copy">
          <h1>
            Prepare for the exact interview your target role will give you.
          </h1>
          <p className="lede">
            Pick a role and a company. Groundwork tells you which skills are
            already strong, which are behind, and what to work on first —
            then adapts the plan as you improve.
          </p>
          <div className="hero-actions">
            <Link href="/signup" className="cta-primary">
              Start your free assessment
            </Link>
            <Link href="#how-it-works" className="cta-secondary">
              See how it works
            </Link>
          </div>
        </div>

        <div className="hero-visual">
          <div className="glow" aria-hidden="true" />

          <div className="product-card" aria-hidden="true">
            <div className="card-header">
              <span className="card-title">Set up your assessment</span>
              <span className="card-step mono">1 of 2</span>
            </div>

            <div className="card-section">
              <span className="field-label">Target role</span>
              <div className="chip-row">
                {ROLE_CHIPS.map((role, i) => (
                  <span
                    key={role}
                    className={`chip ${i === 0 ? "chip-active" : ""}`}
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>

            <div className="card-section">
              <span className="field-label">Target company</span>
              <div className="fake-input">Stripe, Razorpay, Google…</div>
            </div>

            <button className="card-cta" tabIndex={-1}>
              Generate my skill-gap report
            </button>

            <div className="result-preview">
              <span className="result-label mono">Sample result</span>
              {SAMPLE_RESULT.map((row) => (
                <div className="result-row" key={row.skill}>
                  <span className="result-skill">{row.skill}</span>
                  <div className="result-track">
                    <div
                      className="result-fill"
                      style={{
                        width: `${row.score}%`,
                        background:
                          row.score >= 60 ? "var(--growth)" : "var(--gap)",
                      }}
                    />
                  </div>
                  <span className="result-score mono">{row.score}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <dl className="stats-strip">
          {STATS.map((stat) => (
            <div className="stat" key={stat.label}>
              <dt className="stat-value">{stat.value}</dt>
              <dd className="stat-label">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>

      <style jsx>{`
        .hero {
          padding: 72px 0 0;
        }
        .hero-inner {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 56px;
          align-items: center;
          padding-bottom: 72px;
        }
        h1 {
          font-size: clamp(2.1rem, 4vw, 3.15rem);
          line-height: 1.14;
          letter-spacing: -0.02em;
          margin: 0 0 20px;
          max-width: 17ch;
        }
        .lede {
          color: var(--text-muted);
          font-size: 1.08rem;
          max-width: 50ch;
          margin: 0 0 32px;
        }
        .hero-actions {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }
        .cta-primary {
          background: var(--accent);
          color: #0b0d12;
          font-weight: 600;
          padding: 13px 22px;
          border-radius: var(--radius-sm);
        }
        .cta-primary:hover {
          background: var(--accent-strong);
        }
        .cta-secondary {
          padding: 13px 22px;
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          color: var(--text);
        }
        .cta-secondary:hover {
          border-color: var(--accent);
        }

        .hero-visual {
          position: relative;
          justify-self: center;
          width: 100%;
          max-width: 380px;
        }
        .glow {
          position: absolute;
          inset: -40px -20px auto -20px;
          height: 320px;
          background: radial-gradient(
            circle at 50% 30%,
            rgba(91, 140, 255, 0.22),
            transparent 70%
          );
          filter: blur(10px);
          pointer-events: none;
        }
        .product-card {
          position: relative;
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 22px;
          box-shadow: 0 24px 60px -20px rgba(0, 0, 0, 0.6);
        }
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 20px;
        }
        .card-title {
          font-weight: 600;
          font-size: 0.95rem;
        }
        .card-step {
          font-size: 0.72rem;
          color: var(--text-muted);
        }
        .card-section {
          margin-bottom: 18px;
        }
        .field-label {
          display: block;
          font-size: 0.78rem;
          color: var(--text-muted);
          margin-bottom: 8px;
        }
        .chip-row {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .chip {
          font-size: 0.8rem;
          padding: 6px 12px;
          border-radius: 999px;
          border: 1px solid var(--border);
          color: var(--text-muted);
        }
        .chip-active {
          border-color: var(--accent);
          color: var(--text);
          background: rgba(91, 140, 255, 0.12);
        }
        .fake-input {
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 10px 12px;
          font-size: 0.85rem;
          color: var(--text-muted);
          background: var(--bg);
        }
        .card-cta {
          width: 100%;
          background: var(--accent);
          color: #0b0d12;
          font-weight: 600;
          font-size: 0.88rem;
          padding: 11px 0;
          border: none;
          border-radius: var(--radius-sm);
          margin-bottom: 20px;
        }
        .result-preview {
          border-top: 1px solid var(--border);
          padding-top: 16px;
        }
        .result-label {
          display: block;
          font-size: 0.7rem;
          color: var(--text-muted);
          margin-bottom: 12px;
        }
        .result-row {
          display: grid;
          grid-template-columns: 90px 1fr 30px;
          align-items: center;
          gap: 10px;
          margin-bottom: 8px;
        }
        .result-skill {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .result-track {
          height: 6px;
          background: var(--bg);
          border-radius: 999px;
          overflow: hidden;
        }
        .result-fill {
          height: 100%;
          border-radius: 999px;
        }
        .result-score {
          font-size: 0.72rem;
          color: var(--text-muted);
          text-align: right;
        }

        .stats-strip {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          margin: 0;
          padding: 28px 0;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
        .stat-value {
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 1.3rem;
          color: var(--text);
        }
        .stat-label {
          margin: 4px 0 0;
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        @media (max-width: 900px) {
          .hero-inner {
            grid-template-columns: 1fr;
          }
          .hero-visual {
            order: -1;
            max-width: 340px;
            margin: 0 auto;
          }
          .stats-strip {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px 16px;
          }
        }
      `}</style>
    </section>
  );
}