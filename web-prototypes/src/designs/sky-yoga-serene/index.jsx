import { useState, useEffect } from "react";

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
    { id: "c20", locationId: "online", name: "SKY Virtual Studio", address: "Zoom / Google Meet", phone: null, desc: "Join from anywhere in the world. Full SKY experience delivered virtually with live instruction." },
];

const SESSIONS = [
    { id: "s1", centerId: "c1", title: "Weekly SKY Meditation", type: "meditation", mode: "in-person", day: "Saturday", time: "9:00 AM", duration: "90 min", instructor: "Dr. Lakshmi Narayanan", level: "All Levels", spotsTotal: 40, spotsTaken: 28, recurring: true },
    { id: "s2", centerId: "c1", title: "Kayakalpa Yoga Workshop", type: "kayakalpa", mode: "in-person", day: "Feb 15, 2026", time: "10:00 AM", duration: "3 hrs", instructor: "Prof. Sundar", level: "Beginner", spotsTotal: 30, spotsTaken: 12, recurring: false },
    { id: "s3", centerId: "c1", title: "Introspection Level I", type: "introspection", mode: "in-person", day: "Mar 8–9, 2026", time: "9:00 AM", duration: "Full Day", instructor: "Prof. Meena", level: "Beginner", spotsTotal: 25, spotsTaken: 18, recurring: false },
    { id: "s4", centerId: "c1", title: "Simplified Physical Exercise", type: "exercise", mode: "in-person", day: "Wednesday", time: "7:00 AM", duration: "45 min", instructor: "Prof. Ravi", level: "All Levels", spotsTotal: 40, spotsTaken: 15, recurring: true },
    { id: "s5", centerId: "c2", title: "Evening Meditation Circle", type: "meditation", mode: "in-person", day: "Thursday", time: "7:00 PM", duration: "60 min", instructor: "Prof. Arun", level: "All Levels", spotsTotal: 30, spotsTaken: 22, recurring: true },
    { id: "s12", centerId: "c20", title: "Online SKY Meditation", type: "meditation", mode: "online", day: "Saturday", time: "9:00 AM CST", duration: "60 min", instructor: "Dr. Lakshmi Narayanan", level: "All Levels", spotsTotal: 200, spotsTaken: 85, recurring: true },
    { id: "s13", centerId: "c20", title: "Virtual Kayakalpa Intro", type: "kayakalpa", mode: "online", day: "Feb 22, 2026", time: "10:00 AM CST", duration: "2 hrs", instructor: "Prof. Sundar", level: "Beginner", spotsTotal: 100, spotsTaken: 34, recurring: false },
];

const PRACTICES = [
    { id: "meditation", icon: "🪷", title: "SKY Meditation", tagline: "Commune your consciousness with the universe", desc: "Powerful meditation on the life force that brings a quantum leap in the strength of your mind. Multiple progressive levels from beginner to advanced, each deepening your connection to the Divine.", color: "#748C70", benefits: ["Stress reduction", "Mental clarity", "Emotional balance", "Spiritual growth"] },
    { id: "exercise", icon: "🌿", title: "Physical Exercise", tagline: "9 exercises for total body harmony", desc: "Simple exercises designed to regulate the flow of blood, heat, air, and energy throughout the body. Takes only 15 minutes and is suitable for ages 8 to 80+.", color: "#9DB29B", benefits: ["Improved flexibility", "Blood circulation", "Energy regulation", "Joint health"] },
    { id: "kayakalpa", icon: "☀️", title: "Kayakalpa Yoga", tagline: "The ancient science of rejuvenation", desc: "An anti-aging practice of the Siddhas of South India for enhancing life energy, preventing disease, and restructuring the body naturally. Strengthens the Life Energy.", color: "#B5A48B", benefits: ["Anti-aging", "Disease prevention", "Enhanced vitality", "Life energy boost"] },
    { id: "introspection", icon: "🕊️", title: "Introspection", tagline: "Transform your mind from within", desc: "Self-help practices to sublimate negative emotions — greed, anger, vengeance, worries — and cultivate stronger character traits through guided self-inquiry. Three progressive levels.", color: "#8B9BA4", benefits: ["Emotional mastery", "Character building", "Self-awareness", "Inner peace"] },
];

// ─── HOOKS ───
function useParallax(speed = 0.5) {
    const [offset, setOffset] = useState(0);
    useEffect(() => {
        const handleScroll = () => setOffset(window.scrollY * speed);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [speed]);
    return offset;
}

// ─── COMPONENTS ───
const IslandNav = ({ setOverlay, scrollTo }) => {
    const [shrunk, setShrunk] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    useEffect(() => {
        const h = () => setShrunk(window.scrollY > 50);
        window.addEventListener("scroll", h);
        return () => window.removeEventListener("scroll", h);
    }, []);

    return (
        <>
            <div style={{ position: "fixed", top: 20, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 100, pointerEvents: "none", padding: "0 20px" }}>
                <div style={{
                    pointerEvents: "auto", background: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)",
                    borderRadius: 40, padding: shrunk ? "12px 24px" : "clamp(12px, 3vw, 20px) clamp(20px, 4vw, 40px)",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.03)", border: "1px solid rgba(255,255,255,0.4)",
                    transition: "all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)", display: "flex", alignItems: "center", gap: "clamp(12px, 2vw, 20px)",
                    width: "100%", maxWidth: 900, justifyContent: "space-between"
                }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "clamp(8px, 2vw, 12px)" }}>
                        <div style={{ width: shrunk ? 32 : "clamp(32px, 5vw, 40px)", height: shrunk ? 32 : "clamp(32px, 5vw, 40px)", borderRadius: "50%", background: "#7A9E7E", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFF", fontWeight: 700, transition: "all 0.4s", fontSize: "clamp(14px, 3vw, 18px)" }}>S</div>
                        <div className="nav-title" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(16px, 3vw, 20px)", color: "#3D4F40" }}>Sky Yoga</div>
                    </div>

                    {/* Desktop Menu */}
                    <div className="desktop-nav-menu" style={{ display: "flex", alignItems: "center", gap: 16 }}>
                        <div style={{ width: 1, height: 20, background: "#E0E0E0" }} />
                        {['Home', 'About', 'Services', 'Courses', 'Centers', 'Stories'].map(item => (
                            <button key={item} onClick={() => {
                                if (item === 'Home') scrollTo?.('home');
                                if (item === 'Courses') setOverlay('courses');
                                if (item === 'Centers') setOverlay('centers');
                            }} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#5F6F62", fontWeight: 500 }}>{item}</button>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="mobile-nav-btn" style={{ display: "none", background: "none", border: "none", cursor: "pointer", fontSize: 20, color: "#5F6F62", padding: 8 }}>☰</button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {mobileMenuOpen && (
                <div className="mobile-nav-dropdown" style={{ position: "fixed", top: 80, left: 20, right: 20, zIndex: 99, background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)", borderRadius: 20, padding: 20, boxShadow: "0 10px 30px rgba(0,0,0,0.1)", border: "1px solid rgba(255,255,255,0.4)" }}>
                    {['Home', 'About', 'Services', 'Courses', 'Centers', 'Stories'].map(item => (
                        <button key={item} onClick={() => {
                            if (item === 'Home') scrollTo?.('home');
                            if (item === 'Courses') setOverlay('courses');
                            if (item === 'Centers') setOverlay('centers');
                            setMobileMenuOpen(false);
                        }} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#5F6F62", fontWeight: 500, padding: "12px 0", width: "100%", textAlign: "left", display: "block" }}>{item}</button>
                    ))}
                </div>
            )}
        </>
    );
};

const Blob = ({ color, size, top, left, speed = 0.2 }) => {
    const y = useParallax(speed);
    return <div style={{ position: "absolute", top, left, width: size, height: size, borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%", background: color, opacity: 0.1, zIndex: 0, transform: `translateY(${y}px) rotate(${y * 0.1}deg)`, transition: "transform 0.1s linear" }} />;
};

const CapacityBar = ({ taken, total, color }) => {
    const pct = (taken / total) * 100;
    const left = total - taken;
    return (
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
            <div style={{ flex: 1, height: 4, background: "rgba(122,158,126,0.15)", borderRadius: 2, overflow: "hidden" }}>
                <div style={{ width: `${pct}%`, height: "100%", background: pct > 85 ? "#D4766A" : color, borderRadius: 2, transition: "width 0.5s" }} />
            </div>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: left < 5 ? "#D4766A" : "#8FA894", fontWeight: left < 5 ? 600 : 400, whiteSpace: "nowrap" }}>
                {left} spot{left !== 1 ? "s" : ""} left
            </span>
        </div>
    );
};

const SessionRow = ({ session, onSignUp, onCenterClick, showCenter = true }) => {
    const center = CENTERS.find(c => c.id === session.centerId);
    const practice = PRACTICES.find(p => p.id === session.type);
    return (
        <div style={{ background: "#FFF", borderRadius: 20, padding: 20, marginBottom: 12, border: "1px solid rgba(122,158,126,0.08)", transition: "all 0.3s" }}
            onMouseOver={e => e.currentTarget.style.boxShadow = "0 8px 24px rgba(122,158,126,0.12)"}
            onMouseOut={e => e.currentTarget.style.boxShadow = "none"}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
                <span style={{ fontSize: 10, padding: "4px 12px", borderRadius: 12, background: `${practice.color}14`, color: practice.color, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, textTransform: "uppercase" }}>{practice.icon} {practice.title}</span>
                <span style={{ fontSize: 10, padding: "4px 12px", borderRadius: 12, background: session.mode === "online" ? "rgba(139,155,164,0.1)" : "rgba(122,158,126,0.1)", color: session.mode === "online" ? "#8B9BA4" : "#7A9E7E", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, textTransform: "uppercase" }}>{session.mode}</span>
            </div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: "#3D4F40", marginBottom: 8 }}>{session.title}</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#8FA894", marginBottom: 8 }}>
                {showCenter && <span onClick={() => onCenterClick?.(session.centerId)} style={{ cursor: "pointer", textDecoration: "underline", marginRight: 12 }}>📍 {center.name}</span>}
                <span>📅 {session.day} • 🕐 {session.time} • ⏱ {session.duration}</span>
            </div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#A0B0A4", marginBottom: 8 }}>👤 {session.instructor} • 📊 {session.level}</div>
            <CapacityBar taken={session.spotsTaken} total={session.spotsTotal} color={practice.color} />
            <button onClick={() => onSignUp(session)} style={{ marginTop: 12, background: "#7A9E7E", border: "none", borderRadius: 12, padding: "10px 20px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: 12, letterSpacing: 1, textTransform: "uppercase", color: "#FFF", fontWeight: 600 }}>Sign Up</button>
        </div>
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
            <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "#FAF9F6", overflow: "auto" }}>
                <div style={{ maxWidth: 900, margin: "0 auto", padding: "100px 24px" }}>
                    <button onClick={() => setSelectedPractice(null)} style={{ border: "none", background: "none", cursor: "pointer", marginBottom: 32, fontSize: 14, fontFamily: "'DM Sans', sans-serif", color: "#7A9E7E", display: "flex", alignItems: "center", gap: 6 }}>← All Practices</button>
                    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
                        <div style={{ width: 56, height: 56, borderRadius: 16, background: `${p.color}12`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>{p.icon}</div>
                        <div>
                            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 400, color: "#3D4F40", lineHeight: 1.1 }}>{p.title}</h1>
                            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#8FA894", marginTop: 2 }}>{p.tagline}</div>
                        </div>
                    </div>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, lineHeight: 1.8, color: "#5F6F62", marginBottom: 16 }}>{p.desc}</p>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32 }}>
                        {p.benefits.map(b => <span key={b} style={{ padding: "6px 14px", borderRadius: 20, background: `${p.color}0C`, border: `1px solid ${p.color}20`, fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: p.color, fontWeight: 500 }}>✓ {b}</span>)}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: "#8FA894" }}>Available at {centersWithSessions.length} center{centersWithSessions.length !== 1 ? "s" : ""}</div>
                        <input type="text" placeholder="Search by city, state, or center name..." value={locSearch} onChange={e => setLocSearch(e.target.value)}
                            style={{ padding: "9px 16px", borderRadius: 12, border: "1px solid rgba(122,158,126,0.15)", background: "#FFF", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#3D4F40", outline: "none", width: 280 }} />
                    </div>
                    {filteredCenters.length === 0 && <div style={{ textAlign: "center", padding: "40px 0", fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#8FA894" }}>No centers found matching "{locSearch}".</div>}
                    {filteredCenters.map(center => {
                        const centerSessions = sessions.filter(s => s.centerId === center.id);
                        const loc = LOCATIONS.find(l => l.id === center.locationId);
                        return (
                            <div key={center.id} style={{ marginBottom: 32 }}>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12, paddingBottom: 10, borderBottom: "1px solid rgba(122,158,126,0.08)" }}>
                                    <div>
                                        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: "#3D4F40" }}>{center.name}</span>
                                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#8FA894", marginLeft: 10 }}>{loc.id === "online" ? "🌐 Virtual" : `📍 ${loc.name}, ${loc.state}`}</span>
                                    </div>
                                    <button onClick={() => onCenterClick(center.id)} style={{ background: "none", border: "1px solid rgba(122,158,126,0.2)", borderRadius: 8, padding: "6px 14px", fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#7A9E7E", cursor: "pointer" }}>View all sessions at this center →</button>
                                </div>
                                {centerSessions.map(s => <SessionRow key={s.id} session={s} onSignUp={onSignUp} onCenterClick={onCenterClick} showCenter={false} />)}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    return (
        <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "#FAF9F6", overflow: "auto" }}>
            <div style={{ maxWidth: 900, margin: "0 auto", padding: "100px 24px" }}>
                <button onClick={onClose} style={{ border: "none", background: "none", cursor: "pointer", marginBottom: 32, fontSize: 32 }}>←</button>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 48, marginBottom: 16, color: "#3D4F40", textAlign: "center" }}>Explore Courses</h2>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#5F6F62", textAlign: "center", marginBottom: 48 }}>Choose a practice to see all available sessions across every center.</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20 }}>
                    {PRACTICES.map(p => {
                        const sessionCount = SESSIONS.filter(s => s.type === p.id).length;
                        const centerCount = [...new Set(SESSIONS.filter(s => s.type === p.id).map(s => s.centerId))].length;
                        return (
                            <div key={p.id} onClick={() => setSelectedPractice(p.id)} style={{ background: "#FFF", borderRadius: 24, padding: 32, cursor: "pointer", border: "1px solid rgba(122,158,126,0.08)", transition: "all 0.35s" }}
                                onMouseOver={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 14px 44px rgba(122,158,126,0.12)"; }}
                                onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                                <div style={{ width: 52, height: 52, borderRadius: 14, background: `${p.color}10`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, marginBottom: 20 }}>{p.icon}</div>
                                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 600, color: "#3D4F40", marginBottom: 6 }}>{p.title}</h3>
                                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#8FA894", marginBottom: 8, fontStyle: "italic" }}>{p.tagline}</p>
                                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, lineHeight: 1.7, color: "#5F6F62", marginBottom: 16 }}>{p.desc}</p>
                                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: p.color, fontWeight: 600 }}>{sessionCount} sessions · {centerCount} centers →</div>
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
            <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "#FAF9F6", overflow: "auto" }}>
                <div style={{ maxWidth: 900, margin: "0 auto", padding: "100px 24px" }}>
                    <button onClick={() => setSelCenter(null)} style={{ border: "none", background: "none", cursor: "pointer", marginBottom: 32, fontSize: 14, fontFamily: "'DM Sans', sans-serif", color: "#7A9E7E", display: "flex", alignItems: "center", gap: 6 }}>← All Centers</button>
                    <div style={{ background: "linear-gradient(135deg, #7A9E7E, #6B8D6F)", borderRadius: 24, padding: "36px 36px 28px", marginBottom: 36, position: "relative", overflow: "hidden" }}>
                        <div style={{ position: "relative", zIndex: 1 }}>
                            <span style={{ fontSize: 10, padding: "4px 12px", borderRadius: 12, background: loc.id === "online" ? "rgba(139,155,164,0.2)" : "rgba(157,178,155,0.2)", color: loc.id === "online" ? "#C0D0D8" : "#D0E0CE", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, textTransform: "uppercase" }}>{loc.id === "online" ? "🌐 Virtual" : `📍 ${loc.name}, ${loc.state}`}</span>
                            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 4vw, 38px)", fontWeight: 400, color: "#FFF", marginTop: 12, marginBottom: 8 }}>{center.name}</h1>
                            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.7 }}>{center.desc}</p>
                            <div style={{ display: "flex", gap: 20, marginTop: 16, flexWrap: "wrap" }}>
                                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.6)" }}>📍 {center.address}</span>
                                {center.phone && <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.6)" }}>☎ {center.phone}</span>}
                            </div>
                            <div style={{ display: "flex", gap: 12, marginTop: 18 }}>
                                {practiceTypes.map(t => {
                                    const pr = PRACTICES.find(p => p.id === t);
                                    return <span key={t} onClick={() => onCourseClick(t)} style={{ fontSize: 10, padding: "5px 14px", borderRadius: 14, background: "rgba(255,255,255,0.2)", color: "#FFF", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, textTransform: "uppercase" }}>{pr.icon} {pr.title} →</span>;
                                })}
                            </div>
                        </div>
                    </div>
                    {practiceTypes.map(type => {
                        const pr = PRACTICES.find(p => p.id === type);
                        const typeSessions = centerSessions.filter(s => s.type === type);
                        return (
                            <div key={type} style={{ marginBottom: 32 }}>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12, paddingBottom: 10, borderBottom: "1px solid rgba(122,158,126,0.08)" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                        <span style={{ fontSize: 20 }}>{pr.icon}</span>
                                        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: "#3D4F40" }}>{pr.title}</span>
                                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#8FA894" }}>· {typeSessions.length} session{typeSessions.length !== 1 ? "s" : ""}</span>
                                    </div>
                                    <button onClick={() => onCourseClick(type)} style={{ background: "none", border: "1px solid rgba(122,158,126,0.2)", borderRadius: 8, padding: "6px 14px", fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#7A9E7E", cursor: "pointer" }}>View at all centers →</button>
                                </div>
                                {typeSessions.map(s => <SessionRow key={s.id} session={s} onSignUp={onSignUp} onCenterClick={() => { }} showCenter={false} />)}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    return (
        <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "#FAF9F6", overflow: "auto" }}>
            <div style={{ maxWidth: 900, margin: "0 auto", padding: "100px 24px" }}>
                <button onClick={onClose} style={{ border: "none", background: "none", cursor: "pointer", marginBottom: 32, fontSize: 32 }}>←</button>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 48, marginBottom: 16, color: "#3D4F40", textAlign: "center" }}>Find a Sanctuary</h2>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#5F6F62", textAlign: "center", marginBottom: 32 }}>Choose a location to find your nearest center and browse their schedule.</p>
                <div style={{ maxWidth: 440, margin: "0 auto 32px", position: "relative" }}>
                    <input type="text" placeholder="Search by city, state, or country..." value={searchQ} onChange={e => setSearchQ(e.target.value)}
                        style={{ width: "100%", padding: "13px 20px 13px 40px", borderRadius: 14, border: "1px solid rgba(122,158,126,0.15)", background: "#FFF", fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#3D4F40", outline: "none" }} />
                    <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16, opacity: 0.4 }}>🔍</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 18 }}>
                    {(() => {
                        let filtered = CENTERS;
                        if (searchQ.trim()) {
                            const q = searchQ.toLowerCase();
                            filtered = CENTERS.filter(c => {
                                const loc = LOCATIONS.find(l => l.id === c.locationId);
                                return c.name.toLowerCase().includes(q) || loc.name.toLowerCase().includes(q) || loc.state.toLowerCase().includes(q) || c.address.toLowerCase().includes(q);
                            });
                        }
                        if (filtered.length === 0) return <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "40px 0", fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#8FA894" }}>No centers found matching "{searchQ}".</div>;
                        return filtered.map(c => {
                            const loc = LOCATIONS.find(l => l.id === c.locationId);
                            const sessionCount = SESSIONS.filter(s => s.centerId === c.id).length;
                            const practiceTypes = [...new Set(SESSIONS.filter(s => s.centerId === c.id).map(s => s.type))];
                            return (
                                <div key={c.id} onClick={() => setSelCenter(c.id)} style={{ background: "#FFF", borderRadius: 20, padding: 28, cursor: "pointer", border: "1px solid rgba(122,158,126,0.08)", transition: "all 0.35s" }}
                                    onMouseOver={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(122,158,126,0.1)"; }}
                                    onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 14 }}>
                                        <span style={{ fontSize: 10, padding: "4px 12px", borderRadius: 12, background: loc.id === "online" ? "rgba(139,155,164,0.1)" : "rgba(122,158,126,0.1)", color: loc.id === "online" ? "#8B9BA4" : "#7A9E7E", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, textTransform: "uppercase" }}>{loc.id === "online" ? "🌐 Virtual" : `📍 ${loc.name}`}</span>
                                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: "#7A9E7E" }}>→</span>
                                    </div>
                                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: "#3D4F40", marginBottom: 6 }}>{c.name}</h3>
                                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#8FA894", marginBottom: 4 }}>{c.address}</p>
                                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#5F6F62", lineHeight: 1.6, marginBottom: 16 }}>{c.desc}</p>
                                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
                                        {practiceTypes.map(t => {
                                            const pr = PRACTICES.find(p => p.id === t);
                                            return <span key={t} style={{ fontSize: 9, padding: "3px 10px", borderRadius: 10, background: `${pr.color}10`, color: pr.color, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, textTransform: "uppercase" }}>{pr.icon} {pr.title}</span>;
                                        })}
                                    </div>
                                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#7A9E7E", fontWeight: 600 }}>{sessionCount} sessions available</div>
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
        <div style={{ position: "fixed", inset: 0, zIndex: 300, background: "rgba(61,79,64,0.3)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={onClose}>
            <div onClick={e => e.stopPropagation()} style={{ background: "#FFF", padding: 40, borderRadius: 32, width: 440, textAlign: "center", boxShadow: "0 20px 60px rgba(0,0,0,0.1)" }}>
                <button onClick={onClose} style={{ position: "absolute", top: 14, right: 14, width: 30, height: 30, borderRadius: "50%", background: "rgba(122,158,126,0.08)", border: "none", cursor: "pointer", fontSize: 16, color: "#7A9E7E" }}>×</button>
                {step === 1 ? (
                    <>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, justifyContent: "center" }}>
                            <div style={{ width: 40, height: 40, borderRadius: 10, background: `${practice.color}12`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{practice.icon}</div>
                            <div style={{ textAlign: "left" }}>
                                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 19, fontWeight: 600, color: "#3D4F40" }}>{session.title}</div>
                                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#8FA894" }}>{center.name}</div>
                            </div>
                        </div>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#5F6F62", marginBottom: 24 }}>📅 {session.day} • 🕐 {session.time} • ⏱ {session.duration}</div>
                        <input placeholder="Your Name *" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={{ width: "100%", padding: "12px", border: "1px solid #EEE", borderRadius: 12, marginBottom: 12, outline: "none", fontFamily: "'DM Sans', sans-serif" }} />
                        <input placeholder="Email *" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={{ width: "100%", padding: "12px", border: "1px solid #EEE", borderRadius: 12, marginBottom: 12, outline: "none", fontFamily: "'DM Sans', sans-serif" }} />
                        <input placeholder="Phone (optional)" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} style={{ width: "100%", padding: "12px", border: "1px solid #EEE", borderRadius: 12, marginBottom: 12, outline: "none", fontFamily: "'DM Sans', sans-serif" }} />
                        <select value={form.experience} onChange={e => setForm({ ...form, experience: e.target.value })} style={{ width: "100%", padding: "12px", border: "1px solid #EEE", borderRadius: 12, marginBottom: 12, outline: "none", fontFamily: "'DM Sans', sans-serif", cursor: "pointer" }}>
                            <option value="">Experience Level</option>
                            <option>Complete Beginner</option>
                            <option>Some Experience</option>
                            <option>Regular Practitioner</option>
                            <option>Advanced</option>
                        </select>
                        <textarea placeholder="Any questions?" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} rows={2} style={{ width: "100%", padding: "12px", border: "1px solid #EEE", borderRadius: 12, marginBottom: 20, outline: "none", fontFamily: "'DM Sans', sans-serif", resize: "none" }} />
                        <button onClick={() => { if (form.name && form.email) setStep(2); }} style={{ width: "100%", background: (form.name && form.email) ? "#7A9E7E" : "#D4C5B0", border: "none", borderRadius: 12, padding: 15, cursor: (form.name && form.email) ? "pointer" : "not-allowed", fontFamily: "'DM Sans', sans-serif", fontSize: 13, letterSpacing: 2, textTransform: "uppercase", color: "#FFF", fontWeight: 600 }}>Complete Registration</button>
                    </>
                ) : (
                    <>
                        <div style={{ fontSize: 40, marginBottom: 16 }}>🌿</div>
                        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, marginBottom: 8 }}>Namaste, {form.name}!</h3>
                        <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#666", marginBottom: 24 }}>You're registered for <strong>{session.title}</strong>.<br />Confirmation sent to <strong>{form.email}</strong>.</p>
                        <button onClick={onClose} style={{ padding: "12px 32px", border: "none", background: "#3D4F40", color: "#FFF", borderRadius: 24, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Done</button>
                    </>
                )}
            </div>
        </div>
    );
};

// ─── MAIN COMPONENT ───
export default function SereneGarden() {
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
        <div style={{ background: "#FAF9F6", minHeight: "200vh", position: "relative", overflow: "hidden" }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;1,400&family=DM+Sans:wght@400;500;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: #D4B483; color: #FFF; }
      `}</style>

            <IslandNav setOverlay={openCourses} scrollTo={scrollTo} />

            {/* Background Elements */}
            <Blob color="#7A9E7E" size={600} top={-200} left={-200} speed={0.1} />
            <Blob color="#D4B483" size={400} top={400} left="60%" speed={0.05} />

            <div id="home" style={{ maxWidth: 1000, margin: "0 auto", padding: "180px 24px 100px", position: "relative", zIndex: 1 }}>
                <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(60px, 8vw, 110px)", textAlign: "center", color: "#3D4F40", lineHeight: 0.9, marginBottom: 120 }}>
                    Let nature <br /><i style={{ fontWeight: 400, color: "#7A9E7E" }}>restore</i> you.
                </h1>

                {/* Masonry Layout */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 40, alignItems: "start" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
                        {PRACTICES.slice(0, 2).map((p, i) => (
                            <div key={p.id} onClick={() => openCourses(p.id)} style={{ marginTop: 0, height: i === 0 ? 300 : 420, background: "#FFF", borderRadius: 32, padding: 32, boxShadow: "0 20px 40px rgba(122, 158, 126, 0.08)", border: "1px solid rgba(255,255,255,0.6)", display: "flex", flexDirection: "column", justifyContent: "flex-end", transition: "transform 0.3s", cursor: "pointer" }}
                                onMouseOver={e => e.currentTarget.style.transform = "translateY(-8px)"}
                                onMouseOut={e => e.currentTarget.style.transform = "translateY(0)"}>
                                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, color: "#3D4F40" }}>{p.title}</div>
                                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#8FA894", marginTop: 8 }}>{p.tagline}</div>
                            </div>
                        ))}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
                        <div style={{ height: 80 }}></div>
                        {PRACTICES.slice(2, 4).map((p, i) => (
                            <div key={p.id} onClick={() => openCourses(p.id)} style={{ marginTop: 0, height: i === 0 ? 360 : 280, background: "#FFF", borderRadius: 32, padding: 32, boxShadow: "0 20px 40px rgba(122, 158, 126, 0.08)", border: "1px solid rgba(255,255,255,0.6)", display: "flex", flexDirection: "column", justifyContent: "flex-end", transition: "transform 0.3s", cursor: "pointer" }}
                                onMouseOver={e => e.currentTarget.style.transform = "translateY(-8px)"}
                                onMouseOut={e => e.currentTarget.style.transform = "translateY(0)"}>
                                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, color: "#3D4F40" }}>{p.title}</div>
                                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#8FA894", marginTop: 8 }}>{p.tagline}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {overlay === 'courses' && <ExploreCoursesOverlay onClose={() => { setOverlay(null); setCourseInitial(null); }} onCenterClick={handleCenterClickFromCourses} onSignUp={setRegSession} initialPractice={courseInitial} />}
            {overlay === 'centers' && <FindCenterOverlay onClose={() => { setOverlay(null); setCenterInitial(null); }} onCourseClick={handleCourseClickFromCenters} onSignUp={setRegSession} initialCenter={centerInitial} />}
            {regSession && <RegistrationModal session={regSession} onClose={() => setRegSession(null)} />}
        </div>
    );
}