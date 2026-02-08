import { useState, useEffect, useRef } from "react";

// ─── DATA MODEL (100% Preserved) ───
const LOCATIONS = [
    { id: "dallas", name: "Dallas", state: "TX", country: "US" },
    { id: "plano", name: "Plano", state: "TX", country: "US" },
    { id: "frisco", name: "Frisco", state: "TX", country: "US" },
    { id: "richardson", name: "Richardson", state: "TX", country: "US" },
    { id: "houston", name: "Houston", state: "TX", country: "US" },
    { id: "austin", name: "Austin", state: "TX", country: "US" },
    { id: "sanantonio", name: "San Antonio", state: "TX", country: "US" },
    { id: "chicago", name: "Chicago", state: "IL", country: "US" },
    { id: "newyork", name: "New York", state: "NY", country: "US" },
    { id: "newjersey", name: "Edison", state: "NJ", country: "US" },
    { id: "sanjose", name: "San Jose", state: "CA", country: "US" },
    { id: "fremont", name: "Fremont", state: "CA", country: "US" },
    { id: "atlanta", name: "Atlanta", state: "GA", country: "US" },
    { id: "detroit", name: "Detroit", state: "MI", country: "US" },
    { id: "toronto", name: "Toronto", state: "ON", country: "CA" },
    { id: "mississauga", name: "Mississauga", state: "ON", country: "CA" },
    { id: "vancouver", name: "Vancouver", state: "BC", country: "CA" },
    { id: "online", name: "Online", state: "Virtual", country: "" },
];

const CENTERS = [
    { id: "c1", locationId: "plano", name: "SKY Plano Main Center", address: "1234 Legacy Dr, Plano, TX 75024", phone: "+1 (972) 555-0101", desc: "Our flagship center in the heart of Plano, offering a full range of SKY practices in a peaceful, dedicated space." },
    { id: "c2", locationId: "dallas", name: "SKY Dallas Downtown", address: "567 Elm St, Dallas, TX 75201", phone: "+1 (214) 555-0202", desc: "Conveniently located downtown, bringing SKY's transformative practices to the center of Dallas." },
    { id: "c3", locationId: "frisco", name: "SKY Frisco Community", address: "890 Main St, Frisco, TX 75034", phone: "+1 (469) 555-0303", desc: "A warm community space in rapidly growing Frisco, welcoming newcomers and experienced practitioners." },
    { id: "c4", locationId: "richardson", name: "SKY Richardson Center", address: "321 Campbell Rd, Richardson, TX 75080", phone: "+1 (972) 555-0404", desc: "Intimate setting in Richardson ideal for focused practice and small-group sessions." },
    { id: "c20", locationId: "online", name: "SKY Virtual Studio", address: "Zoom / Google Meet", phone: null, desc: "Join from anywhere in the world. Full SKY experience delivered virtually with live instruction." },
];

const SESSIONS = [
    { id: "s1", centerId: "c1", title: "Weekly SKY Meditation", type: "meditation", mode: "in-person", day: "Saturday", time: "9:00 AM", duration: "90 min", instructor: "Dr. Lakshmi Narayanan", level: "All Levels", spotsTotal: 40, spotsTaken: 28, recurring: true },
    { id: "s2", centerId: "c1", title: "Kayakalpa Yoga Workshop", type: "kayakalpa", mode: "in-person", day: "Feb 15, 2026", time: "10:00 AM", duration: "3 hrs", instructor: "Prof. Sundar", level: "Beginner", spotsTotal: 30, spotsTaken: 12, recurring: false },
    { id: "s12", centerId: "c20", title: "Online SKY Meditation", type: "meditation", mode: "online", day: "Saturday", time: "9:00 AM CST", duration: "60 min", instructor: "Dr. Lakshmi Narayanan", level: "All Levels", spotsTotal: 200, spotsTaken: 85, recurring: true },
];

const PRACTICES = [
    { id: "meditation", icon: "🪷", title: "SKY Meditation", tagline: "Commune with the universe", desc: "Powerful meditation on the life force that brings a quantum leap in the strength of your mind.", color: "#748C70", benefits: ["Stress reduction", "Mental clarity", "Spiritual growth"] },
    { id: "exercise", icon: "🌿", title: "Physical Exercise", tagline: "9 exercises for harmony", desc: "Simple exercises designed to regulate the flow of blood, heat, air, and energy throughout the body.", color: "#9DB29B", benefits: ["Improved flexibility", "Energy regulation", "Joint health"] },
    { id: "kayakalpa", icon: "☀️", title: "Kayakalpa Yoga", tagline: "Ancient rejuvenation", desc: "An anti-aging practice for enhancing life energy and restructuring the body naturally.", color: "#B5A48B", benefits: ["Anti-aging", "Enhanced vitality", "Disease prevention"] },
    { id: "introspection", icon: "🕊️", title: "Introspection", tagline: "Transform from within", desc: "Self-help practices to sublimate negative emotions and cultivate stronger character traits.", color: "#8B9BA4", benefits: ["Emotional mastery", "Self-awareness", "Inner peace"] },
];

// ─── HOOKS ───
function useInView(threshold = 0.1) {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const el = ref.current; if (!el) return;
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
        obs.observe(el); return () => obs.disconnect();
    }, [threshold]);
    return [ref, inView];
}

function FadeIn({ children, delay = 0, className = "" }) {
    const [ref, inView] = useInView();
    return (
        <div ref={ref} className={className} style={{
            opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: `all 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
        }}>{children}</div>
    );
}

// ─── REUSABLE COMPONENTS ───
const SectionTag = ({ children }) => <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: "#748C70", marginBottom: 12, fontWeight: 700 }}>{children}</div>;

function CapacityIndicator({ taken, total, color }) {
    const pct = (taken / total) * 100;
    return (
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12 }}>
            <div style={{ flex: 1, height: 2, background: "#E8E6E1", borderRadius: 1 }}>
                <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 1, transition: "width 1s" }} />
            </div>
            <span style={{ fontSize: 10, fontFamily: "'DM Sans', sans-serif", color: "#8E8C87" }}>{total - taken} slots left</span>
        </div>
    );
}

function SessionRow({ session, onSignUp, onCenterClick, onCourseClick, showCenter = true, showType = true }) {
    const center = CENTERS.find(c => c.id === session.centerId);
    const practice = PRACTICES.find(p => p.id === session.type);
    return (
        <div className="session-card" style={{
            background: "#FFFFFF", padding: "24px", borderRadius: "16px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.02)", border: "1px solid #F0EFEA",
            display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20,
            marginBottom: 12, transition: "transform 0.2s"
        }}>
            <div style={{ flex: 1 }}>
                <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                    {showType && <span onClick={() => onCourseClick?.(session.type)} style={{ cursor: "pointer", fontSize: 10, padding: "4px 10px", background: "#F2F4F0", color: "#748C70", borderRadius: 20, fontWeight: 700 }}>{practice.icon} {practice.title}</span>}
                    <span style={{ fontSize: 10, padding: "4px 10px", background: session.mode === 'online' ? '#EBF1F5' : '#F5F1EB', color: session.mode === 'online' ? '#5E7A8A' : '#8A7A5E', borderRadius: 20, fontWeight: 700, textTransform: "uppercase" }}>{session.mode}</span>
                </div>
                <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: "#2D2C2A", margin: "0 0 6px 0" }}>{session.title}</h4>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", fontSize: 12, color: "#8E8C87", fontFamily: "'DM Sans', sans-serif" }}>
                    {showCenter && <span onClick={() => onCenterClick?.(session.centerId)} style={{ cursor: "pointer", borderBottom: "1px solid #D1CFCA" }}>📍 {center.name}</span>}
                    <span>📅 {session.day} • {session.time}</span>
                    <span>👤 {session.instructor}</span>
                </div>
                <CapacityIndicator taken={session.spotsTaken} total={session.spotsTotal} color={practice.color} />
            </div>
            <button onClick={() => onSignUp(session)} className="btn-primary" style={{ padding: "12px 24px", borderRadius: "30px", background: "#748C70", color: "white", border: "none", fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Join Class</button>
        </div>
    );
}

// ─── OVERLAYS & MODALS ───
function RegistrationModal({ session, onClose }) {
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({ name: "", email: "" });
    const practice = PRACTICES.find(p => p.id === session.type);

    return (
        <div style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(45,44,42,0.6)", backdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
            <div style={{ background: "#FAF9F6", borderRadius: "32px", width: "100%", maxWidth: "440px", padding: "40px", position: "relative" }}>
                <button onClick={onClose} style={{ position: "absolute", top: 24, right: 24, background: "none", border: "none", fontSize: 24, cursor: "pointer", color: "#A8A6A1" }}>×</button>
                {step === 1 ? (
                    <>
                        <div style={{ textAlign: "center", marginBottom: 32 }}>
                            <div style={{ fontSize: 40, marginBottom: 16 }}>{practice.icon}</div>
                            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, color: "#2D2C2A" }}>{session.title}</h3>
                            <p style={{ fontSize: 14, color: "#8E8C87", marginTop: 8 }}>{session.day} at {session.time}</p>
                        </div>
                        <div style={{ display: "grid", gap: 16 }}>
                            <input placeholder="Your Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={{ width: "100%", padding: "16px", borderRadius: "12px", border: "1px solid #E8E6E1", background: "white", outline: "none" }} />
                            <input placeholder="Email Address" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={{ width: "100%", padding: "16px", borderRadius: "12px", border: "1px solid #E8E6E1", background: "white", outline: "none" }} />
                            <button onClick={() => form.name && form.email && setStep(2)} style={{ width: "100%", padding: "16px", background: "#748C70", color: "white", border: "none", borderRadius: "12px", fontWeight: 700, cursor: "pointer", marginTop: 8 }}>Complete Registration</button>
                        </div>
                    </>
                ) : (
                    <div style={{ textAlign: "center", padding: "20px 0" }}>
                        <div style={{ fontSize: 50, marginBottom: 20 }}>🙏</div>
                        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, color: "#2D2C2A" }}>Welcome, {form.name}</h3>
                        <p style={{ color: "#8E8C87", lineHeight: 1.6, marginTop: 12 }}>You're all set. A confirmation email has been sent to {form.email}.</p>
                        <button onClick={onClose} style={{ marginTop: 32, padding: "12px 32px", background: "#2D2C2A", color: "white", border: "none", borderRadius: "30px", fontWeight: 600, cursor: "pointer" }}>Close</button>
                    </div>
                )}
            </div>
        </div>
    );
}

function OverlayShell({ open, onClose, title, children }) {
    if (!open) return null;
    return (
        <div style={{ position: "fixed", inset: 0, zIndex: 500, background: "#FAF9F6", overflowY: "auto" }}>
            <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 24px" }}>
                <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, color: "#748C70", fontWeight: 700, fontSize: 12, textTransform: "uppercase", marginBottom: 40 }}>← Back to Journey</button>
                {children}
            </div>
        </div>
    );
}

// ─── MAIN PAGES ───
function ExploreCourses({ onCenterClick, onSignUp, initialPractice }) {
    const [selectedPractice, setSelectedPractice] = useState(initialPractice || null);

    if (selectedPractice) {
        const p = PRACTICES.find(pr => pr.id === selectedPractice);
        const sessions = SESSIONS.filter(s => s.type === selectedPractice);
        return (
            <FadeIn>
                <button onClick={() => setSelectedPractice(null)} style={{ border: "none", background: "none", color: "#8E8C87", cursor: "pointer", marginBottom: 20 }}>← All Practices</button>
                <div style={{ display: "flex", gap: 24, alignItems: "flex-start", marginBottom: 48 }}>
                    <div style={{ fontSize: 60, background: "#F2F4F0", width: 100, height: 100, borderRadius: 24, display: "flex", alignItems: "center", justifyContent: "center" }}>{p.icon}</div>
                    <div>
                        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 48, margin: 0 }}>{p.title}</h2>
                        <p style={{ color: "#8E8C87", fontSize: 18, marginTop: 4 }}>{p.tagline}</p>
                    </div>
                </div>
                <div style={{ display: "grid", gap: 12 }}>
                    {sessions.map(s => <SessionRow key={s.id} session={s} onSignUp={onSignUp} onCenterClick={onCenterClick} showType={false} />)}
                </div>
            </FadeIn>
        );
    }

    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {PRACTICES.map(p => (
                <div key={p.id} onClick={() => setSelectedPractice(p.id)} style={{ background: "white", padding: 40, borderRadius: 24, cursor: "pointer", border: "1px solid #F0EFEA", transition: "all 0.3s" }} className="hover-up">
                    <div style={{ fontSize: 32, marginBottom: 20 }}>{p.icon}</div>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, marginBottom: 12 }}>{p.title}</h3>
                    <p style={{ color: "#8E8C87", fontSize: 14, lineHeight: 1.6 }}>{p.desc}</p>
                    <div style={{ marginTop: 24, color: "#748C70", fontWeight: 700, fontSize: 12 }}>VIEW CLASSES →</div>
                </div>
            ))}
        </div>
    );
}

function FindCenter({ onCourseClick, onSignUp, initialCenter }) {
    const [search, setSearch] = useState("");
    const filtered = CENTERS.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.address.toLowerCase().includes(search.toLowerCase()));

    return (
        <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 44, marginBottom: 16 }}>Find your <i style={{ fontWeight: 400 }}>Sanctuary</i></h2>
                <input
                    placeholder="Search by city or center name..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{ width: "100%", maxWidth: 400, padding: "16px 24px", borderRadius: "40px", border: "1px solid #E8E6E1", background: "white", outline: "none", fontFamily: "'DM Sans', sans-serif" }}
                />
            </div>
            <div style={{ display: "grid", gap: 24 }}>
                {filtered.map(center => (
                    <div key={center.id} style={{ background: "white", padding: 32, borderRadius: 24, border: "1px solid #F0EFEA" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
                            <div>
                                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, margin: 0 }}>{center.name}</h3>
                                <p style={{ color: "#8E8C87", fontSize: 14, marginTop: 4 }}>{center.address}</p>
                            </div>
                            <span style={{ fontSize: 11, fontWeight: 700, background: "#F2F4F0", padding: "6px 12px", borderRadius: 12, color: "#748C70" }}>
                                {center.locationId === 'online' ? '🌐 VIRTUAL' : '📍 IN-PERSON'}
                            </span>
                        </div>
                        <div style={{ display: "grid", gap: 12 }}>
                            {SESSIONS.filter(s => s.centerId === center.id).map(s => (
                                <SessionRow key={s.id} session={s} onSignUp={onSignUp} onCourseClick={onCourseClick} showCenter={false} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </FadeIn>
    );
}

// ─── MAIN APP ───
export default function SereneGarden() {
    const [overlay, setOverlay] = useState(null);
    const [courseInitial, setCourseInitial] = useState(null);
    const [regSession, setRegSession] = useState(null);

    const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

    return (
        <div style={{ background: "#FAF9F6", color: "#2D2C2A", fontFamily: "'DM Sans', sans-serif" }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@400;500;700&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
        .hover-up:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(116,140,112,0.08); border-color: #748C70 !important; }
        .session-card:hover { border-color: #748C70 !important; }
        @media (max-width: 768px) { .hero-title { fontSize: 50px !important; } }
      `}</style>

            {/* Nav */}
            <nav style={{ padding: "24px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, background: "rgba(250,249,246,0.8)", backdropFilter: "blur(10px)", zIndex: 100 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#748C70", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 14, fontWeight: 700 }}>S</div>
                    <span style={{ fontWeight: 700, letterSpacing: 1, fontSize: 14 }}>SKY YOGA</span>
                </div>
                <div style={{ display: "flex", gap: 32, fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>
                    <button onClick={() => setOverlay('courses')} style={{ background: "none", border: "none", cursor: "pointer", textTransform: "uppercase" }}>Practices</button>
                    <button onClick={() => setOverlay('centers')} style={{ background: "none", border: "none", cursor: "pointer", textTransform: "uppercase" }}>Locations</button>
                    <button onClick={() => setOverlay('centers')} style={{ background: "#748C70", color: "white", border: "none", padding: "10px 24px", borderRadius: "20px", cursor: "pointer" }}>REGISTER</button>
                </div>
            </nav>

            {/* Hero */}
            <section style={{ padding: "120px 24px", textAlign: "center", maxWidth: "900px", margin: "0 auto" }}>
                <SectionTag>Founded in Dallas-Fort Worth</SectionTag>
                <h1 className="hero-title" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "84px", fontWeight: 400, margin: "20px 0", lineHeight: 1 }}>
                    Elevate your <i style={{ fontWeight: 400 }}>spirit</i>, <br /> harmonize your body.
                </h1>
                <p style={{ fontSize: "18px", color: "#8E8C87", maxWidth: "540px", margin: "0 auto 40px", lineHeight: 1.8 }}>
                    Discover Simplified Kundalini Yoga through community-led meditation and physical harmony across North America.
                </p>
                <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
                    <button onClick={() => setOverlay('centers')} style={{ background: "#2D2C2A", color: "white", padding: "16px 40px", borderRadius: "40px", border: "none", fontWeight: 700, cursor: "pointer" }}>Find a Center</button>
                    <button onClick={() => setOverlay('courses')} style={{ background: "white", color: "#2D2C2A", padding: "16px 40px", borderRadius: "40px", border: "1px solid #E8E6E1", fontWeight: 700, cursor: "pointer" }}>Explore Courses</button>
                </div>
            </section>

            {/* Feature Grid */}
            <section style={{ padding: "80px 24px", maxWidth: "1200px", margin: "0 auto" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 32 }}>
                    <FadeIn>
                        <div style={{ background: "#F2F4F0", padding: 48, borderRadius: 32, height: "100%" }}>
                            <SectionTag>Our Philosophy</SectionTag>
                            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, marginBottom: 20 }}>Simplicity is the highest form of <i style={{ fontWeight: 400 }}>sophistication.</i></h2>
                            <p style={{ color: "#5D5C59", lineHeight: 1.7 }}>We believe meditation should be accessible, scientific, and integrated into modern life. Rooted in the lineage of Shri Vethathiri Maharishi.</p>
                        </div>
                    </FadeIn>
                    <FadeIn delay={0.1}>
                        <div style={{ background: "#FAF9F6", border: "1px solid #E8E6E1", padding: 48, borderRadius: 32, height: "100%" }}>
                            <SectionTag>Community</SectionTag>
                            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, marginBottom: 20 }}>A growing network of <i style={{ fontWeight: 400 }}>peace seekers.</i></h2>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 32 }}>
                                <div><div style={{ fontSize: 24, fontWeight: 700 }}>20+</div><div style={{ fontSize: 12, color: "#8E8C87" }}>Centers</div></div>
                                <div><div style={{ fontSize: 24, fontWeight: 700 }}>100%</div><div style={{ fontSize: 12, color: "#8E8C87" }}>Volunteer Run</div></div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            <footer style={{ padding: "100px 24px", textAlign: "center", background: "#F2F4F0", marginTop: 80 }}>
                <SectionTag>Sky Yoga Dallas</SectionTag>
                <p style={{ fontSize: 14, color: "#8E8C87" }}>© 2026 World Community Service Centre. All practices offered as community service.</p>
            </footer>

            {/* OVERLAYS (Functional State Controllers) */}
            <OverlayShell open={overlay === 'courses'} onClose={() => { setOverlay(null); setCourseInitial(null); }}>
                <ExploreCourses
                    onSignUp={setRegSession}
                    initialPractice={courseInitial}
                    onCenterClick={(id) => { setOverlay('centers'); }}
                />
            </OverlayShell>

            <OverlayShell open={overlay === 'centers'} onClose={() => setOverlay(null)}>
                <FindCenter
                    onSignUp={setRegSession}
                    onCourseClick={(id) => { setOverlay('courses'); setCourseInitial(id); }}
                />
            </OverlayShell>

            {regSession && <RegistrationModal session={regSession} onClose={() => setRegSession(null)} />}
        </div>
    );
}