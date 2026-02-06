import { useState, useEffect, useRef } from "react";

// ─── DATA (Complete V3 Dataset) ───
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
    { id: "c9", locationId: "chicago", name: "SKY Chicago Loop", address: "123 State St, Chicago, IL 60601", phone: "+1 (312) 555-0901", desc: "Downtown Chicago's premier meditation center." },
    { id: "c20", locationId: "online", name: "SKY Virtual Studio", address: "Zoom / Google Meet", phone: null, desc: "Join from anywhere in the world. Full SKY experience delivered virtually with live instruction." },
];

const SESSIONS = [
    { id: "s1", centerId: "c1", title: "Weekly SKY Meditation", type: "meditation", mode: "in-person", day: "Saturday", time: "9:00 AM", duration: "90 min", instructor: "Dr. Lakshmi Narayanan", level: "All Levels", spotsTotal: 40, spotsTaken: 28, recurring: true },
    { id: "s2", centerId: "c1", title: "Kayakalpa Yoga Workshop", type: "kayakalpa", mode: "in-person", day: "Feb 15, 2026", time: "10:00 AM", duration: "3 hrs", instructor: "Prof. Sundar", level: "Beginner", spotsTotal: 30, spotsTaken: 12, recurring: false },
    { id: "s3", centerId: "c1", title: "Introspection Level I", type: "introspection", mode: "in-person", day: "Mar 8–9, 2026", time: "9:00 AM", duration: "Full Day", instructor: "Prof. Meena", level: "Beginner", spotsTotal: 25, spotsTaken: 18, recurring: false },
    { id: "s4", centerId: "c1", title: "Simplified Physical Exercise", type: "exercise", mode: "in-person", day: "Wednesday", time: "7:00 AM", duration: "45 min", instructor: "Prof. Ravi", level: "All Levels", spotsTotal: 40, spotsTaken: 15, recurring: true },
    { id: "s5", centerId: "c2", title: "Evening Meditation Circle", type: "meditation", mode: "in-person", day: "Thursday", time: "7:00 PM", duration: "60 min", instructor: "Prof. Arun", level: "All Levels", spotsTotal: 30, spotsTaken: 22, recurring: true },
    { id: "s6", centerId: "c2", title: "Morning Exercise Flow", type: "exercise", mode: "in-person", day: "Tuesday", time: "6:30 AM", duration: "45 min", instructor: "Prof. Kavitha", level: "All Levels", spotsTotal: 25, spotsTaken: 18, recurring: true },
    { id: "s7", centerId: "c3", title: "Family Meditation", type: "meditation", mode: "in-person", day: "Sunday", time: "10:00 AM", duration: "60 min", instructor: "Prof. Deepa", level: "All Levels", spotsTotal: 35, spotsTaken: 20, recurring: true },
    { id: "s8", centerId: "c5", title: "Kayakalpa Advanced", type: "kayakalpa", mode: "in-person", day: "Mar 1, 2026", time: "2:00 PM", duration: "4 hrs", instructor: "Prof. Sundar", level: "Advanced", spotsTotal: 20, spotsTaken: 15, recurring: false },
    { id: "s9", centerId: "c7", title: "Introspection Level II", type: "introspection", mode: "in-person", day: "Mar 22–23, 2026", time: "9:00 AM", duration: "Full Day", instructor: "Prof. Meena", level: "Intermediate", spotsTotal: 20, spotsTaken: 12, recurring: false },
    { id: "s10", centerId: "c9", title: "Urban Meditation", type: "meditation", mode: "in-person", day: "Friday", time: "6:00 PM", duration: "75 min", instructor: "Dr. Patel", level: "All Levels", spotsTotal: 45, spotsTaken: 38, recurring: true },
    { id: "s12", centerId: "c20", title: "Online SKY Meditation", type: "meditation", mode: "online", day: "Saturday", time: "9:00 AM CST", duration: "60 min", instructor: "Dr. Lakshmi Narayanan", level: "All Levels", spotsTotal: 200, spotsTaken: 85, recurring: true },
    { id: "s13", centerId: "c20", title: "Virtual Kayakalpa Intro", type: "kayakalpa", mode: "online", day: "Feb 22, 2026", time: "10:00 AM CST", duration: "2 hrs", instructor: "Prof. Sundar", level: "Beginner", spotsTotal: 100, spotsTaken: 34, recurring: false },
    { id: "s14", centerId: "c20", title: "Monthly Satsang", type: "meditation", mode: "online", day: "Last Saturday", time: "10:00 AM CST", duration: "2 hrs", instructor: "Multiple", level: "All Levels", spotsTotal: 200, spotsTaken: 120, recurring: true },
];

const PRACTICES = [
    { id: "meditation", icon: "🪷", title: "SKY Meditation", tagline: "Commune your consciousness with the universe", desc: "Powerful meditation on the life force that brings a quantum leap in the strength of your mind. Multiple progressive levels from beginner to advanced, each deepening your connection to the Divine.", color: "#E63946", benefits: ["Stress reduction", "Mental clarity", "Emotional balance", "Spiritual growth"] },
    { id: "exercise", icon: "🌿", title: "Physical Exercise", tagline: "9 exercises for total body harmony", desc: "Simple exercises designed to regulate the flow of blood, heat, air, and energy throughout the body. Takes only 15 minutes and is suitable for ages 8 to 80+.", color: "#2A9D8F", benefits: ["Improved flexibility", "Blood circulation", "Energy regulation", "Joint health"] },
    { id: "kayakalpa", icon: "☀️", title: "Kayakalpa Yoga", tagline: "The ancient science of rejuvenation", desc: "An anti-aging practice of the Siddhas of South India for enhancing life energy, preventing disease, and restructuring the body naturally. Strengthens the Life Energy.", color: "#F4A261", benefits: ["Anti-aging", "Disease prevention", "Enhanced vitality", "Life energy boost"] },
    { id: "introspection", icon: "🕊️", title: "Introspection", tagline: "Transform your mind from within", desc: "Self-help practices to sublimate negative emotions — greed, anger, vengeance, worries — and cultivate stronger character traits through guided self-inquiry. Three progressive levels.", color: "#457B9D", benefits: ["Emotional mastery", "Character building", "Self-awareness", "Inner peace"] },
];

// ─── COMPONENTS ───
const CapacityBar = ({ taken, total, color }) => {
    const pct = (taken / total) * 100;
    const left = total - taken;
    return (
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 10 }}>
            <div style={{ flex: 1, height: 6, background: "#F0F0F0", borderRadius: 3, overflow: "hidden" }}>
                <div style={{ width: `${pct}%`, height: "100%", background: pct > 85 ? "#E63946" : color, borderRadius: 3, transition: "width 0.6s cubic-bezier(0.4, 0, 0.2, 1)" }} />
            </div>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: left < 5 ? "#E63946" : "#666", fontWeight: 600, whiteSpace: "nowrap", letterSpacing: 0.5 }}>
                {left} LEFT
            </span>
        </div>
    );
};

const SessionCard = ({ session, onSignUp, onCenterClick, showCenter = true, compact = false }) => {
    const center = CENTERS.find(c => c.id === session.centerId);
    const practice = PRACTICES.find(p => p.id === session.type);
    const [hover, setHover] = useState(false);

    return (
        <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
            style={{ background: "#FFF", border: `2px solid ${hover ? practice.color : "#F0F0F0"}`, borderRadius: 4, padding: compact ? 16 : 24, marginBottom: 16, transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)", transform: hover ? "translateX(4px)" : "translateX(0)" }}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
                <span style={{ fontSize: 9, padding: "4px 10px", borderRadius: 2, background: practice.color, color: "#FFF", fontFamily: "'Inter', sans-serif", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>{practice.icon} {practice.title}</span>
                <span style={{ fontSize: 9, padding: "4px 10px", borderRadius: 2, background: session.mode === "online" ? "#457B9D" : "#2A9D8F", color: "#FFF", fontFamily: "'Inter', sans-serif", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>{session.mode}</span>
            </div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: compact ? 18 : 22, fontWeight: 700, color: "#1A1A1A", marginBottom: 8, lineHeight: 1.2 }}>{session.title}</div>
            {showCenter && (
                <div onClick={() => onCenterClick?.(session.centerId)} style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#666", marginBottom: 8, cursor: "pointer", textDecoration: "underline" }}>
                    📍 {center.name}
                </div>
            )}
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#999", marginBottom: 6, display: "flex", gap: 12, flexWrap: "wrap" }}>
                <span>📅 {session.day}</span>
                <span>🕐 {session.time}</span>
                <span>⏱ {session.duration}</span>
            </div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#AAA", marginBottom: 10 }}>
                👤 {session.instructor} • 📊 {session.level}
            </div>
            <CapacityBar taken={session.spotsTaken} total={session.spotsTotal} color={practice.color} />
            <button onClick={() => onSignUp(session)} style={{ marginTop: 14, background: practice.color, border: "none", borderRadius: 2, padding: "12px 24px", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: "#FFF", fontWeight: 700, width: "100%", transition: "all 0.2s", transform: hover ? "scale(1.02)" : "scale(1)" }}>
                SIGN UP NOW
            </button>
        </div>
    );
};

// ─── NAVIGATION ───
const EditorialNav = ({ onCoursesClick, onCentersClick, scrollTo }) => {
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const h = () => setScrolled(window.scrollY > 100);
        window.addEventListener("scroll", h);
        return () => window.removeEventListener("scroll", h);
    }, []);

    return (
        <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: scrolled ? "#FFF" : "transparent", borderBottom: scrolled ? "2px solid #1A1A1A" : "none", transition: "all 0.4s", padding: "20px 40px" }}>
            <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div onClick={() => scrollTo?.('home')} style={{ cursor: "pointer" }}>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 900, color: "#1A1A1A", letterSpacing: -1 }}>SKY</div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 8, letterSpacing: 3, color: "#666", textTransform: "uppercase", marginTop: -4 }}>Meditation • Dallas</div>
                </div>
                <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
                    {['Home', 'About', 'Services'].map(item => (
                        <button key={item} onClick={() => scrollTo?.(item.toLowerCase())} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#1A1A1A", fontWeight: 600, padding: 0 }}>{item}</button>
                    ))}
                    <button onClick={onCoursesClick} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#1A1A1A", fontWeight: 600, padding: 0 }}>Courses</button>
                    <button onClick={onCentersClick} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#1A1A1A", fontWeight: 600, padding: 0 }}>Centers</button>
                    <button style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#1A1A1A", fontWeight: 600, padding: 0 }}>Stories</button>
                    <button onClick={onCentersClick} style={{ background: "#E63946", border: "none", borderRadius: 0, padding: "10px 24px", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "#FFF", fontWeight: 700 }}>REGISTER</button>
                </div>
            </div>
        </nav>
    );
};

// ─── EXPLORE COURSES OVERLAY ───
const ExploreCoursesOverlay = ({ onClose, onCenterClick, onSignUp, initialPractice }) => {
    const [selectedPractice, setSelectedPractice] = useState(initialPractice);
    const [locSearch, setLocSearch] = useState("");

    useEffect(() => { if (initialPractice) setSelectedPractice(initialPractice); }, [initialPractice]);
    useEffect(() => { document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = ""; }; }, []);

    if (selectedPractice) {
        const p = PRACTICES.find(pr => pr.id === selectedPractice);
        const sessions = SESSIONS.filter(s => s.type === selectedPractice);
        const centersWithSessions = [...new Set(sessions.map(s => s.centerId))].map(cid => CENTERS.find(c => c.id === cid));
        const filteredCenters = locSearch.trim() ? centersWithSessions.filter(c => {
            const loc = LOCATIONS.find(l => l.id === c.locationId);
            const q = locSearch.toLowerCase();
            return c.name.toLowerCase().includes(q) || loc.name.toLowerCase().includes(q) || loc.state.toLowerCase().includes(q) || c.address.toLowerCase().includes(q);
        }) : centersWithSessions;

        return (
            <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "#FAFAFA", overflow: "auto" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 40px" }}>
                    <button onClick={() => setSelectedPractice(null)} style={{ border: "2px solid #1A1A1A", background: "none", cursor: "pointer", marginBottom: 40, fontSize: 11, fontFamily: "'Inter', sans-serif", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", padding: "10px 20px", borderRadius: 0 }}>← ALL PRACTICES</button>

                    <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 60, marginBottom: 60 }}>
                        <div>
                            <div style={{ fontSize: 80, marginBottom: 20 }}>{p.icon}</div>
                            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(48px, 6vw, 72px)", fontWeight: 900, color: "#1A1A1A", lineHeight: 0.95, marginBottom: 16 }}>{p.title}</h1>
                            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: p.color, marginBottom: 24, fontStyle: "italic" }}>{p.tagline}</div>
                            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, lineHeight: 1.8, color: "#444", marginBottom: 24 }}>{p.desc}</p>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                                {p.benefits.map(b => (
                                    <div key={b} style={{ padding: "12px 16px", border: `2px solid ${p.color}`, borderRadius: 0, fontFamily: "'Inter', sans-serif", fontSize: 12, color: p.color, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>
                                        ✓ {b}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div style={{ background: p.color, padding: 40, color: "#FFF", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 64, fontWeight: 900, lineHeight: 1 }}>{centersWithSessions.length}</div>
                            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", marginTop: 8 }}>CENTERS OFFERING</div>
                            <div style={{ width: 40, height: 2, background: "#FFF", marginTop: 20, marginBottom: 20 }} />
                            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 64, fontWeight: 900, lineHeight: 1 }}>{sessions.length}</div>
                            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", marginTop: 8 }}>TOTAL SESSIONS</div>
                        </div>
                    </div>

                    <div style={{ marginBottom: 32 }}>
                        <input type="text" placeholder="SEARCH BY CITY, STATE, OR CENTER NAME..." value={locSearch} onChange={e => setLocSearch(e.target.value)}
                            style={{ width: "100%", padding: "16px 20px", borderRadius: 0, border: "2px solid #1A1A1A", background: "#FFF", fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#1A1A1A", outline: "none", letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 600 }} />
                    </div>

                    {filteredCenters.length === 0 && <div style={{ textAlign: "center", padding: "60px 0", fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#999" }}>No centers found matching "{locSearch}".</div>}

                    {filteredCenters.map(center => {
                        const centerSessions = sessions.filter(s => s.centerId === center.id);
                        const loc = LOCATIONS.find(l => l.id === center.locationId);
                        return (
                            <div key={center.id} style={{ marginBottom: 60, borderTop: "2px solid #1A1A1A", paddingTop: 32 }}>
                                <div style={{ display: "flex", alignItems: "start", justifyContent: "space-between", marginBottom: 24 }}>
                                    <div>
                                        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, color: "#1A1A1A", marginBottom: 8 }}>{center.name}</div>
                                        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#666", letterSpacing: 1 }}>
                                            {loc.id === "online" ? "🌐 VIRTUAL" : `📍 ${loc.name.toUpperCase()}, ${loc.state}`}
                                        </div>
                                    </div>
                                    <button onClick={() => onCenterClick(center.id)} style={{ background: "none", border: "2px solid #1A1A1A", borderRadius: 0, padding: "10px 20px", fontFamily: "'Inter', sans-serif", fontSize: 10, color: "#1A1A1A", cursor: "pointer", letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 700 }}>
                                        VIEW ALL SESSIONS →
                                    </button>
                                </div>
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }}>
                                    {centerSessions.map(s => <SessionCard key={s.id} session={s} onSignUp={onSignUp} onCenterClick={onCenterClick} showCenter={false} compact />)}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    return (
        <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "#FAFAFA", overflow: "auto" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 40px" }}>
                <button onClick={onClose} style={{ border: "2px solid #1A1A1A", background: "none", cursor: "pointer", marginBottom: 40, fontSize: 11, fontFamily: "'Inter', sans-serif", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", padding: "10px 20px", borderRadius: 0 }}>← BACK</button>

                <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(56px, 8vw, 96px)", fontWeight: 900, color: "#1A1A1A", lineHeight: 0.9, marginBottom: 20, textAlign: "center" }}>
                    EXPLORE<br />COURSES
                </h1>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#666", textAlign: "center", marginBottom: 80, letterSpacing: 1 }}>
                    CHOOSE A PRACTICE TO SEE ALL AVAILABLE SESSIONS
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 40 }}>
                    {PRACTICES.map((p, idx) => {
                        const sessionCount = SESSIONS.filter(s => s.type === p.id).length;
                        const centerCount = [...new Set(SESSIONS.filter(s => s.type === p.id).map(s => s.centerId))].length;
                        return (
                            <div key={p.id} onClick={() => setSelectedPractice(p.id)}
                                style={{ background: idx % 2 === 0 ? p.color : "#FFF", border: idx % 2 === 0 ? "none" : `4px solid ${p.color}`, padding: 60, cursor: "pointer", transition: "all 0.4s", position: "relative", overflow: "hidden" }}
                                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.02)"}
                                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
                                <div style={{ fontSize: 72, marginBottom: 24, opacity: idx % 2 === 0 ? 0.2 : 1 }}>{p.icon}</div>
                                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 900, color: idx % 2 === 0 ? "#FFF" : "#1A1A1A", marginBottom: 12, lineHeight: 1.1 }}>{p.title}</h2>
                                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, color: idx % 2 === 0 ? "rgba(255,255,255,0.8)" : p.color, marginBottom: 20, fontStyle: "italic" }}>{p.tagline}</p>
                                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, lineHeight: 1.7, color: idx % 2 === 0 ? "rgba(255,255,255,0.9)" : "#444", marginBottom: 24 }}>{p.desc}</p>
                                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: idx % 2 === 0 ? "#FFF" : p.color, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }}>
                                    {sessionCount} SESSIONS · {centerCount} CENTERS →
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

// ─── FIND A CENTER OVERLAY ───
const FindCenterOverlay = ({ onClose, onCourseClick, onSignUp, initialCenter }) => {
    const [selCenter, setSelCenter] = useState(initialCenter);
    const [searchQ, setSearchQ] = useState("");

    useEffect(() => { if (initialCenter) setSelCenter(initialCenter); }, [initialCenter]);
    useEffect(() => { document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = ""; }; }, []);

    if (selCenter) {
        const center = CENTERS.find(c => c.id === selCenter);
        const loc = LOCATIONS.find(l => l.id === center.locationId);
        const centerSessions = SESSIONS.filter(s => s.centerId === center.id);
        const practiceTypes = [...new Set(centerSessions.map(s => s.type))];

        return (
            <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "#FAFAFA", overflow: "auto" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 40px" }}>
                    <button onClick={() => setSelCenter(null)} style={{ border: "2px solid #1A1A1A", background: "none", cursor: "pointer", marginBottom: 40, fontSize: 11, fontFamily: "'Inter', sans-serif", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", padding: "10px 20px", borderRadius: 0 }}>← ALL CENTERS</button>

                    <div style={{ background: "#1A1A1A", padding: "60px", marginBottom: 60, position: "relative" }}>
                        <div style={{ position: "absolute", top: 20, right: 20, fontFamily: "'Inter', sans-serif", fontSize: 10, padding: "6px 14px", background: loc.id === "online" ? "#457B9D" : "#2A9D8F", color: "#FFF", letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 700 }}>
                            {loc.id === "online" ? "🌐 VIRTUAL" : `📍 ${loc.name.toUpperCase()}`}
                        </div>
                        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 900, color: "#FFF", marginBottom: 16, lineHeight: 1.1 }}>{center.name}</h1>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.8, marginBottom: 24, maxWidth: 700 }}>{center.desc}</p>
                        <div style={{ display: "flex", gap: 32, marginBottom: 24, flexWrap: "wrap" }}>
                            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.6)", letterSpacing: 1 }}>📍 {center.address}</span>
                            {center.phone && <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.6)", letterSpacing: 1 }}>☎ {center.phone}</span>}
                        </div>
                        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                            {practiceTypes.map(t => {
                                const pr = PRACTICES.find(p => p.id === t);
                                return (
                                    <button key={t} onClick={() => onCourseClick(t)} style={{ fontSize: 10, padding: "8px 16px", borderRadius: 0, background: pr.color, border: "none", color: "#FFF", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase" }}>
                                        {pr.icon} {pr.title} →
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {practiceTypes.map(type => {
                        const pr = PRACTICES.find(p => p.id === type);
                        const typeSessions = centerSessions.filter(s => s.type === type);
                        return (
                            <div key={type} style={{ marginBottom: 60, borderTop: `4px solid ${pr.color}`, paddingTop: 32 }}>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                        <span style={{ fontSize: 32 }}>{pr.icon}</span>
                                        <div>
                                            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: "#1A1A1A" }}>{pr.title}</div>
                                            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#999", letterSpacing: 1, textTransform: "uppercase" }}>{typeSessions.length} SESSION{typeSessions.length !== 1 ? "S" : ""}</div>
                                        </div>
                                    </div>
                                    <button onClick={() => onCourseClick(type)} style={{ background: "none", border: `2px solid ${pr.color}`, borderRadius: 0, padding: "10px 20px", fontFamily: "'Inter', sans-serif", fontSize: 10, color: pr.color, cursor: "pointer", letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 700 }}>
                                        VIEW AT ALL CENTERS →
                                    </button>
                                </div>
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }}>
                                    {typeSessions.map(s => <SessionCard key={s.id} session={s} onSignUp={onSignUp} onCenterClick={() => { }} showCenter={false} />)}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    return (
        <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "#FAFAFA", overflow: "auto" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 40px" }}>
                <button onClick={onClose} style={{ border: "2px solid #1A1A1A", background: "none", cursor: "pointer", marginBottom: 40, fontSize: 11, fontFamily: "'Inter', sans-serif", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", padding: "10px 20px", borderRadius: 0 }}>← BACK</button>

                <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(56px, 8vw, 96px)", fontWeight: 900, color: "#1A1A1A", lineHeight: 0.9, marginBottom: 20, textAlign: "center" }}>
                    FIND A<br />CENTER
                </h1>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#666", textAlign: "center", marginBottom: 40, letterSpacing: 1 }}>
                    CHOOSE A LOCATION TO FIND YOUR NEAREST CENTER
                </p>

                <div style={{ maxWidth: 600, margin: "0 auto 60px" }}>
                    <input type="text" placeholder="SEARCH BY CITY, STATE, OR COUNTRY..." value={searchQ} onChange={e => setSearchQ(e.target.value)}
                        style={{ width: "100%", padding: "18px 24px", borderRadius: 0, border: "2px solid #1A1A1A", background: "#FFF", fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#1A1A1A", outline: "none", letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 600 }} />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 24 }}>
                    {(() => {
                        let filtered = CENTERS;
                        if (searchQ.trim()) {
                            const q = searchQ.toLowerCase();
                            filtered = CENTERS.filter(c => {
                                const loc = LOCATIONS.find(l => l.id === c.locationId);
                                return c.name.toLowerCase().includes(q) || loc.name.toLowerCase().includes(q) || loc.state.toLowerCase().includes(q) || c.address.toLowerCase().includes(q);
                            });
                        }
                        if (filtered.length === 0) return <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "60px 0", fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#999" }}>No centers found matching "{searchQ}".</div>;

                        return filtered.map((c, idx) => {
                            const loc = LOCATIONS.find(l => l.id === c.locationId);
                            const sessionCount = SESSIONS.filter(s => s.centerId === c.id).length;
                            const practiceTypes = [...new Set(SESSIONS.filter(s => s.centerId === c.id).map(s => s.type))];
                            const colors = ["#E63946", "#2A9D8F", "#F4A261", "#457B9D"];
                            const bgColor = colors[idx % colors.length];

                            return (
                                <div key={c.id} onClick={() => setSelCenter(c.id)}
                                    style={{ background: "#FFF", border: `4px solid ${bgColor}`, padding: 32, cursor: "pointer", transition: "all 0.3s", position: "relative" }}
                                    onMouseEnter={e => { e.currentTarget.style.background = bgColor; e.currentTarget.querySelectorAll('.text').forEach(el => el.style.color = "#FFF"); }}
                                    onMouseLeave={e => { e.currentTarget.style.background = "#FFF"; e.currentTarget.querySelectorAll('.text').forEach(el => el.style.color = el.dataset.originalColor); }}>
                                    <div style={{ position: "absolute", top: 12, right: 12, fontFamily: "'Inter', sans-serif", fontSize: 9, padding: "4px 10px", background: loc.id === "online" ? "#457B9D" : "#2A9D8F", color: "#FFF", letterSpacing: 1, textTransform: "uppercase", fontWeight: 700 }}>
                                        {loc.id === "online" ? "VIRTUAL" : loc.name.toUpperCase()}
                                    </div>
                                    <h3 className="text" data-original-color="#1A1A1A" style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: "#1A1A1A", marginBottom: 8, marginTop: 20, transition: "color 0.3s" }}>{c.name}</h3>
                                    <p className="text" data-original-color="#666" style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#666", marginBottom: 4, letterSpacing: 0.5, transition: "color 0.3s" }}>{c.address}</p>
                                    <p className="text" data-original-color="#444" style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#444", lineHeight: 1.6, marginBottom: 16, transition: "color 0.3s" }}>{c.desc}</p>
                                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
                                        {practiceTypes.map(t => {
                                            const pr = PRACTICES.find(p => p.id === t);
                                            return <span key={t} style={{ fontSize: 16 }}>{pr.icon}</span>;
                                        })}
                                    </div>
                                    <div className="text" data-original-color={bgColor} style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: bgColor, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", transition: "color 0.3s" }}>
                                        {sessionCount} SESSIONS →
                                    </div>
                                </div>
                            );
                        });
                    })()}
                </div>
            </div>
        </div>
    );
};

// ─── REGISTRATION MODAL ───
const RegistrationModal = ({ session, onClose }) => {
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({ name: "", email: "", phone: "", experience: "", notes: "" });
    const center = CENTERS.find(c => c.id === session.centerId);
    const practice = PRACTICES.find(p => p.id === session.type);

    return (
        <div style={{ position: "fixed", inset: 0, zIndex: 300, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={onClose}>
            <div onClick={e => e.stopPropagation()} style={{ background: "#FFF", padding: 50, borderRadius: 0, width: 500, border: `4px solid ${practice.color}` }}>
                <button onClick={onClose} style={{ position: "absolute", top: 20, right: 20, width: 36, height: 36, borderRadius: 0, background: "#1A1A1A", border: "none", cursor: "pointer", fontSize: 18, color: "#FFF", fontWeight: 700 }}>×</button>
                {step === 1 ? (
                    <>
                        <div style={{ marginBottom: 24 }}>
                            <div style={{ fontSize: 48 }}>{practice.icon}</div>
                            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: "#1A1A1A", marginTop: 12 }}>{session.title}</div>
                            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#666", marginTop: 6 }}>{center.name}</div>
                            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#999", marginTop: 4 }}>📅 {session.day} • 🕐 {session.time}</div>
                        </div>
                        <input placeholder="FULL NAME *" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                            style={{ width: "100%", padding: "14px", border: "2px solid #E0E0E0", borderRadius: 0, marginBottom: 14, outline: "none", fontFamily: "'Inter', sans-serif", fontSize: 12, letterSpacing: 1, textTransform: "uppercase" }} />
                        <input placeholder="EMAIL ADDRESS *" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                            style={{ width: "100%", padding: "14px", border: "2px solid #E0E0E0", borderRadius: 0, marginBottom: 14, outline: "none", fontFamily: "'Inter', sans-serif", fontSize: 12, letterSpacing: 1, textTransform: "uppercase" }} />
                        <input placeholder="PHONE (OPTIONAL)" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                            style={{ width: "100%", padding: "14px", border: "2px solid #E0E0E0", borderRadius: 0, marginBottom: 14, outline: "none", fontFamily: "'Inter', sans-serif", fontSize: 12, letterSpacing: 1, textTransform: "uppercase" }} />
                        <select value={form.experience} onChange={e => setForm({ ...form, experience: e.target.value })}
                            style={{ width: "100%", padding: "14px", border: "2px solid #E0E0E0", borderRadius: 0, marginBottom: 14, outline: "none", fontFamily: "'Inter', sans-serif", fontSize: 12, letterSpacing: 1, textTransform: "uppercase", cursor: "pointer" }}>
                            <option value="">EXPERIENCE LEVEL</option>
                            <option>COMPLETE BEGINNER</option>
                            <option>SOME EXPERIENCE</option>
                            <option>REGULAR PRACTITIONER</option>
                            <option>ADVANCED</option>
                        </select>
                        <textarea placeholder="ANY QUESTIONS OR NOTES?" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} rows={3}
                            style={{ width: "100%", padding: "14px", border: "2px solid #E0E0E0", borderRadius: 0, marginBottom: 24, outline: "none", fontFamily: "'Inter', sans-serif", fontSize: 12, letterSpacing: 1, textTransform: "uppercase", resize: "none" }} />
                        <button onClick={() => { if (form.name && form.email) setStep(2); }}
                            style={{ width: "100%", background: (form.name && form.email) ? practice.color : "#CCC", border: "none", borderRadius: 0, padding: 16, cursor: (form.name && form.email) ? "pointer" : "not-allowed", fontFamily: "'Inter', sans-serif", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: "#FFF", fontWeight: 700 }}>
                            COMPLETE REGISTRATION
                        </button>
                    </>
                ) : (
                    <>
                        <div style={{ textAlign: "center" }}>
                            <div style={{ fontSize: 64, marginBottom: 24 }}>{practice.icon}</div>
                            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 900, color: "#1A1A1A", marginBottom: 12 }}>Namaste!</h3>
                            <p style={{ fontFamily: "'Inter', sans-serif", color: "#666", marginBottom: 8, fontSize: 14 }}>You're registered for</p>
                            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: practice.color, marginBottom: 20 }}>{session.title}</p>
                            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#999", marginBottom: 32 }}>Confirmation sent to <strong>{form.email}</strong></p>
                            <button onClick={onClose} style={{ padding: "14px 40px", border: "2px solid #1A1A1A", background: "#1A1A1A", color: "#FFF", borderRadius: 0, cursor: "pointer", fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", fontWeight: 700 }}>
                                DONE
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

// ─── MAIN COMPONENT ───
export default function EditorialSKY() {
    const [overlay, setOverlay] = useState(null);
    const [courseInitial, setCourseInitial] = useState(null);
    const [centerInitial, setCenterInitial] = useState(null);
    const [regSession, setRegSession] = useState(null);

    const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    const openCourses = (practiceId) => { setCourseInitial(practiceId || null); setOverlay("courses"); };
    const openCenters = (centerId) => { setCenterInitial(centerId || null); setOverlay("centers"); };
    const handleCenterClickFromCourses = (centerId) => { setOverlay("centers"); setCenterInitial(centerId); };
    const handleCourseClickFromCenters = (practiceId) => { setOverlay("courses"); setCourseInitial(practiceId); };

    return (
        <div style={{ background: "#FFF", minHeight: "100vh" }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Inter:wght@400;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: #E63946; color: #FFF; }
      `}</style>

            <EditorialNav onCoursesClick={() => openCourses()} onCentersClick={() => openCenters()} scrollTo={scrollTo} />

            <div id="home" style={{ maxWidth: 1400, margin: "0 auto", padding: "180px 40px 100px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 80, alignItems: "center", marginBottom: 120 }}>
                    <div>
                        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(64px, 10vw, 120px)", fontWeight: 900, color: "#1A1A1A", lineHeight: 0.9, marginBottom: 32 }}>
                            TRANSFORM<br />YOUR MIND
                        </h1>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 18, lineHeight: 1.8, color: "#444", marginBottom: 32, maxWidth: 500 }}>
                            Ancient wisdom meets modern science. Discover the transformative power of SKY Yoga meditation, physical exercise, and introspection practices.
                        </p>
                        <button onClick={() => openCenters()} style={{ background: "#E63946", border: "none", borderRadius: 0, padding: "16px 40px", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: "#FFF", fontWeight: 700 }}>
                            START YOUR JOURNEY
                        </button>
                    </div>
                    <div style={{ background: "#1A1A1A", padding: 60, color: "#FFF" }}>
                        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 72, fontWeight: 900, lineHeight: 1, marginBottom: 12 }}>20+</div>
                        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", marginBottom: 32 }}>CENTERS ACROSS US & CANADA</div>
                        <div style={{ width: 60, height: 3, background: "#E63946", marginBottom: 32 }} />
                        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 72, fontWeight: 900, lineHeight: 1, marginBottom: 12 }}>100%</div>
                        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, letterSpacing: 2, textTransform: "uppercase" }}>FREE COMMUNITY SERVICE</div>
                    </div>
                </div>

                {/* Asymmetric Practice Grid */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 24 }}>
                    {PRACTICES.map((p, idx) => {
                        const spans = [7, 5, 6, 6];
                        const heights = [420, 380, 460, 400];
                        return (
                            <div key={p.id} onClick={() => openCourses(p.id)}
                                style={{ gridColumn: `span ${spans[idx]}`, height: heights[idx], background: idx % 2 === 0 ? p.color : "#FFF", border: idx % 2 === 0 ? "none" : `4px solid ${p.color}`, padding: 40, cursor: "pointer", display: "flex", flexDirection: "column", justifyContent: "flex-end", transition: "all 0.4s", position: "relative", overflow: "hidden" }}
                                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-8px)"}
                                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
                                <div style={{ fontSize: 64, marginBottom: 20, opacity: idx % 2 === 0 ? 0.3 : 1 }}>{p.icon}</div>
                                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 900, color: idx % 2 === 0 ? "#FFF" : "#1A1A1A", marginBottom: 8, lineHeight: 1.1 }}>{p.title}</h3>
                                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: idx % 2 === 0 ? "rgba(255,255,255,0.8)" : "#666", marginBottom: 16 }}>{p.tagline}</p>
                                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: idx % 2 === 0 ? "#FFF" : p.color, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase" }}>
                                    EXPLORE →
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {overlay === 'courses' && <ExploreCoursesOverlay onClose={() => { setOverlay(null); setCourseInitial(null); }} onCenterClick={handleCenterClickFromCourses} onSignUp={setRegSession} initialPractice={courseInitial} />}
            {overlay === 'centers' && <FindCenterOverlay onClose={() => { setOverlay(null); setCenterInitial(null); }} onCourseClick={handleCourseClickFromCenters} onSignUp={setRegSession} initialCenter={centerInitial} />}
            {regSession && <RegistrationModal session={regSession} onClose={() => setRegSession(null)} />}
        </div>
    );
}
