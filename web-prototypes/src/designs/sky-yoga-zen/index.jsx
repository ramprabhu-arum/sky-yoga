import { useState, useEffect } from "react";

// ─── DATA (Imported from V3) ───
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
    { id: "c5", locationId: "houston", name: "SKY Houston Sugarland", address: "456 Sweetwater Blvd, Sugar Land, TX 77479", phone: "+1 (281) 555-0501", desc: "Serving the greater Houston area with regular meditation and yoga sessions." },
    { id: "c6", locationId: "houston", name: "SKY Houston Pearland", address: "789 Broadway St, Pearland, TX 77584", phone: "+1 (281) 555-0601", desc: "South Houston's dedicated SKY center for meditation and wellness." },
    { id: "c7", locationId: "austin", name: "SKY Austin Central", address: "234 S Lamar Blvd, Austin, TX 78704", phone: "+1 (512) 555-0701", desc: "Austin's vibrant SKY community center near downtown." },
    { id: "c8", locationId: "sanantonio", name: "SKY San Antonio", address: "567 Huebner Rd, San Antonio, TX 78230", phone: "+1 (210) 555-0801", desc: "Bringing SKY practices to the San Antonio community." },
    { id: "c20", locationId: "online", name: "SKY Virtual Studio", address: "Zoom / Google Meet", phone: null, desc: "Join from anywhere in the world. Full SKY experience delivered virtually with live instruction." },
];

const SESSIONS = [
    { id: "s1", centerId: "c1", title: "Weekly SKY Meditation", type: "meditation", mode: "in-person", day: "Saturday", time: "9:00 AM", duration: "90 min", instructor: "Dr. Lakshmi Narayanan", level: "All Levels", spotsTotal: 40, spotsTaken: 28, recurring: true },
    { id: "s2", centerId: "c1", title: "Kayakalpa Yoga Workshop", type: "kayakalpa", mode: "in-person", day: "Feb 15, 2026", time: "10:00 AM", duration: "3 hrs", instructor: "Prof. Sundar", level: "Beginner", spotsTotal: 30, spotsTaken: 12, recurring: false },
    { id: "s3", centerId: "c1", title: "Introspection Level I", type: "introspection", mode: "in-person", day: "Mar 8–9, 2026", time: "9:00 AM", duration: "Full Day", instructor: "Prof. Meena", level: "Beginner", spotsTotal: 25, spotsTaken: 18, recurring: false },
    { id: "s4", centerId: "c1", title: "Simplified Physical Exercise", type: "exercise", mode: "in-person", day: "Wednesday", time: "7:00 AM", duration: "45 min", instructor: "Prof. Ravi", level: "All Levels", spotsTotal: 40, spotsTaken: 15, recurring: true },
    { id: "s12", centerId: "c20", title: "Online SKY Meditation", type: "meditation", mode: "online", day: "Saturday", time: "9:00 AM CST", duration: "60 min", instructor: "Dr. Lakshmi Narayanan", level: "All Levels", spotsTotal: 200, spotsTaken: 85, recurring: true },
    { id: "s13", centerId: "c20", title: "Virtual Kayakalpa Intro", type: "kayakalpa", mode: "online", day: "Feb 22, 2026", time: "10:00 AM CST", duration: "2 hrs", instructor: "Prof. Sundar", level: "Beginner", spotsTotal: 100, spotsTaken: 34, recurring: false },
    { id: "s14", centerId: "c20", title: "Monthly Satsang", type: "meditation", mode: "online", day: "Last Saturday", time: "10:00 AM CST", duration: "2 hrs", instructor: "Multiple", level: "All Levels", spotsTotal: 200, spotsTaken: 120, recurring: true },
];

const PRACTICES = [
    { id: "meditation", icon: "🪷", title: "SKY Meditation", tagline: "Commune your consciousness with the universe", desc: "Powerful meditation on the life force that brings a quantum leap in the strength of your mind. Multiple progressive levels from beginner to advanced, each deepening your connection to the Divine.", color: "#C4956A", benefits: ["Stress reduction", "Mental clarity", "Emotional balance", "Spiritual growth"] },
    { id: "exercise", icon: "🌿", title: "Physical Exercise", tagline: "9 exercises for total body harmony", desc: "Simple exercises designed to regulate the flow of blood, heat, air, and energy throughout the body. Takes only 15 minutes and is suitable for ages 8 to 80+.", color: "#8B9A6F", benefits: ["Improved flexibility", "Blood circulation", "Energy regulation", "Joint health"] },
    { id: "kayakalpa", icon: "☀️", title: "Kayakalpa Yoga", tagline: "The ancient science of rejuvenation", desc: "An anti-aging practice of the Siddhas of South India for enhancing life energy, preventing disease, and restructuring the body naturally. Strengthens the Life Energy.", color: "#9A7FB5", benefits: ["Anti-aging", "Disease prevention", "Enhanced vitality", "Life energy boost"] },
    { id: "introspection", icon: "🕊️", title: "Introspection", tagline: "Transform your mind from within", desc: "Self-help practices to sublimate negative emotions — greed, anger, vengeance, worries — and cultivate stronger character traits through guided self-inquiry. Three progressive levels.", color: "#6F8B9A", benefits: ["Emotional mastery", "Character building", "Self-awareness", "Inner peace"] },
];

const COMMUNITY_STATS = [
    { label: "Centers", val: CENTERS.length.toString() },
    { label: "Practitioners", val: "2.5k+" },
    { label: "Sessions Total", val: SESSIONS.length.toString() },
];

// ─── COMPONENTS ───

const SidebarItem = ({ icon, label, active, onClick }) => (
    <button onClick={onClick} style={{
        background: active ? "#F4F2ED" : "transparent", border: "none",
        width: "100%", padding: "16px 24px", textAlign: "left", cursor: "pointer",
        display: "flex", alignItems: "center", gap: 16, borderRadius: 12,
        transition: "all 0.2s"
    }}>
        <span style={{ fontSize: 20 }}>{icon}</span>
        <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 500, color: active ? "#222" : "#888" }}>{label}</span>
    </button>
);

const Widget = ({ title, children, colSpan = 1, rowSpan = 1, style }) => (
    <div style={{
        gridColumn: `span ${colSpan}`, gridRow: `span ${rowSpan}`,
        background: "#FFF", border: "1px solid #EAEAEA", borderRadius: 24,
        padding: 24, display: "flex", flexDirection: "column",
        boxShadow: "0 2px 10px rgba(0,0,0,0.02)", ...style
    }}>
        {title && <div style={{
            fontFamily: "'Outfit', sans-serif", fontSize: 13, textTransform: "uppercase",
            letterSpacing: 1, color: "#999", marginBottom: 20, fontWeight: 600,
            display: "flex", justifyContent: "space-between", alignItems: "center"
        }}>
            {title}
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#D4AF37" }} />
        </div>}
        {children}
    </div>
);

const SessionRow = ({ s, onJoin }) => {
    const practice = PRACTICES.find(p => p.id === s.type);
    const isOnline = s.mode === "online";
    return (
        <div style={{
            display: "flex", alignItems: "center", gap: 20, padding: "16px 0",
            borderBottom: "1px solid #F5F5F5"
        }}>
            <div style={{ width: 70, fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 600, color: "#444" }}>{s.time}</div>
            <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: "#222", fontWeight: 600 }}>{s.title}</div>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, color: "#888", marginTop: 2 }}>{s.instructor} • {s.day}</div>
            </div>
            <div style={{ textAlign: "right", marginRight: 10 }}>
                <div style={{ fontSize: 14 }}>{practice.icon}</div>
            </div>
            <button onClick={() => onJoin(s)} style={{
                background: isOnline ? "#222" : "transparent", color: isOnline ? "#FFF" : "#222",
                border: "1px solid #EEE", borderRadius: 50, padding: "8px 18px",
                fontSize: 11, fontWeight: 600, cursor: "pointer", transition: "all 0.2s"
            }}>
                {isOnline ? "JOIN LIVE" : "REGISTER"}
            </button>
        </div>
    );
};

// ─── MODAL ───
const RegistrationModal = ({ session, onClose }) => {
    const [step, setStep] = useState(1);
    const center = CENTERS.find(c => c.id === session.centerId);

    return (
        <div style={{
            position: "fixed", inset: 0, zIndex: 1000,
            background: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)",
            display: "flex", alignItems: "center", justifyContent: "center"
        }}>
            <div style={{
                background: "#FFF", width: 500, borderRadius: 24, boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
                border: "1px solid #EAEAEA", padding: 40, position: "relative"
            }}>
                <button onClick={onClose} style={{
                    position: "absolute", top: 20, right: 20, border: "none", background: "none",
                    fontSize: 24, cursor: "pointer", color: "#999"
                }}>×</button>

                {step === 1 ? (
                    <>
                        <div style={{ marginBottom: 30 }}>
                            <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 1, color: "#D4AF37", fontWeight: 600, marginBottom: 8 }}>Event Registration</div>
                            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, margin: 0 }}>{session.title}</h2>
                            <p style={{ color: "#666", marginTop: 8 }}>{session.day} • {session.time} • {center.name}</p>
                        </div>

                        <div style={{ display: "grid", gap: 16 }}>
                            <input placeholder="Full Name" style={{ width: "100%", padding: "16px", border: "1px solid #EEE", borderRadius: 8, fontFamily: "'Outfit', sans-serif" }} />
                            <input placeholder="Email Address" style={{ width: "100%", padding: "16px", border: "1px solid #EEE", borderRadius: 8, fontFamily: "'Outfit', sans-serif" }} />
                            <button onClick={() => setStep(2)} style={{ width: "100%", padding: "16px", background: "#222", color: "#FFF", border: "none", borderRadius: 8, fontWeight: 600, cursor: "pointer", marginTop: 8 }}>CONFIRM BOOKING</button>
                        </div>
                    </>
                ) : (
                    <div style={{ textAlign: "center", padding: "40px 0" }}>
                        <div style={{ fontSize: 60, marginBottom: 20, color: "#D4AF37" }}>✓</div>
                        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, margin: "0 0 16px" }}>You are confirmed.</h2>
                        <p style={{ color: "#666", maxWidth: 300, margin: "0 auto 30px" }}>A calendar invite has been sent to your email address.</p>
                        <button onClick={onClose} style={{ background: "#F4F2ED", border: "none", padding: "12px 30px", borderRadius: 8, cursor: "pointer", fontWeight: 600 }}>Close</button>
                    </div>
                )}
            </div>
        </div>
    );
};

// ─── MAIN LAYOUT ───
export default function ZenDashboard() {
    const [nav, setNav] = useState("portal");
    const [regSession, setRegSession] = useState(null);

    // Featured = Next Online Session
    const featuredSession = SESSIONS.find(s => s.mode === "online") || SESSIONS[0];
    const todaysSessions = SESSIONS.slice(0, 4);

    return (
        <div style={{
            display: "flex", minHeight: "100vh", background: "#F9F9F9",
            color: "#222", fontFamily: "'Outfit', sans-serif"
        }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=Outfit:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #DDD; borderRadius: 4px; }
      `}</style>

            {/* SIDEBAR */}
            <div style={{
                width: 280, padding: 32, borderRight: "1px solid #EAEAEA", background: "#FFF",
                display: "flex", flexDirection: "column"
            }}>
                <div style={{ marginBottom: 48, paddingLeft: 12 }}>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 600, color: "#222" }}>Sky Yoga.</div>
                    <div style={{ fontSize: 11, color: "#999", letterSpacing: 1 }}>PUBLIC PORTAL</div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
                    <SidebarItem icon="⚡" label="What's On" active={nav === "portal"} onClick={() => setNav("portal")} />
                    <SidebarItem icon="🏵️" label="Our Practices" active={nav === "practices"} onClick={() => setNav("practices")} />
                    <SidebarItem icon="📍" label="Find a Center" active={nav === "centers"} onClick={() => setNav("centers")} />
                    <SidebarItem icon="📅" label="Events Calendar" active={nav === "events"} onClick={() => setNav("events")} />
                </div>

                <div style={{
                    background: "#222", borderRadius: 16, padding: 24,
                    display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", color: "#FFF"
                }}>
                    <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, margin: "0 0 8px" }}>Member Access</h4>
                    <p style={{ fontSize: 12, color: "#CCC", marginBottom: 16, lineHeight: 1.5 }}>Log in to track your progress and manage bookings.</p>
                    <button style={{
                        background: "#D4AF37", color: "#FFF", border: "none", width: "100%", padding: "12px",
                        borderRadius: 8, fontWeight: 600, cursor: "pointer", fontSize: 12
                    }}>SIGN IN</button>
                </div>
            </div>

            {/* MAIN CONTENT */}
            <div style={{ flex: 1, padding: 40, overflowY: "auto" }}>

                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 40 }}>
                    <div>
                        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 42, margin: 0, color: "#222" }}>Welcome to Stillness.</h1>
                        <p style={{ color: "#666", marginTop: 8 }}>Discover the ancient science of Simplified Kundalini Yoga.</p>
                    </div>
                    <div style={{ display: "flex", gap: 12 }}>
                        <button style={{ padding: "10px 20px", border: "1px solid #DDD", background: "white", borderRadius: 50, cursor: "pointer", fontSize: 13 }}>About Us</button>
                        <button style={{ padding: "10px 20px", background: "#222", color: "white", border: "none", borderRadius: 50, cursor: "pointer", fontSize: 13 }} onClick={() => setRegSession(featuredSession)}>Get Started</button>
                    </div>
                </div>

                {/* Dashboard Grid */}
                <div style={{
                    display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gridAutoRows: "minmax(180px, auto)", gap: 24
                }}>

                    {/* 1. HERO WIDGET */}
                    <Widget title="Featured Session" colSpan={2}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flex: 1 }}>
                            <div>
                                <div style={{ fontSize: 12, background: "#E6F4EA", color: "#1E8E3E", padding: "4px 10px", borderRadius: 10, display: "inline-block", marginBottom: 12, fontWeight: 600 }}>RECOMMENDED</div>
                                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, margin: "0 0 8px" }}>{featuredSession.title}</h2>
                                <p style={{ color: "#666", fontSize: 14 }}>{featuredSession.day} • {featuredSession.instructor}</p>
                            </div>
                            <button onClick={() => setRegSession(featuredSession)} style={{
                                background: "#222", color: "#FFF", border: "none", borderRadius: 100,
                                width: 90, height: 90, fontSize: 14, cursor: "pointer", fontWeight: 600,
                                boxShadow: "0 10px 20px rgba(0,0,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center"
                            }}>JOIN<br />NOW</button>
                        </div>
                    </Widget>

                    {/* 2. COMMUNITY IMPACT */}
                    <Widget title="Our Community" rowSpan={2}>
                        <div style={{ display: "flex", flexDirection: "column", gap: 32, justifyContent: "center", flex: 1 }}>
                            {COMMUNITY_STATS.map(st => (
                                <div key={st.label}>
                                    <div style={{ fontSize: 36, fontWeight: 300, fontFamily: "'Cormorant Garamond', serif" }}>{st.val}</div>
                                    <div style={{ fontSize: 11, color: "#999", letterSpacing: 1, textTransform: "uppercase" }}>{st.label}</div>
                                    <div style={{ height: 1, width: "100%", background: "#F0F0F0", marginTop: 16 }} />
                                </div>
                            ))}
                        </div>
                    </Widget>

                    {/* 3. SCHEDULE */}
                    <Widget title="Upcoming Sessions" colSpan={2} rowSpan={2}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            {todaysSessions.map(s => <SessionRow key={s.id} s={s} onJoin={setRegSession} />)}
                            <button style={{ marginTop: 20, background: "none", border: "none", color: "#888", fontSize: 12, textAlign: "center", cursor: "pointer" }}>View Full Calendar ▼</button>
                        </div>
                    </Widget>

                    {/* 4. PROMO */}
                    <Widget title="Special Offer">
                        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", background: "#F8F6F2", margin: "-24px", padding: "24px" }}>
                            <div style={{ fontSize: 32, marginBottom: 10 }}>🎁</div>
                            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, margin: "0 0 6px" }}>New to Sky Yoga?</h3>
                            <p style={{ fontSize: 13, color: "#666", lineHeight: 1.5, marginBottom: 12 }}>Join our Intro Workshop this Saturday for free.</p>
                            <button style={{ background: "transparent", border: "1px solid #D4AF37", color: "#D4AF37", padding: "8px", borderRadius: 4, cursor: "pointer", fontSize: 11, fontWeight: 700 }}>CLAIM PASS</button>
                        </div>
                    </Widget>

                    {/* 5. LOCATIONS */}
                    <Widget title="Nearest Center">
                        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, margin: "0 0 4px" }}>{CENTERS[0].name}</h3>
                        <p style={{ fontSize: 13, color: "#666", marginBottom: 16 }}>{CENTERS[0].address}</p>
                        <div style={{ height: 100, background: "#EEE", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", color: "#AAA", fontSize: 12 }}>
                            Interactive Map
                        </div>
                    </Widget>

                </div>
            </div>

            {regSession && <RegistrationModal session={regSession} onClose={() => setRegSession(null)} />}
        </div>
    );
}