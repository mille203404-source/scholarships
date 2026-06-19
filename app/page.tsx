"use client";

import { useState, useEffect, useRef } from "react";
import { universities, type University } from "@/data/universities";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<University[]>([]);
  const [searched, setSearched] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const ease = "opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)";

    const heroEls = document.querySelectorAll<HTMLElement>("[data-sb-hero]");
    heroEls.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(22px)";
      el.style.transition = ease;
    });
    heroEls.forEach((el) => {
      const delay = parseInt(el.dataset.sbDelay || "0");
      setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, delay);
    });

    const scrollEls = document.querySelectorAll<HTMLElement>("[data-sb-scroll]");
    scrollEls.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(26px)";
      el.style.transition = ease;
    });

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = parseInt(el.dataset.sbDelay || "0");
            setTimeout(() => {
              el.style.opacity = "1";
              el.style.transform = "translateY(0)";
            }, delay);
            observerRef.current?.unobserve(el);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -48px 0px" }
    );

    scrollEls.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  function handleSearch() {
    const q = query.trim().toLowerCase();
    if (!q) {
      setResults([]);
      setSearched(false);
      return;
    }
    const matches = universities.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.country.toLowerCase().includes(q) ||
        u.city.toLowerCase().includes(q) ||
        u.scholarship.toLowerCase().includes(q)
    );
    setResults(matches);
    setSearched(true);
  }

  return (
    <>
      {/* ─── NAV ─── */}
      <header style={{ position: "sticky", top: 0, zIndex: 100, background: "oklch(99% 0.005 245 / 0.92)", backdropFilter: "blur(16px)", borderBottom: "1px solid oklch(92% 0.012 245)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
          <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <div style={{ width: 32, height: 32, background: "oklch(40% 0.18 245)", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 600, color: "white", letterSpacing: "0.05em" }}>SB</span>
            </div>
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, fontWeight: 600, color: "oklch(18% 0.05 245)", letterSpacing: "-0.02em" }}>Scholarships Benelux</span>
          </a>
          <nav style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <a href="#how-it-works" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "oklch(42% 0.03 245)", padding: "8px 14px", borderRadius: 7 }}>How it works</a>
            <a href="#universities" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "oklch(42% 0.03 245)", padding: "8px 14px", borderRadius: 7 }}>Universities</a>
            <a href="#mission" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "oklch(42% 0.03 245)", padding: "8px 14px", borderRadius: 7 }}>Our Mission</a>
            <a href="#search" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 500, color: "white", background: "oklch(40% 0.18 245)", padding: "9px 20px", borderRadius: 7, marginLeft: 10, whiteSpace: "nowrap" }}>Search scholarships →</a>
          </nav>
        </div>
      </header>

      {/* ─── HERO + SEARCH ─── */}
      <section id="search" style={{ padding: "96px 40px 80px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>

          <div data-sb-hero data-sb-delay="80" style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "oklch(94% 0.05 245)", color: "oklch(36% 0.18 245)", fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", padding: "6px 14px 6px 10px", borderRadius: 100, marginBottom: 32 }}>
            <span style={{ width: 5, height: 5, background: "oklch(52% 0.2 245)", borderRadius: "50%", flexShrink: 0, display: "block" }}></span>
            Belgium · Netherlands · Luxembourg
          </div>

          <h1 data-sb-hero data-sb-delay="220" style={{ fontFamily: "'Instrument Serif',serif", fontSize: 72, lineHeight: 1.04, color: "oklch(14% 0.05 245)", letterSpacing: "-0.03em", marginBottom: 24 }}>
            Find your scholarship<br /><em>in the Benelux</em>
          </h1>

          <p data-sb-hero data-sb-delay="380" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 18, lineHeight: 1.65, color: "oklch(46% 0.03 245)", maxWidth: 480, margin: "0 auto 52px" }}>
            Search scholarships across Belgian, Dutch, and Luxembourgish universities — all in one place, completely free.
          </p>

          {/* Search bar */}
          <div data-sb-hero data-sb-delay="520" style={{ maxWidth: 600, margin: "0 auto" }}>
            <div style={{ display: "flex", background: "white", borderRadius: 12, boxShadow: "0 2px 24px oklch(40% 0.18 245 / 0.1), 0 1px 3px oklch(0% 0 0 / 0.06)", border: "1.5px solid oklch(90% 0.04 245)", overflow: "hidden" }}>
              <input
                type="text"
                placeholder="University name, country, or city…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                style={{ flex: 1, minWidth: 0, padding: "18px 22px", fontFamily: "'DM Sans',sans-serif", fontSize: 15, border: "none", background: "transparent", color: "oklch(14% 0.05 245)" }}
              />
              <button
                onClick={handleSearch}
                style={{ padding: "18px 28px", background: "oklch(40% 0.18 245)", color: "white", fontFamily: "'DM Sans',sans-serif", fontSize: 14, fontWeight: 500, whiteSpace: "nowrap", flexShrink: 0 }}
              >
                Search →
              </button>
            </div>
          </div>

          {/* Search results */}
          {searched && (
            <div style={{ maxWidth: 680, margin: "28px auto 0" }}>
              {results.length === 0 ? (
                <div style={{ padding: 32, background: "white", borderRadius: 12, border: "1px solid oklch(91% 0.02 245)" }}>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", color: "oklch(52% 0.025 245)", fontSize: 15 }}>No universities found matching &ldquo;{query}&rdquo;</p>
                </div>
              ) : (
                results.map((result) => (
                  <div key={result.name} style={{ background: "white", border: "1px solid oklch(91% 0.02 245)", borderRadius: 12, padding: "22px 24px", textAlign: "left", marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
                        <h3 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 16, fontWeight: 600, color: "oklch(14% 0.05 245)" }}>{result.name}</h3>
                        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "oklch(38% 0.16 245)", background: "oklch(94% 0.05 245)", padding: "2px 8px", borderRadius: 4 }}>{result.country}</span>
                      </div>
                      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "oklch(50% 0.025 245)", marginBottom: 4 }}>{result.city} · {result.scholarship}</p>
                      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12.5, color: "oklch(58% 0.02 245)" }}>Requirements: {result.requirements}</p>
                    </div>
                    <a href={result.website} target="_blank" rel="noreferrer" style={{ flexShrink: 0, fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 500, color: "oklch(40% 0.18 245)", border: "1.5px solid oklch(82% 0.1 245)", padding: "9px 18px", borderRadius: 7, display: "inline-block" }}>Visit →</a>
                  </div>
                ))
              )}
            </div>
          )}

        </div>
      </section>

      {/* ─── STATS BAR ─── */}
      <div style={{ borderTop: "1px solid oklch(92% 0.012 245)", borderBottom: "1px solid oklch(92% 0.012 245)", background: "white" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 40px", display: "flex", justifyContent: "center", gap: 72, flexWrap: "wrap" }}>
          {[
            { value: "3", label: "Countries", delay: 0 },
            { value: "10+", label: "Universities", delay: 90 },
            { value: "100%", label: "Free to use", delay: 180 },
            { value: "Open", label: "Source", delay: 270 },
          ].map((stat) => (
            <div key={stat.label} data-sb-scroll data-sb-delay={stat.delay} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Instrument Serif',serif", fontSize: 38, color: "oklch(14% 0.05 245)", lineHeight: 1 }}>{stat.value}</div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "oklch(52% 0.025 245)", marginTop: 5 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── HOW IT WORKS ─── */}
      <section id="how-it-works" style={{ padding: "100px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div data-sb-scroll data-sb-delay="0" style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "oklch(40% 0.18 245)", marginBottom: 12 }}>How it works</div>
            <h2 style={{ fontFamily: "'Instrument Serif',serif", fontSize: 46, color: "oklch(14% 0.05 245)", letterSpacing: "-0.02em", lineHeight: 1.08 }}>Three steps to your scholarship</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }}>

            <div data-sb-scroll data-sb-delay="0" style={{ background: "white", border: "1px solid oklch(91% 0.02 245)", borderRadius: 16, padding: "40px 36px" }}>
              <div style={{ width: 44, height: 44, background: "oklch(40% 0.18 245)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 28 }}>
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 17, fontWeight: 600, color: "white" }}>1</span>
              </div>
              <h3 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 18, fontWeight: 600, color: "oklch(14% 0.05 245)", marginBottom: 12 }}>Search</h3>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14.5, lineHeight: 1.65, color: "oklch(46% 0.025 245)" }}>Enter a university name, country, or city. Filter across the entire Benelux region in one search.</p>
            </div>

            <div data-sb-scroll data-sb-delay="130" style={{ background: "white", border: "1px solid oklch(91% 0.02 245)", borderRadius: 16, padding: "40px 36px" }}>
              <div style={{ width: 44, height: 44, background: "oklch(94% 0.05 245)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 28 }}>
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 17, fontWeight: 600, color: "oklch(40% 0.18 245)" }}>2</span>
              </div>
              <h3 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 18, fontWeight: 600, color: "oklch(14% 0.05 245)", marginBottom: 12 }}>Compare</h3>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14.5, lineHeight: 1.65, color: "oklch(46% 0.025 245)" }}>Review scholarship details, requirements, and eligibility. Find the funding that fits your profile best.</p>
            </div>

            <div data-sb-scroll data-sb-delay="260" style={{ background: "white", border: "1px solid oklch(91% 0.02 245)", borderRadius: 16, padding: "40px 36px" }}>
              <div style={{ width: 44, height: 44, background: "oklch(94% 0.05 245)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 28 }}>
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 17, fontWeight: 600, color: "oklch(40% 0.18 245)" }}>3</span>
              </div>
              <h3 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 18, fontWeight: 600, color: "oklch(14% 0.05 245)", marginBottom: 12 }}>Apply</h3>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14.5, lineHeight: 1.65, color: "oklch(46% 0.025 245)" }}>Follow the direct link to the university&apos;s official application page. No middlemen, no sign-up required.</p>
            </div>

          </div>
        </div>
      </section>

      {/* ─── FEATURED UNIVERSITIES ─── */}
      <section id="universities" style={{ padding: "100px 40px", background: "oklch(96.5% 0.012 245)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div data-sb-scroll data-sb-delay="0" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, marginBottom: 48 }}>
            <div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "oklch(40% 0.18 245)", marginBottom: 10 }}>Featured</div>
              <h2 style={{ fontFamily: "'Instrument Serif',serif", fontSize: 46, color: "oklch(14% 0.05 245)", letterSpacing: "-0.02em", lineHeight: 1.08 }}>Universities in the database</h2>
            </div>
            <a href="#search" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, fontWeight: 500, color: "oklch(40% 0.18 245)", whiteSpace: "nowrap", paddingBottom: 4 }}>Search all →</a>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>

            <div data-sb-scroll data-sb-delay="0" style={{ background: "white", border: "1px solid oklch(91% 0.02 245)", borderRadius: 16, padding: 36, display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                <div>
                  <span style={{ display: "inline-block", fontFamily: "'DM Sans',sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "oklch(38% 0.16 245)", background: "oklch(94% 0.05 245)", padding: "3px 9px", borderRadius: 4, marginBottom: 10 }}>Belgium</span>
                  <h3 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 21, fontWeight: 600, color: "oklch(14% 0.05 245)", marginBottom: 3 }}>KU Leuven</h3>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "oklch(52% 0.025 245)" }}>Leuven, Belgium</p>
                </div>
              </div>
              <div style={{ borderTop: "1px solid oklch(94% 0.01 245)", paddingTop: 18, marginBottom: 22 }}>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13.5, fontWeight: 500, color: "oklch(40% 0.18 245)", marginBottom: 6 }}>KU Leuven Scholarships</p>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "oklch(52% 0.025 245)" }}>Requirements: Secondary school diploma</p>
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: "auto" }}>
                <a href="https://www.kuleuven.be" target="_blank" rel="noreferrer" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 500, color: "oklch(40% 0.18 245)", border: "1.5px solid oklch(82% 0.1 245)", padding: "9px 18px", borderRadius: 7, display: "inline-block" }}>Visit website →</a>
                <a href="https://www.kuleuven.be/english/admissions" target="_blank" rel="noreferrer" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 500, color: "white", background: "oklch(40% 0.18 245)", padding: "9px 18px", borderRadius: 7, display: "inline-block" }}>Apply →</a>
              </div>
            </div>

            <div data-sb-scroll data-sb-delay="160" style={{ background: "white", border: "1px solid oklch(91% 0.02 245)", borderRadius: 16, padding: 36, display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                <div>
                  <span style={{ display: "inline-block", fontFamily: "'DM Sans',sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "oklch(38% 0.16 245)", background: "oklch(94% 0.05 245)", padding: "3px 9px", borderRadius: 4, marginBottom: 10 }}>Belgium</span>
                  <h3 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 21, fontWeight: 600, color: "oklch(14% 0.05 245)", marginBottom: 3 }}>Ghent University</h3>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "oklch(52% 0.025 245)" }}>Ghent, Belgium</p>
                </div>
              </div>
              <div style={{ borderTop: "1px solid oklch(94% 0.01 245)", paddingTop: 18, marginBottom: 22 }}>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13.5, fontWeight: 500, color: "oklch(40% 0.18 245)", marginBottom: 6 }}>UGent Top-up Grants</p>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "oklch(52% 0.025 245)" }}>Requirements: Secondary school diploma</p>
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: "auto" }}>
                <a href="https://www.ugent.be" target="_blank" rel="noreferrer" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 500, color: "oklch(40% 0.18 245)", border: "1.5px solid oklch(82% 0.1 245)", padding: "9px 18px", borderRadius: 7, display: "inline-block" }}>Visit website →</a>
                <a href="https://www.ugent.be/en" target="_blank" rel="noreferrer" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 500, color: "white", background: "oklch(40% 0.18 245)", padding: "9px 18px", borderRadius: 7, display: "inline-block" }}>Apply →</a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── COUNTRIES ─── */}
      <section style={{ padding: "100px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div data-sb-scroll data-sb-delay="0" style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "oklch(40% 0.18 245)", marginBottom: 12 }}>Coverage</div>
            <h2 style={{ fontFamily: "'Instrument Serif',serif", fontSize: 46, color: "oklch(14% 0.05 245)", letterSpacing: "-0.02em", lineHeight: 1.08 }}>Three countries, one search</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>

            <div data-sb-scroll data-sb-delay="0" style={{ background: "white", border: "1px solid oklch(91% 0.02 245)", borderRadius: 16, overflow: "hidden" }}>
              <div style={{ height: 6, background: "linear-gradient(90deg,oklch(18% 0.01 245) 33.3%,oklch(80% 0.16 90) 33.3% 66.6%,oklch(50% 0.22 25) 66.6%)" }}></div>
              <div style={{ padding: "30px 28px" }}>
                <h3 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 19, fontWeight: 600, color: "oklch(14% 0.05 245)", marginBottom: 10 }}>Belgium</h3>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, lineHeight: 1.65, color: "oklch(46% 0.025 245)" }}>Home to world-class institutions like KU Leuven and Ghent University, Belgium offers generous scholarship programs for both domestic and international students.</p>
              </div>
            </div>

            <div data-sb-scroll data-sb-delay="120" style={{ background: "white", border: "1px solid oklch(91% 0.02 245)", borderRadius: 16, overflow: "hidden" }}>
              <div style={{ height: 6, background: "linear-gradient(90deg,oklch(48% 0.22 25) 33.3%,oklch(99% 0.003 245) 33.3% 66.6%,oklch(40% 0.18 245) 66.6%)" }}></div>
              <div style={{ padding: "30px 28px" }}>
                <h3 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 19, fontWeight: 600, color: "oklch(14% 0.05 245)", marginBottom: 10 }}>Netherlands</h3>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, lineHeight: 1.65, color: "oklch(46% 0.025 245)" }}>Dutch universities rank among Europe&apos;s finest. The Netherlands offers a wide range of English-taught programs with competitive funding opportunities.</p>
              </div>
            </div>

            <div data-sb-scroll data-sb-delay="240" style={{ background: "white", border: "1px solid oklch(91% 0.02 245)", borderRadius: 16, overflow: "hidden" }}>
              <div style={{ height: 6, background: "linear-gradient(90deg,oklch(48% 0.22 25) 33.3%,oklch(99% 0.003 245) 33.3% 66.6%,oklch(72% 0.14 210) 66.6%)" }}></div>
              <div style={{ padding: "30px 28px" }}>
                <h3 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 19, fontWeight: 600, color: "oklch(14% 0.05 245)", marginBottom: 10 }}>Luxembourg</h3>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, lineHeight: 1.65, color: "oklch(46% 0.025 245)" }}>The University of Luxembourg is a multilingual, internationally oriented research university offering merit-based scholarships to outstanding students.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── MISSION ─── */}
      <section id="mission" style={{ padding: "100px 40px", background: "oklch(21% 0.06 245)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <div data-sb-scroll data-sb-delay="0">
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "oklch(62% 0.14 245)", marginBottom: 16 }}>Our Mission</div>
            <h2 style={{ fontFamily: "'Instrument Serif',serif", fontSize: 50, color: "white", letterSpacing: "-0.025em", lineHeight: 1.06, marginBottom: 24 }}>Scholarship access<br />for every student</h2>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 17, lineHeight: 1.7, color: "oklch(74% 0.04 245)", maxWidth: 560, margin: "0 auto 44px" }}>We believe every student deserves clear, structured information about funding opportunities. Scholarships Benelux is a free, open-source resource built to remove barriers to higher education across Belgium, the Netherlands, and Luxembourg.</p>
            <a href="https://github.com/scholarships-benelux/scholarships" target="_blank" rel="noreferrer" style={{ display: "inline-block", fontFamily: "'DM Sans',sans-serif", fontSize: 14, fontWeight: 500, color: "oklch(21% 0.06 245)", background: "white", padding: "13px 26px", borderRadius: 8 }}>View on GitHub →</a>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ background: "oklch(14% 0.04 245)", padding: 40 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 28, height: 28, background: "oklch(40% 0.18 245)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, fontWeight: 600, color: "white", letterSpacing: "0.05em" }}>SB</span>
            </div>
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, fontWeight: 500, color: "oklch(84% 0.025 245)" }}>Scholarships Benelux</span>
          </div>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "oklch(50% 0.02 245)" }}>Open-source · Free to use · Built for students</p>
          <a href="https://github.com/scholarships-benelux/scholarships" target="_blank" rel="noreferrer" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "oklch(56% 0.04 245)" }}>GitHub →</a>
        </div>
      </footer>
    </>
  );
}
