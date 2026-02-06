import { useState, useEffect, useRef } from "react";

// ─── DATA MODEL (Preserved from Original) ───
const LOCATIONS = [
    { id: "dallas", name: "Dallas", state: "TX", country: "US" },
    { id: "plano", name: "Plano", state: "TX", country: "US" },
    { id: "frisco", name: "Frisco", state: "TX", country: "US" },
    { id: "richardson", name: "Richardson", state: "TX", country: "US" },
    { id: "online", name: "Online", state: "Virtual", country: "" },
];

const CENTERS = [
    { id: "c1", locationId: "plano", name: "SKY Plano Main Center", address: "1234 Legacy Dr, Plano, TX 75024", phone: "+1 (972) 555-0101", desc: "Our flagship center offering a full range of SKY practices in a peaceful space." },
    { id: "c2", locationId: "dallas", name: "SKY Dallas Downtown", address: "567 Elm St, Dallas, TX 75201", phone: "+1 (214) 555-0202", desc: "Transformative practices in the heart of the city." },
    { id: "c20", locationId: "online", name: "SKY Virtual Studio", address: "Zoom / Google Meet", phone: null, desc: "Full SKY experience delivered virtually with live instruction." },
];

const SESSIONS = [
    { id: "s1", centerId: "c1", title: "Weekly SKY Meditation", type: "meditation", mode: "in-person", day: "Saturday", time: "9:00 AM", duration: "90 min", instructor: "Dr. Lakshmi Narayanan", level: "All Levels", spotsTotal: 40, spotsTaken: 28, recurring: true },
    { id: "s2", centerId: "c1", title: "Kayakalpa Yoga Workshop", type: "kayakalpa", mode: "in-person", day: "Feb 15, 2026", time: "10:00 AM", duration: "3 hrs", instructor: "Prof. Sundar", level: "Beginner", spotsTotal: 30, spotsTaken: 12, recurring: false },
    { id: "s12", centerId: "c20", title: "Online SKY Meditation", type: "meditation", mode: "online", day: "Saturday", time: "9:00 AM CST", duration: "60 min", instructor: "Dr. Lakshmi Narayanan", level: "All Levels", spotsTotal: 200, spotsTaken: 85, recurring: true },
];

const PRACTICES = [
    { id: "meditation", icon: "🪷", title: "Meditation", color: "#D4AF37", desc: "Commune your consciousness with the universe." },
    { id: "exercise", icon: "🌿", title: "Exercise", color: "#8B9A6F", desc: "Regulate life energy through 9 simple movements." },
    { id: "kayakalpa", icon: "☀️", title: "Kayakalpa", color: "#9A7FB5", desc: "The ancient science of rejuvenation and vitality." },
];

// ─── STYLED COMPONENTS ───
const Section = ({ id, children, light }) => (
    <section id={id} style={{
        minHeight: "100vh", padding: "120px 24px",
        background: light ? "#F5F5F5" : "#121212",
        color: light ? "#121212" : "#FFFFFF",
        display: "flex", flexDirection: "column", justifyContent: "center"
    }}>{children}</section>
);

const GlassCard = ({ children, onClick }) => (
    <div onClick={onClick} style={{
        background: "rgba(255, 255, 255, 0.03)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "24px", padding: "32px",
        cursor: onClick ? "pointer" : "default",
        transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    }} onMouseOver={e => onClick && (e.currentTarget.style.transform = "scale(1.02)")}
        onMouseOut={e => onClick && (e.currentTarget.style.transform = "scale(1)")}>
        {children}
    </div>
);

// ─── MAIN APP ───
export default function ZenMonolith() {
    const [overlay, setOverlay] = useState(null);
    const [regSession, setRegSession] = useState(null);

    const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

    return (
        <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: "#121212" }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
        body { margin: 0; overflow-x: hidden; }
        .gold-text { color: #D4AF37; }
        .nav-dock { 
            position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%);
            background: rgba(18, 18, 18, 0.8); backdrop-filter: blur(20px);
            border: 1px solid rgba(255,255,255,0.1); border-radius: 40px;
            padding: 8px 24px; display: flex; gap: 24px; z-index: 1000;
        }
        .nav-btn { background: none; border: none; color: #888; cursor: pointer; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; padding: 12px 0; }
        .nav-btn:hover { color: #D4AF37; }
      `}</style>

            {/* Floating Dock Nav */}
            <div className="nav-dock">
                <button className="nav-btn" onClick={() => scrollTo('home')}>Home</button>
                <button className="nav-btn" onClick={() => setOverlay('centers')}>Centers</button>
                <button className="nav-btn" onClick={() => setOverlay('courses')}>Practices</button>
                <button className="nav-btn" onClick={() => scrollTo('footer')}>Contact</button>
            </div>

            {/* Hero Section */}
            <Section id="home">
                <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "left" }}>
                    <h4 style={{ letterSpacing: "8px", textTransform: "uppercase", fontSize: "12px", color: "#D4AF37", marginBottom: "20px" }}>Pure Consciousness</h4>
                    <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(48px, 8vw, 100px)", lineHeight: "1", margin: "0 0 40px 0", fontWeight: "400" }}>
                        The Architecture <br /> of <i style={{ fontWeight: "400" }}>Inner Silence</i>
                    </h1>
                    <p style={{ maxWidth: "500px", color: "#888", lineHeight: "1.8", fontSize: "18px" }}>
                        A precision-based approach to spiritual wellness. Rooted in the Dallas-Fort Worth community, guided by universal wisdom.
                    </p>
                </div>
            </Section>

            {/* Grid Section */}
            <Section id="practices" light>
                <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
                        {PRACTICES.map(p => (
                            <div key={p.id} style={{ padding: "40px", border: "1px solid #ddd", borderRadius: "2px" }}>
                                <span style={{ fontSize: "32px" }}>{p.icon}</span>
                                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", margin: "24px 0" }}>{p.title}</h3>
                                <p style={{ color: "#666", lineHeight: "1.6" }}>{p.desc}</p>
                                <button onClick={() => setOverlay('courses')} style={{ marginTop: "24px", background: "none", border: "none", borderBottom: "1px solid #121212", padding: "4px 0", cursor: "pointer", fontWeight: "600" }}>Explore Course</button>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>

            {/* Simple Footer */}
            <footer id="footer" style={{ padding: "80px 24px", textAlign: "center", background: "#000", color: "#444" }}>
                <p>© 2026 SKY YOGA • PLANO • DALLAS • FRISCO</p>
            </footer>

            {/* Functional Overlays (Integrated into Zen Monolith) */}
            {overlay === 'centers' && (
                <div style={{ position: "fixed", inset: 0, background: "#121212", zInterval: 2000, padding: "60px 24px", overflowY: "auto", color: "white" }}>
                    <button onClick={() => setOverlay(null)} style={{ position: "absolute", top: "40px", right: "40px", color: "white", background: "none", border: "none", fontSize: "30px", cursor: "pointer" }}>×</button>
                    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
                        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "40px", marginBottom: "40px" }}>Locations</h2>
                        <div style={{ display: "grid", gap: "20px" }}>
                            {CENTERS.map(c => (
                                <GlassCard key={c.id}>
                                    <h3>{c.name}</h3>
                                    <p style={{ color: "#888", fontSize: "14px" }}>{c.address}</p>
                                    <div style={{ marginTop: "20px" }}>
                                        {SESSIONS.filter(s => s.centerId === c.id).map(s => (
                                            <div key={s.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                                                <span>{s.title} — {s.day}</span>
                                                <button onClick={() => setRegSession(s)} style={{ background: "#D4AF37", border: "none", padding: "8px 16px", borderRadius: "4px", fontWeight: "600", cursor: "pointer" }}>Book</button>
                                            </div>
                                        ))}
                                    </div>
                                </GlassCard>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Registration Modal (Simplified for Zen Monolith) */}
            {regSession && (
                <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.9)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 3000 }}>
                    <div style={{ background: "#1A1A1A", padding: "60px", borderRadius: "8px", maxWidth: "400px", width: "100%", border: "1px solid #333" }}>
                        <h2 style={{ color: "white", marginBottom: "20px" }}>Join {regSession.title}</h2>
                        <input placeholder="Full Name" style={{ width: "100%", padding: "12px", background: "#000", border: "1px solid #333", color: "white", marginBottom: "10px" }} />
                        <input placeholder="Email" style={{ width: "100%", padding: "12px", background: "#000", border: "1px solid #333", color: "white", marginBottom: "20px" }} />
                        <button onClick={() => setRegSession(null)} style={{ width: "100%", padding: "15px", background: "#D4AF37", border: "none", fontWeight: "700" }}>Confirm Registration</button>
                        <button onClick={() => setRegSession(null)} style={{ width: "100%", padding: "15px", background: "none", color: "#666", border: "none" }}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
}