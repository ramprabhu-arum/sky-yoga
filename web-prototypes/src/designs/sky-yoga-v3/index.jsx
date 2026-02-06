import { useState, useEffect, useRef } from "react";

// ─── DATA MODEL ───
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
  { id: "c9", locationId: "chicago", name: "SKY Chicago Naperville", address: "123 Washington St, Naperville, IL 60540", phone: "+1 (630) 555-0901", desc: "Chicagoland's premier SKY meditation center in the western suburbs." },
  { id: "c10", locationId: "chicago", name: "SKY Chicago Schaumburg", address: "456 Golf Rd, Schaumburg, IL 60173", phone: "+1 (847) 555-1001", desc: "Serving the northwest Chicago suburbs with weekly programs." },
  { id: "c11", locationId: "newyork", name: "SKY Queens Flushing", address: "789 Main St, Flushing, NY 11354", phone: "+1 (718) 555-1101", desc: "New York City's SKY center in the heart of Queens." },
  { id: "c12", locationId: "newjersey", name: "SKY Edison Center", address: "321 Oak Tree Rd, Edison, NJ 08820", phone: "+1 (732) 555-1201", desc: "Central New Jersey's dedicated SKY meditation and yoga center." },
  { id: "c13", locationId: "sanjose", name: "SKY San Jose Milpitas", address: "654 Great Mall Pkwy, Milpitas, CA 95035", phone: "+1 (408) 555-1301", desc: "Silicon Valley's SKY center serving the South Bay community." },
  { id: "c14", locationId: "fremont", name: "SKY Fremont Center", address: "987 Fremont Blvd, Fremont, CA 94536", phone: "+1 (510) 555-1401", desc: "East Bay's home for SKY practices and meditation." },
  { id: "c15", locationId: "atlanta", name: "SKY Atlanta Alpharetta", address: "123 Old Milton Pkwy, Alpharetta, GA 30009", phone: "+1 (770) 555-1501", desc: "Atlanta metro's SKY center in north Fulton county." },
  { id: "c16", locationId: "detroit", name: "SKY Detroit Troy", address: "456 Big Beaver Rd, Troy, MI 48083", phone: "+1 (248) 555-1601", desc: "Metro Detroit's SKY community serving southeast Michigan." },
  { id: "c17", locationId: "toronto", name: "SKY Toronto Scarborough", address: "789 Markham Rd, Scarborough, ON M1H 2Y5", phone: "+1 (416) 555-1701", desc: "Toronto's established SKY meditation center in Scarborough." },
  { id: "c18", locationId: "mississauga", name: "SKY Mississauga", address: "321 Dundas St E, Mississauga, ON L5A 1W8", phone: "+1 (905) 555-1801", desc: "Serving the Peel Region with regular SKY programs." },
  { id: "c19", locationId: "vancouver", name: "SKY Vancouver Surrey", address: "654 King George Blvd, Surrey, BC V3T 2V1", phone: "+1 (604) 555-1901", desc: "Western Canada's SKY center serving Greater Vancouver." },
  { id: "c20", locationId: "online", name: "SKY Virtual Studio", address: "Zoom / Google Meet", phone: null, desc: "Join from anywhere in the world. Full SKY experience delivered virtually with live instruction." },
];

const SESSIONS = [
  { id: "s1", centerId: "c1", title: "Weekly SKY Meditation", type: "meditation", mode: "in-person", day: "Saturday", time: "9:00 AM", duration: "90 min", instructor: "Dr. Lakshmi Narayanan", level: "All Levels", spotsTotal: 40, spotsTaken: 28, recurring: true },
  { id: "s2", centerId: "c1", title: "Kayakalpa Yoga Workshop", type: "kayakalpa", mode: "in-person", day: "Feb 15, 2026", time: "10:00 AM", duration: "3 hrs", instructor: "Prof. Sundar", level: "Beginner", spotsTotal: 30, spotsTaken: 12, recurring: false },
  { id: "s3", centerId: "c1", title: "Introspection Level I", type: "introspection", mode: "in-person", day: "Mar 8–9, 2026", time: "9:00 AM", duration: "Full Day", instructor: "Prof. Meena", level: "Beginner", spotsTotal: 25, spotsTaken: 18, recurring: false },
  { id: "s4", centerId: "c1", title: "Simplified Physical Exercise", type: "exercise", mode: "in-person", day: "Wednesday", time: "7:00 AM", duration: "45 min", instructor: "Prof. Ravi", level: "All Levels", spotsTotal: 40, spotsTaken: 15, recurring: true },
  { id: "s5", centerId: "c2", title: "Evening Meditation Circle", type: "meditation", mode: "in-person", day: "Thursday", time: "7:00 PM", duration: "60 min", instructor: "Prof. Arun", level: "All Levels", spotsTotal: 30, spotsTaken: 22, recurring: true },
  { id: "s6", centerId: "c2", title: "Monthly Silence Program", type: "meditation", mode: "in-person", day: "1st Sunday", time: "8:00 AM", duration: "4 hrs", instructor: "Multiple", level: "Intermediate", spotsTotal: 30, spotsTaken: 25, recurring: true },
  { id: "s7", centerId: "c2", title: "Kayakalpa Basics", type: "kayakalpa", mode: "in-person", day: "Saturday", time: "11:00 AM", duration: "60 min", instructor: "Prof. Arun", level: "Beginner", spotsTotal: 20, spotsTaken: 8, recurring: true },
  { id: "s8", centerId: "c3", title: "Weekend SKY Yoga", type: "meditation", mode: "in-person", day: "Sunday", time: "8:30 AM", duration: "90 min", instructor: "Prof. Priya", level: "All Levels", spotsTotal: 25, spotsTaken: 10, recurring: true },
  { id: "s9", centerId: "c3", title: "Kids Yoga & Meditation", type: "exercise", mode: "in-person", day: "Saturday", time: "11:00 AM", duration: "45 min", instructor: "Prof. Divya", level: "Kids (8–14)", spotsTotal: 20, spotsTaken: 8, recurring: true },
  { id: "s10", centerId: "c4", title: "Beginners Meditation", type: "meditation", mode: "in-person", day: "Tuesday", time: "6:30 PM", duration: "60 min", instructor: "Prof. Karthik", level: "Beginner", spotsTotal: 20, spotsTaken: 6, recurring: true },
  { id: "s11", centerId: "c4", title: "Introspection Level II", type: "introspection", mode: "in-person", day: "Mar 22–23, 2026", time: "9:00 AM", duration: "Full Day", instructor: "Prof. Meena", level: "Intermediate", spotsTotal: 15, spotsTaken: 4, recurring: false },
  { id: "s12", centerId: "c20", title: "Online SKY Meditation", type: "meditation", mode: "online", day: "Saturday", time: "9:00 AM CST", duration: "60 min", instructor: "Dr. Lakshmi Narayanan", level: "All Levels", spotsTotal: 200, spotsTaken: 85, recurring: true },
  { id: "s13", centerId: "c20", title: "Virtual Kayakalpa Intro", type: "kayakalpa", mode: "online", day: "Feb 22, 2026", time: "10:00 AM CST", duration: "2 hrs", instructor: "Prof. Sundar", level: "Beginner", spotsTotal: 100, spotsTaken: 34, recurring: false },
  { id: "s14", centerId: "c20", title: "Monthly Satsang", type: "meditation", mode: "online", day: "Last Saturday", time: "10:00 AM CST", duration: "2 hrs", instructor: "Multiple", level: "All Levels", spotsTotal: 200, spotsTaken: 120, recurring: true },
  { id: "s15", centerId: "c20", title: "Online Physical Exercise", type: "exercise", mode: "online", day: "Monday & Friday", time: "6:30 AM CST", duration: "30 min", instructor: "Prof. Ravi", level: "All Levels", spotsTotal: 100, spotsTaken: 42, recurring: true },
  { id: "s16", centerId: "c5", title: "Weekly SKY Meditation", type: "meditation", mode: "in-person", day: "Saturday", time: "10:00 AM", duration: "90 min", instructor: "Prof. Anand", level: "All Levels", spotsTotal: 35, spotsTaken: 18, recurring: true },
  { id: "s17", centerId: "c6", title: "Evening Meditation", type: "meditation", mode: "in-person", day: "Wednesday", time: "7:00 PM", duration: "60 min", instructor: "Prof. Kavitha", level: "All Levels", spotsTotal: 25, spotsTaken: 12, recurring: true },
  { id: "s18", centerId: "c7", title: "SKY Meditation Austin", type: "meditation", mode: "in-person", day: "Sunday", time: "9:00 AM", duration: "90 min", instructor: "Prof. Deepa", level: "All Levels", spotsTotal: 30, spotsTaken: 14, recurring: true },
  { id: "s19", centerId: "c8", title: "Kayakalpa Basics", type: "kayakalpa", mode: "in-person", day: "Saturday", time: "10:30 AM", duration: "60 min", instructor: "Prof. Kumar", level: "Beginner", spotsTotal: 20, spotsTaken: 7, recurring: true },
  { id: "s20", centerId: "c9", title: "Weekly Meditation", type: "meditation", mode: "in-person", day: "Saturday", time: "9:30 AM", duration: "90 min", instructor: "Prof. Venkat", level: "All Levels", spotsTotal: 40, spotsTaken: 24, recurring: true },
  { id: "s21", centerId: "c10", title: "Physical Exercise Class", type: "exercise", mode: "in-person", day: "Tuesday", time: "6:30 PM", duration: "45 min", instructor: "Prof. Meera", level: "All Levels", spotsTotal: 25, spotsTaken: 10, recurring: true },
  { id: "s22", centerId: "c11", title: "SKY Meditation NYC", type: "meditation", mode: "in-person", day: "Sunday", time: "10:00 AM", duration: "90 min", instructor: "Prof. Shankar", level: "All Levels", spotsTotal: 30, spotsTaken: 20, recurring: true },
  { id: "s23", centerId: "c12", title: "Weekend Meditation", type: "meditation", mode: "in-person", day: "Saturday", time: "9:00 AM", duration: "90 min", instructor: "Prof. Geetha", level: "All Levels", spotsTotal: 35, spotsTaken: 22, recurring: true },
  { id: "s24", centerId: "c13", title: "Kayakalpa Workshop", type: "kayakalpa", mode: "in-person", day: "Mar 1, 2026", time: "10:00 AM", duration: "3 hrs", instructor: "Prof. Sundar", level: "Beginner", spotsTotal: 30, spotsTaken: 11, recurring: false },
  { id: "s25", centerId: "c13", title: "SKY Meditation Bay Area", type: "meditation", mode: "in-person", day: "Saturday", time: "9:30 AM", duration: "90 min", instructor: "Prof. Ramesh", level: "All Levels", spotsTotal: 35, spotsTaken: 20, recurring: true },
  { id: "s26", centerId: "c14", title: "Evening Meditation", type: "meditation", mode: "in-person", day: "Thursday", time: "7:00 PM", duration: "60 min", instructor: "Prof. Lakshmi", level: "All Levels", spotsTotal: 25, spotsTaken: 10, recurring: true },
  { id: "s27", centerId: "c15", title: "Weekend SKY Yoga", type: "meditation", mode: "in-person", day: "Sunday", time: "9:00 AM", duration: "90 min", instructor: "Prof. Sridhar", level: "All Levels", spotsTotal: 30, spotsTaken: 15, recurring: true },
  { id: "s28", centerId: "c15", title: "Introspection Workshop", type: "introspection", mode: "in-person", day: "Mar 15, 2026", time: "9:00 AM", duration: "Full Day", instructor: "Prof. Meena", level: "Beginner", spotsTotal: 20, spotsTaken: 6, recurring: false },
  { id: "s29", centerId: "c16", title: "SKY Meditation Detroit", type: "meditation", mode: "in-person", day: "Saturday", time: "10:00 AM", duration: "90 min", instructor: "Prof. Bala", level: "All Levels", spotsTotal: 25, spotsTaken: 12, recurring: true },
  { id: "s30", centerId: "c17", title: "SKY Meditation Toronto", type: "meditation", mode: "in-person", day: "Saturday", time: "10:00 AM", duration: "90 min", instructor: "Prof. Ganesh", level: "All Levels", spotsTotal: 40, spotsTaken: 28, recurring: true },
  { id: "s31", centerId: "c17", title: "Kayakalpa Yoga", type: "kayakalpa", mode: "in-person", day: "Sunday", time: "11:00 AM", duration: "60 min", instructor: "Prof. Prema", level: "Beginner", spotsTotal: 25, spotsTaken: 14, recurring: true },
  { id: "s32", centerId: "c18", title: "Weekend Meditation", type: "meditation", mode: "in-person", day: "Sunday", time: "9:30 AM", duration: "90 min", instructor: "Prof. Selvi", level: "All Levels", spotsTotal: 30, spotsTaken: 16, recurring: true },
  { id: "s33", centerId: "c19", title: "SKY Meditation Vancouver", type: "meditation", mode: "in-person", day: "Saturday", time: "10:00 AM", duration: "90 min", instructor: "Prof. Hari", level: "All Levels", spotsTotal: 30, spotsTaken: 12, recurring: true },
  { id: "s34", centerId: "c19", title: "Physical Exercise", type: "exercise", mode: "in-person", day: "Wednesday", time: "7:00 AM", duration: "45 min", instructor: "Prof. Hari", level: "All Levels", spotsTotal: 20, spotsTaken: 8, recurring: true },
];

const PRACTICES = [
  { id: "meditation", icon: "🪷", title: "SKY Meditation", tagline: "Commune your consciousness with the universe", desc: "Powerful meditation on the life force that brings a quantum leap in the strength of your mind. Multiple progressive levels from beginner to advanced, each deepening your connection to the Divine.", color: "#C4956A", benefits: ["Stress reduction", "Mental clarity", "Emotional balance", "Spiritual growth"] },
  { id: "exercise", icon: "🌿", title: "Physical Exercise", tagline: "9 exercises for total body harmony", desc: "Simple exercises designed to regulate the flow of blood, heat, air, and energy throughout the body. Takes only 15 minutes and is suitable for ages 8 to 80+.", color: "#8B9A6F", benefits: ["Improved flexibility", "Blood circulation", "Energy regulation", "Joint health"] },
  { id: "kayakalpa", icon: "☀️", title: "Kayakalpa Yoga", tagline: "The ancient science of rejuvenation", desc: "An anti-aging practice of the Siddhas of South India for enhancing life energy, preventing disease, and restructuring the body naturally. Strengthens the Life Energy.", color: "#9A7FB5", benefits: ["Anti-aging", "Disease prevention", "Enhanced vitality", "Life energy boost"] },
  { id: "introspection", icon: "🕊️", title: "Introspection", tagline: "Transform your mind from within", desc: "Self-help practices to sublimate negative emotions — greed, anger, vengeance, worries — and cultivate stronger character traits through guided self-inquiry. Three progressive levels.", color: "#6F8B9A", benefits: ["Emotional mastery", "Character building", "Self-awareness", "Inner peace"] },
];

// ─── HOOKS ───
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
    }}>{children}</div>
  );
}

// ─── REUSABLE ───
const Tag = ({ children }) => <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#C4956A", marginBottom: 14 }}>{children}</div>;
const Title = ({ children, dark }) => <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(28px,4vw,46px)", fontWeight: 300, color: dark ? "#FAF7F0" : "#3D3225", lineHeight: 1.2 }}>{children}</h2>;
const I = ({ children }) => <span style={{ fontStyle: "italic", fontWeight: 500, color: "#8B6F4E" }}>{children}</span>;

function CapacityBar({ taken, total, color }) {
  const pct = (taken / total) * 100;
  const left = total - taken;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ width: 100, height: 4, background: "rgba(196,149,106,0.1)", borderRadius: 2, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: pct > 85 ? "#D4766A" : color, borderRadius: 2, transition: "width 0.5s" }} />
      </div>
      <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: left < 5 ? "#D4766A" : "#A0907C", fontWeight: left < 5 ? 600 : 400 }}>
        {left} spot{left !== 1 ? "s" : ""} left
      </span>
    </div>
  );
}

function SessionRow({ session, onSignUp, onCenterClick, onCourseClick, showCenter = true, showType = true }) {
  const center = CENTERS.find(c => c.id === session.centerId);
  const practice = PRACTICES.find(p => p.id === session.type);
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "1fr auto", gap: 16, alignItems: "center",
      background: "#F7F2EA", borderRadius: 14, padding: "16px 22px",
      border: "1px solid rgba(196,149,106,0.06)", transition: "all 0.25s",
    }}
      onMouseOver={e => e.currentTarget.style.background = "#F2EBDF"}
      onMouseOut={e => e.currentTarget.style.background = "#F7F2EA"}
    >
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 6 }}>
          {showType && (
            <span onClick={() => onCourseClick?.(session.type)} style={{
              fontSize: 10, padding: "3px 10px", borderRadius: 10, cursor: "pointer",
              background: `${practice.color}14`, color: practice.color,
              fontFamily: "'DM Sans',sans-serif", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5,
            }}>{practice.icon} {practice.title}</span>
          )}
          <span style={{
            fontSize: 9, padding: "3px 8px", borderRadius: 8,
            background: session.mode === "online" ? "rgba(111,139,154,0.1)" : "rgba(139,154,111,0.1)",
            color: session.mode === "online" ? "#6F8B9A" : "#8B9A6F",
            fontFamily: "'DM Sans',sans-serif", fontWeight: 600, textTransform: "uppercase",
          }}>{session.mode}</span>
          {session.recurring && <span style={{ fontSize: 9, padding: "3px 8px", borderRadius: 8, background: "rgba(196,149,106,0.06)", color: "#C4956A", fontFamily: "'DM Sans',sans-serif" }}>Weekly</span>}
          {!session.recurring && <span style={{ fontSize: 9, padding: "3px 8px", borderRadius: 8, background: "rgba(212,118,106,0.08)", color: "#D4766A", fontFamily: "'DM Sans',sans-serif", fontWeight: 600 }}>Special</span>}
        </div>
        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 18, fontWeight: 600, color: "#3D3225", marginBottom: 4 }}>{session.title}</div>
        <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "#A0907C", display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 6 }}>
          {showCenter && <span onClick={() => onCenterClick?.(session.centerId)} style={{ cursor: "pointer", textDecoration: "underline", textDecorationColor: "rgba(196,149,106,0.3)", textUnderlineOffset: 2 }}>📍 {center.name}</span>}
          <span>📅 {session.day}</span>
          <span>🕐 {session.time} · {session.duration}</span>
          <span>👤 {session.instructor}</span>
          <span>📊 {session.level}</span>
        </div>
        <CapacityBar taken={session.spotsTaken} total={session.spotsTotal} color={practice.color} />
      </div>
      <button onClick={() => onSignUp(session)} style={{
        background: "linear-gradient(135deg, #C4956A, #A07850)", border: "none",
        borderRadius: 11, padding: "10px 22px", cursor: "pointer",
        fontFamily: "'DM Sans',sans-serif", fontSize: 11, letterSpacing: 1,
        textTransform: "uppercase", color: "#FAF7F0", fontWeight: 600,
        transition: "all 0.2s", whiteSpace: "nowrap", alignSelf: "center",
      }}
        onMouseOver={e => e.target.style.opacity = "0.88"}
        onMouseOut={e => e.target.style.opacity = "1"}
      >Sign Up</button>
    </div>
  );
}

// ─── REGISTRATION MODAL ───
function RegistrationModal({ session, onClose }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", email: "", phone: "", experience: "", notes: "" });
  const center = CENTERS.find(c => c.id === session.centerId);
  const practice = PRACTICES.find(p => p.id === session.type);

  const inputStyle = {
    width: "100%", boxSizing: "border-box", padding: "12px 16px",
    background: "#F3EDE2", border: "1px solid rgba(196,149,106,0.12)",
    borderRadius: 10, fontFamily: "'DM Sans',sans-serif", fontSize: 14,
    color: "#3D3225", outline: "none", transition: "border-color 0.2s",
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 300,
      background: "rgba(61,50,37,0.45)", backdropFilter: "blur(8px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#FAF7F0", borderRadius: 22, maxWidth: 480, width: "100%",
        maxHeight: "90vh", overflow: "auto", position: "relative",
      }}>
        <button onClick={onClose} style={{
          position: "absolute", top: 14, right: 14, width: 30, height: 30, borderRadius: "50%",
          background: "rgba(196,149,106,0.08)", border: "none", cursor: "pointer",
          fontSize: 16, color: "#7A6B5A", display: "flex", alignItems: "center", justifyContent: "center",
        }}>×</button>

        <div style={{ padding: "28px 28px 0", borderBottom: "1px solid rgba(196,149,106,0.08)", paddingBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: `${practice.color}12`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{practice.icon}</div>
            <div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 19, fontWeight: 600, color: "#3D3225" }}>{session.title}</div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "#A0907C" }}>{center.name}</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "#7A6B5A" }}>
            <span>📅 {session.day}</span><span>🕐 {session.time}</span><span>⏱ {session.duration}</span>
            <span style={{ padding: "2px 8px", borderRadius: 8, background: session.mode === "online" ? "rgba(111,139,154,0.1)" : "rgba(139,154,111,0.1)", color: session.mode === "online" ? "#6F8B9A" : "#8B9A6F", fontWeight: 600, textTransform: "uppercase", fontSize: 10 }}>{session.mode}</span>
          </div>
        </div>

        <div style={{ padding: 28 }}>
          {step === 1 ? (
            <>
              {[
                { key: "name", label: "Full Name", type: "text", req: true },
                { key: "email", label: "Email Address", type: "email", req: true },
                { key: "phone", label: "Phone (optional)", type: "tel", req: false },
              ].map(f => (
                <div key={f.key} style={{ marginBottom: 14 }}>
                  <label style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: "#A0907C", display: "block", marginBottom: 5 }}>
                    {f.label} {f.req && <span style={{ color: "#D4766A" }}>*</span>}
                  </label>
                  <input type={f.type} value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                    style={inputStyle} onFocus={e => e.target.style.borderColor = "rgba(196,149,106,0.4)"} onBlur={e => e.target.style.borderColor = "rgba(196,149,106,0.12)"} />
                </div>
              ))}
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: "#A0907C", display: "block", marginBottom: 5 }}>Experience Level</label>
                <select value={form.experience} onChange={e => setForm({ ...form, experience: e.target.value })} style={{ ...inputStyle, cursor: "pointer" }}>
                  <option value="">Select...</option>
                  <option>Complete Beginner</option><option>Some Experience</option><option>Regular Practitioner</option><option>Advanced</option>
                </select>
              </div>
              <textarea placeholder="Any questions?" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} rows={2}
                style={{ ...inputStyle, resize: "none", marginBottom: 20 }} />
              <button onClick={() => { if (form.name && form.email) setStep(2); }} style={{
                width: "100%", background: (form.name && form.email) ? "linear-gradient(135deg, #C4956A, #A07850)" : "#D4C5B0",
                border: "none", borderRadius: 11, padding: 15, cursor: (form.name && form.email) ? "pointer" : "not-allowed",
                fontFamily: "'DM Sans',sans-serif", fontSize: 13, letterSpacing: 2, textTransform: "uppercase", color: "#FAF7F0", fontWeight: 600,
              }}>Complete Registration</button>
            </>
          ) : (
            <div style={{ textAlign: "center", padding: "16px 0" }}>
              <div style={{ fontSize: 44, marginBottom: 14 }}>🙏</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 24, color: "#3D3225", marginBottom: 6 }}>Namaste, {form.name}!</h3>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "#7A6B5A", lineHeight: 1.7, marginBottom: 4 }}>
                You're registered for <strong>{session.title}</strong>.
              </p>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "#A0907C", marginBottom: 20 }}>
                Confirmation sent to <strong>{form.email}</strong>.
                {session.mode === "online" && " Meeting link arrives 24 hours before."}
              </p>
              <button onClick={onClose} style={{
                background: "linear-gradient(135deg, #C4956A, #A07850)", border: "none", borderRadius: 11, padding: "11px 28px",
                fontFamily: "'DM Sans',sans-serif", fontSize: 12, letterSpacing: 1, textTransform: "uppercase", color: "#FAF7F0", fontWeight: 600, cursor: "pointer",
              }}>Done</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── OVERLAY SHELL ───
function Overlay({ open, onClose, children }) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  if (!open) return null;
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 200,
      background: "rgba(250,247,240,0.98)", backdropFilter: "blur(4px)",
      overflow: "auto",
    }}>
      {/* Top bar */}
      <div style={{
        position: "sticky", top: 0, zIndex: 10,
        background: "rgba(250,247,240,0.95)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(196,149,106,0.1)",
        padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <button onClick={onClose} style={{
          background: "none", border: "none", cursor: "pointer",
          fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "#8B6F4E",
          display: "flex", alignItems: "center", gap: 6,
        }}>
          <span style={{ fontSize: 18 }}>←</span> Back to Home
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg, #C4956A, #8B6F4E)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cormorant Garamond',serif", fontSize: 13, fontWeight: 700, color: "#FAF7F0" }}>S</div>
          <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 15, fontWeight: 600, color: "#3D3225", letterSpacing: 0.5 }}>SKY YOGA</span>
        </div>
      </div>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px 80px" }}>
        {children}
      </div>
    </div>
  );
}

// ─── EXPLORE COURSES PAGE ───
function ExploreCourses({ onClose, onCenterClick, onSignUp }) {
  const [selectedPractice, setSelectedPractice] = useState(null);
  const [locSearch, setLocSearch] = useState("");

  if (selectedPractice) {
    const p = PRACTICES.find(pr => pr.id === selectedPractice);
    const sessions = SESSIONS.filter(s => s.type === selectedPractice);
    const centersWithSessions = [...new Set(sessions.map(s => s.centerId))].map(cid => CENTERS.find(c => c.id === cid));
    
    // Filter centers by location search
    const filteredCenters = locSearch.trim() 
      ? centersWithSessions.filter(c => {
          const loc = LOCATIONS.find(l => l.id === c.locationId);
          const q = locSearch.toLowerCase();
          return c.name.toLowerCase().includes(q) || loc.name.toLowerCase().includes(q) || loc.state.toLowerCase().includes(q) || (loc.country || "").toLowerCase().includes(q) || c.address.toLowerCase().includes(q);
        })
      : centersWithSessions;

    return (
      <>
        {/* Breadcrumb */}
        <button onClick={() => setSelectedPractice(null)} style={{
          background: "none", border: "none", cursor: "pointer", marginBottom: 28,
          fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "#8B6F4E", display: "flex", alignItems: "center", gap: 6,
        }}><span>←</span> All Practices</button>

        {/* Practice Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: `${p.color}12`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>{p.icon}</div>
          <div>
            <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 36, fontWeight: 400, color: "#3D3225", lineHeight: 1.1 }}>{p.title}</h1>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "#A0907C", marginTop: 2 }}>{p.tagline}</div>
          </div>
        </div>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, lineHeight: 1.8, color: "#7A6B5A", maxWidth: 700, marginBottom: 16 }}>{p.desc}</p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 40 }}>
          {p.benefits.map(b => (
            <span key={b} style={{ padding: "6px 14px", borderRadius: 20, background: `${p.color}0C`, border: `1px solid ${p.color}20`, fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: p.color, fontWeight: 500 }}>✓ {b}</span>
          ))}
        </div>

        {/* Available at these centers */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: "#A0907C" }}>
            Available at {centersWithSessions.length} center{centersWithSessions.length !== 1 ? "s" : ""}
          </div>
          <input 
            type="text" placeholder="Search by city, state, or center name..." value={locSearch}
            onChange={e => setLocSearch(e.target.value)}
            style={{
              padding: "9px 16px", borderRadius: 10, border: "1px solid rgba(196,149,106,0.15)",
              background: "#F7F2EA", fontFamily: "'DM Sans',sans-serif", fontSize: 13,
              color: "#3D3225", outline: "none", width: 280, maxWidth: "100%",
              transition: "border-color 0.2s",
            }}
            onFocus={e => e.target.style.borderColor = "rgba(196,149,106,0.4)"}
            onBlur={e => e.target.style.borderColor = "rgba(196,149,106,0.15)"}
          />
        </div>

        {filteredCenters.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px 0", fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "#A0907C" }}>
            No centers found matching "{locSearch}". Try a different city or state.
          </div>
        )}

        {filteredCenters.map(center => {
          const centerSessions = sessions.filter(s => s.centerId === center.id);
          const loc = LOCATIONS.find(l => l.id === center.locationId);
          return (
            <div key={center.id} style={{ marginBottom: 32 }}>
              {/* Center sub-header with cross-link */}
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap",
                gap: 8, marginBottom: 12, paddingBottom: 10,
                borderBottom: "1px solid rgba(196,149,106,0.08)",
              }}>
                <div>
                  <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 600, color: "#3D3225" }}>
                    {center.name}
                  </span>
                  <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "#A0907C", marginLeft: 10 }}>
                    {loc.id === "online" ? "🌐 Virtual" : `📍 ${loc.name}, ${loc.state}`}
                  </span>
                </div>
                <button onClick={() => onCenterClick(center.id)} style={{
                  background: "none", border: "1px solid rgba(196,149,106,0.2)", borderRadius: 8, padding: "6px 14px",
                  fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "#8B6F4E", cursor: "pointer",
                  letterSpacing: 0.5, transition: "all 0.2s",
                }}
                  onMouseOver={e => { e.target.style.background = "rgba(196,149,106,0.06)"; }}
                  onMouseOut={e => { e.target.style.background = "none"; }}
                >View all sessions at this center →</button>
              </div>
              <div style={{ display: "grid", gap: 10 }}>
                {centerSessions.map(s => (
                  <SessionRow key={s.id} session={s} onSignUp={onSignUp} onCenterClick={onCenterClick} showType={false} />
                ))}
              </div>
            </div>
          );
        })}
      </>
    );
  }

  // Practice selection grid
  return (
    <>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <Tag>Explore Courses</Tag>
        <Title>What would you like to <I>learn</I>?</Title>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, color: "#7A6B5A", marginTop: 10, maxWidth: 480, margin: "10px auto 0" }}>
          Choose a practice to see all available sessions across every center.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20 }}>
        {PRACTICES.map(p => {
          const sessionCount = SESSIONS.filter(s => s.type === p.id).length;
          const centerCount = [...new Set(SESSIONS.filter(s => s.type === p.id).map(s => s.centerId))].length;
          return (
            <div key={p.id} onClick={() => setSelectedPractice(p.id)} style={{
              background: "#F7F2EA", borderRadius: 20, padding: 32, cursor: "pointer",
              border: "1px solid rgba(196,149,106,0.08)", transition: "all 0.35s",
              display: "flex", flexDirection: "column", height: "100%",
            }}
              onMouseOver={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 14px 44px rgba(61,50,37,0.07)"; e.currentTarget.style.borderColor = `${p.color}30`; }}
              onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "rgba(196,149,106,0.08)"; }}
            >
              <div style={{ width: 52, height: 52, borderRadius: 14, background: `${p.color}10`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, marginBottom: 20 }}>{p.icon}</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 600, color: "#3D3225", marginBottom: 6 }}>{p.title}</h3>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "#A0907C", marginBottom: 8, fontStyle: "italic" }}>{p.tagline}</p>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, lineHeight: 1.7, color: "#7A6B5A", flex: 1, marginBottom: 16 }}>{p.desc}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: p.color, fontWeight: 600 }}>
                  {sessionCount} sessions · {centerCount} centers
                </span>
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 18, color: p.color }}>→</span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

// ─── FIND A CENTER PAGE ───
function FindCenter({ onClose, onCourseClick, onSignUp, initialCenter }) {
  const [selLocation, setSelLocation] = useState(null);
  const [selCenter, setSelCenter] = useState(initialCenter || null);
  const [searchQ, setSearchQ] = useState("");

  useEffect(() => { if (initialCenter) setSelCenter(initialCenter); }, [initialCenter]);

  // Center detail view
  if (selCenter) {
    const center = CENTERS.find(c => c.id === selCenter);
    const loc = LOCATIONS.find(l => l.id === center.locationId);
    const centerSessions = SESSIONS.filter(s => s.centerId === center.id);
    const practiceTypes = [...new Set(centerSessions.map(s => s.type))];

    return (
      <>
        <button onClick={() => setSelCenter(null)} style={{
          background: "none", border: "none", cursor: "pointer", marginBottom: 28,
          fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "#8B6F4E", display: "flex", alignItems: "center", gap: 6,
        }}><span>←</span> All Centers</button>

        {/* Center Header */}
        <div style={{
          background: "linear-gradient(135deg, #3D3225, #5C4E3C)", borderRadius: 20, padding: "36px 36px 28px",
          marginBottom: 36, position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: "radial-gradient(circle at 2px 2px, #FAF7F0 1px, transparent 0)", backgroundSize: "24px 24px" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <span style={{ fontSize: 10, padding: "4px 12px", borderRadius: 12, background: loc.id === "online" ? "rgba(111,139,154,0.2)" : "rgba(139,154,111,0.2)", color: loc.id === "online" ? "#8FB0C0" : "#A0B88F", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>
              {loc.id === "online" ? "🌐 Virtual" : `📍 ${loc.name}, ${loc.state}`}
            </span>
            <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(28px, 4vw, 38px)", fontWeight: 400, color: "#FAF7F0", marginTop: 12, marginBottom: 8 }}>{center.name}</h1>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "rgba(250,247,240,0.55)", lineHeight: 1.7, maxWidth: 600 }}>{center.desc}</p>
            <div style={{ display: "flex", gap: 20, marginTop: 16, flexWrap: "wrap" }}>
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "rgba(250,247,240,0.5)" }}>📍 {center.address}</span>
              {center.phone && <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "rgba(250,247,240,0.5)" }}>☎ {center.phone}</span>}
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 18 }}>
              {practiceTypes.map(t => {
                const pr = PRACTICES.find(p => p.id === t);
                return (
                  <span key={t} onClick={() => onCourseClick(t)} style={{
                    fontSize: 10, padding: "5px 14px", borderRadius: 14,
                    background: `${pr.color}22`, color: pr.color, cursor: "pointer",
                    fontFamily: "'DM Sans',sans-serif", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5,
                    transition: "all 0.2s",
                  }}
                    onMouseOver={e => e.target.style.background = `${pr.color}35`}
                    onMouseOut={e => e.target.style.background = `${pr.color}22`}
                  >{pr.icon} {pr.title} →</span>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sessions grouped by practice */}
        {practiceTypes.map(type => {
          const pr = PRACTICES.find(p => p.id === type);
          const typeSessions = centerSessions.filter(s => s.type === type);
          return (
            <div key={type} style={{ marginBottom: 32 }}>
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap",
                gap: 8, marginBottom: 12, paddingBottom: 10,
                borderBottom: "1px solid rgba(196,149,106,0.08)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 20 }}>{pr.icon}</span>
                  <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 600, color: "#3D3225" }}>{pr.title}</span>
                  <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "#A0907C" }}>· {typeSessions.length} session{typeSessions.length !== 1 ? "s" : ""}</span>
                </div>
                <button onClick={() => onCourseClick(type)} style={{
                  background: "none", border: "1px solid rgba(196,149,106,0.2)", borderRadius: 8, padding: "6px 14px",
                  fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "#8B6F4E", cursor: "pointer", letterSpacing: 0.5, transition: "all 0.2s",
                }}
                  onMouseOver={e => e.target.style.background = "rgba(196,149,106,0.06)"}
                  onMouseOut={e => e.target.style.background = "none"}
                >View at all centers →</button>
              </div>
              <div style={{ display: "grid", gap: 10 }}>
                {typeSessions.map(s => (
                  <SessionRow key={s.id} session={s} onSignUp={onSignUp} onCourseClick={onCourseClick} showCenter={false} showType={false} />
                ))}
              </div>
            </div>
          );
        })}
      </>
    );
  }

  // Center selection
  return (
    <>
      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <Tag>Find a Center</Tag>
        <Title>Practice <I>near you</I></Title>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, color: "#7A6B5A", marginTop: 10, maxWidth: 480, margin: "10px auto 0" }}>
          Choose a location to find your nearest center and browse their schedule.
        </p>
      </div>

      {/* Location search */}
      <div style={{ maxWidth: 440, margin: "0 auto 12px", position: "relative" }}>
        <input 
          type="text" placeholder="Search by city, state, or country..." value={searchQ}
          onChange={e => { setSearchQ(e.target.value); setSelLocation(null); }}
          style={{
            width: "100%", boxSizing: "border-box", padding: "13px 20px 13px 40px", borderRadius: 14,
            border: "1px solid rgba(196,149,106,0.15)", background: "#F7F2EA",
            fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "#3D3225", outline: "none",
            transition: "border-color 0.2s",
          }}
          onFocus={e => e.target.style.borderColor = "rgba(196,149,106,0.4)"}
          onBlur={e => e.target.style.borderColor = "rgba(196,149,106,0.15)"}
        />
        <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16, opacity: 0.4 }}>🔍</span>
      </div>

      {/* Quick region pills */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center", marginBottom: 36 }}>
        {["All", "Texas", "California", "Ontario", "Online"].map(region => {
          const isActive = (region === "All" && !selLocation && !searchQ) || selLocation === region;
          return (
            <button key={region} onClick={() => { setSelLocation(isActive ? null : region); setSearchQ(""); }} style={{
              background: isActive ? "#C4956A" : "transparent",
              border: `1.5px solid ${isActive ? "#C4956A" : "rgba(196,149,106,0.2)"}`,
              borderRadius: 20, padding: "6px 16px", cursor: "pointer",
              fontFamily: "'DM Sans',sans-serif", fontSize: 12, letterSpacing: 0.5,
              color: isActive ? "#FAF7F0" : "#7A6B5A", fontWeight: 500, transition: "all 0.3s",
            }}>{region === "Online" ? "🌐 " : ""}{region}</button>
          );
        })}
      </div>

      {/* Center cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 18 }}>
        {(() => {
          let filtered = CENTERS;
          if (searchQ.trim()) {
            const q = searchQ.toLowerCase();
            filtered = CENTERS.filter(c => {
              const loc = LOCATIONS.find(l => l.id === c.locationId);
              return c.name.toLowerCase().includes(q) || loc.name.toLowerCase().includes(q) || loc.state.toLowerCase().includes(q) || (loc.country || "").toLowerCase().includes(q) || c.address.toLowerCase().includes(q);
            });
          } else if (selLocation === "Texas") {
            filtered = CENTERS.filter(c => { const l = LOCATIONS.find(l2 => l2.id === c.locationId); return l.state === "TX"; });
          } else if (selLocation === "California") {
            filtered = CENTERS.filter(c => { const l = LOCATIONS.find(l2 => l2.id === c.locationId); return l.state === "CA"; });
          } else if (selLocation === "Ontario") {
            filtered = CENTERS.filter(c => { const l = LOCATIONS.find(l2 => l2.id === c.locationId); return l.state === "ON"; });
          } else if (selLocation === "Online") {
            filtered = CENTERS.filter(c => c.locationId === "online");
          }
          if (filtered.length === 0) return (
            <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "40px 0", fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "#A0907C" }}>
              No centers found matching "{searchQ}". Try a different search.
            </div>
          );
          return filtered.map(c => {
          const loc = LOCATIONS.find(l => l.id === c.locationId);
          const sessionCount = SESSIONS.filter(s => s.centerId === c.id).length;
          const practiceTypes = [...new Set(SESSIONS.filter(s => s.centerId === c.id).map(s => s.type))];
          const nextSession = SESSIONS.filter(s => s.centerId === c.id)[0];
          return (
            <div key={c.id} onClick={() => setSelCenter(c.id)} style={{
              background: "#F7F2EA", borderRadius: 18, padding: 28, cursor: "pointer",
              border: "1px solid rgba(196,149,106,0.08)", transition: "all 0.35s",
              display: "flex", flexDirection: "column",
            }}
              onMouseOver={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(61,50,37,0.06)"; e.currentTarget.style.borderColor = "rgba(196,149,106,0.2)"; }}
              onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "rgba(196,149,106,0.08)"; }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 14 }}>
                <span style={{ fontSize: 10, padding: "4px 12px", borderRadius: 12, background: loc.id === "online" ? "rgba(111,139,154,0.1)" : "rgba(139,154,111,0.1)", color: loc.id === "online" ? "#6F8B9A" : "#8B9A6F", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>
                  {loc.id === "online" ? "🌐 Virtual" : `📍 ${loc.name}`}
                </span>
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 18, color: "#C4956A" }}>→</span>
              </div>
              <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 600, color: "#3D3225", marginBottom: 6 }}>{c.name}</h3>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "#A0907C", marginBottom: 4 }}>{c.address}</p>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "#7A6B5A", lineHeight: 1.6, flex: 1, marginBottom: 16 }}>{c.desc}</p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
                {practiceTypes.map(t => {
                  const pr = PRACTICES.find(p => p.id === t);
                  return <span key={t} style={{ fontSize: 9, padding: "3px 10px", borderRadius: 10, background: `${pr.color}10`, color: pr.color, fontFamily: "'DM Sans',sans-serif", fontWeight: 600, textTransform: "uppercase" }}>{pr.icon} {pr.title}</span>;
                })}
              </div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "#8B6F4E", fontWeight: 600 }}>
                {sessionCount} sessions available
              </div>
            </div>
          );
        });
        })()}
      </div>
    </>
  );
}

// ─── LANDING PAGE SECTIONS ───
function Hero({ scrollTo }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);
  const a = d => ({ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(22px)", transition: `all 0.9s ease ${d}s` });

  return (
    <section id="home" style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "linear-gradient(170deg, #FAF7F0 0%, #F3EDE2 40%, #EDE4D5 100%)",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", border: "1px solid rgba(196,149,106,0.07)", top: -120, right: -120, animation: "float 20s ease-in-out infinite" }} />
      <div style={{ position: "absolute", width: 260, height: 260, borderRadius: "50%", border: "1px solid rgba(196,149,106,0.05)", bottom: -60, left: -60, animation: "float 16s ease-in-out infinite reverse" }} />
      <svg style={{ position: "absolute", top: "10%", right: "10%", opacity: 0.04, width: 170 }} viewBox="0 0 100 100">
        {[0, 36, 72, 108, 144].map(r => <ellipse key={r} cx="50" cy="50" rx="13" ry="36" fill="#8B6F4E" transform={`rotate(${r} 50 50)`} />)}
      </svg>

      <div style={{ textAlign: "center", padding: "0 24px", maxWidth: 780, position: "relative", zIndex: 1 }}>
        <div style={{ ...a(0.2), fontFamily: "'DM Sans',sans-serif", fontSize: 11, letterSpacing: 5, textTransform: "uppercase", color: "#C4956A", marginBottom: 22 }}>
          ✦ Simplified Kundalini Yoga ✦
        </div>
        <h1 style={{ ...a(0.35), fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(36px, 7vw, 74px)", fontWeight: 300, color: "#3D3225", lineHeight: 1.1, margin: "0 0 20px" }}>
          Discover the<br /><span style={{ fontStyle: "italic", fontWeight: 500, color: "#8B6F4E" }}>stillness</span> within
        </h1>
        <p style={{ ...a(0.5), fontFamily: "'DM Sans',sans-serif", fontSize: "clamp(14px, 2vw, 17px)", color: "#7A6B5A", lineHeight: 1.7, maxWidth: 520, margin: "0 auto 40px" }}>
          A sacred space for meditation, yoga, and self-realization across the United States and Canada,
          rooted in the teachings of Shri Vethathiri Maharishi.
        </p>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" style={{ padding: "100px 24px", background: "#FAF7F0" }}>
      <div style={{ position: "relative", top: -1, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(196,149,106,0.2), transparent)", marginBottom: 0 }} />
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 64, alignItems: "center" }} className="about-grid">
          <FadeIn>
            <div style={{ width: "100%", paddingBottom: "110%", borderRadius: 16, background: "linear-gradient(135deg, #E8DFD0, #D4C5B0, #C4B59A)", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 14, border: "1px solid rgba(255,255,255,0.25)", borderRadius: 10 }} />
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center" }}>
                <svg width="64" height="64" viewBox="0 0 100 100" style={{ opacity: 0.3 }}>
                  <circle cx="50" cy="28" r="8" fill="#8B6F4E" /><path d="M50 40 C28 54 22 76 50 92 C78 76 72 54 50 40Z" fill="#8B6F4E" />
                </svg>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 13, color: "#8B6F4E", marginTop: 10, fontStyle: "italic" }}>Shri Vethathiri Maharishi</div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 9, color: "#A0907C", marginTop: 3, letterSpacing: 1 }}>1911 – 2006</div>
              </div>
            </div>
          </FadeIn>
          <div>
            <FadeIn delay={0.1}><Tag>Our Heritage</Tag></FadeIn>
            <FadeIn delay={0.15}><Title>A lineage of <I>wisdom &amp; peace</I></Title></FadeIn>
            <FadeIn delay={0.2}><p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, lineHeight: 1.8, color: "#7A6B5A", margin: "18px 0" }}>Founded on the teachings of Shri Vethathiri Maharishi (1911–2006), SKY Yoga Dallas is a chapter of the World Community Service Centre. Our mission is to help individuals achieve peace, harmony, and self-realization through time-tested yogic practices.</p></FadeIn>
            <FadeIn delay={0.25}><p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, lineHeight: 1.8, color: "#7A6B5A", marginBottom: 28 }}>With centers across the United States and Canada — plus virtual sessions accessible worldwide — we bring SKY's transformative practices to your doorstep. All sessions are offered free as community service.</p></FadeIn>
            <FadeIn delay={0.3}>
              <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
                {[{ n: "20+", l: "Centers" }, { n: "30+", l: "Weekly Sessions" }, { n: "∞", l: "Lives Touched" }].map((s, i) => (
                  <div key={i}><div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 32, fontWeight: 600, color: "#C4956A" }}>{s.n}</div><div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, letterSpacing: 1, color: "#A0907C", textTransform: "uppercase" }}>{s.l}</div></div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesPreview({ onExploreCourses }) {
  return (
    <section id="services" style={{ padding: "100px 24px", background: "linear-gradient(180deg, #F3EDE2, #EDE4D5)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn><div style={{ textAlign: "center", marginBottom: 48 }}><Tag>What We Offer</Tag><Title>Four pillars of <I>transformation</I></Title></div></FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 18 }}>
          {PRACTICES.map((p, i) => {
            const sc = SESSIONS.filter(s => s.type === p.id).length;
            return (
              <FadeIn key={p.id} delay={i * 0.07}>
                <div onClick={onExploreCourses} style={{
                  background: "#FAF7F0", borderRadius: 18, padding: 30, cursor: "pointer",
                  border: "1px solid rgba(196,149,106,0.06)", transition: "all 0.35s", height: "100%",
                  display: "flex", flexDirection: "column",
                }}
                  onMouseOver={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 10px 36px rgba(61,50,37,0.05)"; }}
                  onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <div style={{ fontSize: 28, marginBottom: 16 }}>{p.icon}</div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 600, color: "#3D3225", marginBottom: 8 }}>{p.title}</h3>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "#A0907C", fontStyle: "italic", marginBottom: 8 }}>{p.tagline}</p>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, lineHeight: 1.7, color: "#7A6B5A", flex: 1 }}>{p.desc}</p>
                  <div style={{ marginTop: 16, fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: p.color, fontWeight: 600 }}>{sc} sessions available →</div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FindYourPath({ onExploreCourses, onFindCenter }) {
  return (
    <section id="locations" style={{ padding: "100px 24px", background: "#FAF7F0" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <FadeIn><div style={{ textAlign: "center", marginBottom: 48 }}><Tag>Start Here</Tag><Title>Find your <I>path</I></Title><p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, color: "#7A6B5A", marginTop: 10 }}>Two ways to discover what's right for you.</p></div></FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="path-grid">
          {[
            { title: "Explore Courses", sub: "Browse by what you want to learn", desc: "Meditation, Kayakalpa, Physical Exercise, or Introspection — pick a practice and see all available sessions across every center.", icon: "🪷", onClick: onExploreCourses, color: "#C4956A" },
            { title: "Find a Center", sub: "Browse by where you are", desc: "Across the United States and Canada — pick a location and see everything available at each center near you.", icon: "🌍", onClick: onFindCenter, color: "#8B6F4E" },
          ].map((card, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div onClick={card.onClick} style={{
                background: "linear-gradient(160deg, #F7F2EA, #F0E8DA)", borderRadius: 22, padding: 40,
                border: "1px solid rgba(196,149,106,0.1)", cursor: "pointer",
                transition: "all 0.4s", height: "100%", display: "flex", flexDirection: "column",
                textAlign: "center", alignItems: "center",
              }}
                onMouseOver={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(61,50,37,0.08)"; e.currentTarget.style.borderColor = `${card.color}40`; }}
                onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "rgba(196,149,106,0.1)"; }}
              >
                <div style={{ fontSize: 40, marginBottom: 20 }}>{card.icon}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 26, fontWeight: 500, color: "#3D3225", marginBottom: 6 }}>{card.title}</h3>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: card.color, fontStyle: "italic", marginBottom: 14 }}>{card.sub}</p>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, lineHeight: 1.7, color: "#7A6B5A", flex: 1, marginBottom: 20 }}>{card.desc}</p>
                <div style={{
                  background: `linear-gradient(135deg, ${card.color}, ${card.color}CC)`, borderRadius: 12, padding: "12px 28px",
                  fontFamily: "'DM Sans',sans-serif", fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase",
                  color: "#FAF7F0", fontWeight: 600,
                }}>{card.title} →</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const [active, setActive] = useState(0);
  const ts = [
    { name: "Vijayalakshmi S.", center: "SKY Plano", text: "As I continue to practice SKY yoga I noticed I am less stressed. I started being in the moment. My son told me: 'Amma, you are more calm and happier these days.'" },
    { name: "Sadhana S.", center: "SKY Dallas", text: "SKY Yoga helped me deal with the rigors of student life with ease. I am able to live life the way I want to with peace and happiness." },
    { name: "Somasundram L.", center: "Online", text: "The path Sri Vethathiri Maharishi paved, centering on self-inquiry and meditation, opened a channel to experience something I hadn't before." },
  ];
  useEffect(() => { const t = setInterval(() => setActive(a => (a + 1) % ts.length), 6000); return () => clearInterval(t); }, []);

  return (
    <section id="testimonials" style={{ padding: "100px 24px", background: "#3D3225", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.02, backgroundImage: "radial-gradient(circle at 2px 2px, #FAF7F0 1px, transparent 0)", backgroundSize: "28px 28px" }} />
      <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        <FadeIn><Tag>Voices</Tag><Title dark>Stories of <span style={{ fontStyle: "italic", fontWeight: 500, color: "#C4956A" }}>transformation</span></Title></FadeIn>
        <div style={{ position: "relative", minHeight: 170, marginTop: 44 }}>
          {ts.map((t, i) => (
            <div key={i} style={{ position: i === active ? "relative" : "absolute", top: 0, left: 0, right: 0, opacity: i === active ? 1 : 0, transform: i === active ? "translateY(0)" : "translateY(14px)", transition: "all 0.7s", pointerEvents: i === active ? "auto" : "none" }}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 56, color: "#C4956A", opacity: 0.2, lineHeight: 0.5, marginBottom: 14 }}>"</div>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(16px, 2.2vw, 21px)", fontWeight: 400, color: "rgba(250,247,240,0.85)", lineHeight: 1.7, fontStyle: "italic", marginBottom: 22 }}>{t.text}</p>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: "#C4956A", fontWeight: 600 }}>{t.name}</div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "rgba(250,247,240,0.35)", marginTop: 3 }}>{t.center}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 28 }}>
          {ts.map((_, i) => <button key={i} onClick={() => setActive(i)} style={{ width: i === active ? 26 : 8, height: 8, borderRadius: 4, background: i === active ? "#C4956A" : "rgba(196,149,106,0.2)", border: "none", cursor: "pointer", transition: "all 0.4s" }} />)}
        </div>
      </div>
    </section>
  );
}

function Contact({ onFindCenter }) {
  return (
    <section id="contact" style={{ padding: "100px 24px", background: "linear-gradient(180deg, #F3EDE2, #EDE4D5)" }}>
      <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
        <FadeIn>
          <Tag>Connect</Tag>
          <Title>Begin your <I>journey</I></Title>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, color: "#7A6B5A", marginTop: 12, lineHeight: 1.7, maxWidth: 500, margin: "12px auto 32px" }}>
            We welcome all backgrounds and experience levels. All classes are offered free of charge as a community service.
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 36 }}>
            {[{ icon: "📧", label: "skyyogadallas@gmail.com" }, { icon: "🌐", label: "skyusa.org" }, { icon: "📘", label: "facebook.com/skyyogadallas" }].map((c, i) => (
              <span key={i} style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "#7A6B5A", padding: "8px 18px", background: "rgba(250,247,240,0.6)", borderRadius: 12, border: "1px solid rgba(196,149,106,0.08)" }}>
                {c.icon} {c.label}
              </span>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={0.15}>
          <button onClick={onFindCenter} style={{
            background: "linear-gradient(135deg, #C4956A, #A07850)", border: "none", borderRadius: 32, padding: "16px 40px", cursor: "pointer",
            fontFamily: "'DM Sans',sans-serif", fontSize: 14, letterSpacing: 2, textTransform: "uppercase",
            color: "#FAF7F0", fontWeight: 600, boxShadow: "0 8px 28px rgba(196,149,106,0.3)",
          }}>Find a Center &amp; Register</button>
        </FadeIn>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: "#3D3225", padding: "48px 24px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", flexWrap: "wrap", gap: 32, marginBottom: 36 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <div style={{ width: 30, height: 30, borderRadius: "50%", background: "linear-gradient(135deg, #C4956A, #8B6F4E)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cormorant Garamond',serif", fontSize: 14, fontWeight: 700, color: "#FAF7F0" }}>S</div>
              <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 15, fontWeight: 600, color: "#FAF7F0", letterSpacing: 1 }}>SKY YOGA DALLAS</span>
            </div>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "rgba(250,247,240,0.3)", maxWidth: 260, lineHeight: 1.6 }}>A chapter of the World Community Service Centre, serving communities across the US and Canada.</p>
          </div>
          <div style={{ display: "flex", gap: 36, flexWrap: "wrap" }}>
            {[{ t: "Regions", items: ["Texas", "California", "Illinois", "Ontario", "Online"] }, { t: "Practices", items: ["Meditation", "Exercise", "Kayakalpa", "Introspection"] }, { t: "Links", items: ["About WCSC", "Events", "Donate", "Register"] }].map(col => (
              <div key={col.t}>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "#C4956A", marginBottom: 12 }}>{col.t}</div>
                {col.items.map(l => <div key={l} style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "rgba(250,247,240,0.35)", marginBottom: 6, cursor: "pointer" }}>{l}</div>)}
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(250,247,240,0.04)", paddingTop: 18, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "rgba(250,247,240,0.2)" }}>© 2026 SKY Yoga Dallas. All rights reserved.</span>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "rgba(250,247,240,0.2)" }}>World Community Service Centre</span>
        </div>
      </div>
    </footer>
  );
}

// ─── NAV ───
function Nav({ active, scrollTo, onExploreCourses, onFindCenter }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => { const h = () => setScrolled(window.scrollY > 60); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: scrolled ? "rgba(250,247,240,0.97)" : "transparent", backdropFilter: scrolled ? "blur(12px)" : "none", borderBottom: scrolled ? "1px solid rgba(180,160,130,0.1)" : "none", transition: "all 0.4s", padding: scrolled ? "10px 0" : "16px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }} onClick={() => scrollTo("home")}>
          <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg, #C4956A, #8B6F4E)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cormorant Garamond',serif", fontSize: 15, fontWeight: 700, color: "#FAF7F0" }}>S</div>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 16, fontWeight: 600, color: "#3D3225", letterSpacing: 0.5 }}>SKY YOGA</div>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 8, letterSpacing: 2.5, color: "#8B6F4E", textTransform: "uppercase" }}>Dallas · Meditation Center</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 24, alignItems: "center" }} className="desktop-nav">
          {["home", "about", "services"].map(s => (
            <button key={s} onClick={() => scrollTo(s)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase", color: active === s ? "#C4956A" : "#5C4E3C", borderBottom: active === s ? "2px solid #C4956A" : "2px solid transparent", paddingBottom: 3, transition: "all 0.3s" }}>{s}</button>
          ))}
          <button onClick={onExploreCourses} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase", color: "#5C4E3C", paddingBottom: 3, borderBottom: "2px solid transparent", transition: "all 0.3s" }}>Courses</button>
          <button onClick={onFindCenter} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase", color: "#5C4E3C", paddingBottom: 3, borderBottom: "2px solid transparent", transition: "all 0.3s" }}>Centers</button>
          <button onClick={() => scrollTo("testimonials")} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase", color: active === "testimonials" ? "#C4956A" : "#5C4E3C", borderBottom: active === "testimonials" ? "2px solid #C4956A" : "2px solid transparent", paddingBottom: 3, transition: "all 0.3s" }}>Stories</button>
          <button onClick={onFindCenter} style={{ background: "linear-gradient(135deg, #C4956A, #A07850)", border: "none", borderRadius: 22, padding: "8px 20px", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: "#FAF7F0", fontWeight: 600 }}>Register</button>
        </div>
        <button className="mobile-toggle" onClick={() => setOpen(!open)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", width: 30, height: 30, position: "relative" }}>
          <span style={{ display: "block", width: 20, height: 2, background: "#3D3225", position: "absolute", top: open ? 14 : 9, left: 5, transition: "all 0.3s", transform: open ? "rotate(45deg)" : "none" }} />
          <span style={{ display: "block", width: 20, height: 2, background: "#3D3225", position: "absolute", top: 14, left: 5, opacity: open ? 0 : 1, transition: "all 0.2s" }} />
          <span style={{ display: "block", width: 20, height: 2, background: "#3D3225", position: "absolute", top: open ? 14 : 19, left: 5, transition: "all 0.3s", transform: open ? "rotate(-45deg)" : "none" }} />
        </button>
      </div>
      {open && (
        <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "rgba(250,247,240,0.98)", backdropFilter: "blur(16px)", padding: 20, borderBottom: "1px solid rgba(180,160,130,0.12)" }}>
          {[{ l: "Home", a: () => scrollTo("home") }, { l: "About", a: () => scrollTo("about") }, { l: "Practices", a: () => scrollTo("services") }, { l: "Courses", a: onExploreCourses }, { l: "Centers", a: onFindCenter }, { l: "Stories", a: () => scrollTo("testimonials") }, { l: "Contact", a: () => scrollTo("contact") }].map((item, i) => (
            <button key={i} onClick={() => { item.a(); setOpen(false); }} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontSize: 14, letterSpacing: 1.5, textTransform: "uppercase", color: "#5C4E3C", padding: "11px 0", borderBottom: i < 6 ? "1px solid rgba(180,160,130,0.06)" : "none" }}>{item.l}</button>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── MAIN APP ───
export default function SKYYogaDallas() {
  const [activeSection, setActiveSection] = useState("home");
  const [overlay, setOverlay] = useState(null); // "courses" | "centers" | null
  const [courseInitial, setCourseInitial] = useState(null);
  const [centerInitial, setCenterInitial] = useState(null);
  const [regSession, setRegSession] = useState(null);

  useEffect(() => {
    const h = () => { for (const s of ["home", "about", "services", "locations", "testimonials", "contact"]) { const el = document.getElementById(s); if (el) { const r = el.getBoundingClientRect(); if (r.top <= 120 && r.bottom > 120) { setActiveSection(s); break; } } } };
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const openCourses = (practiceId) => { setCourseInitial(practiceId || null); setOverlay("courses"); };
  const openCenters = (centerId) => { setCenterInitial(centerId || null); setOverlay("centers"); };

  // Cross-link handlers
  const handleCenterClickFromCourses = (centerId) => { setOverlay("centers"); setCenterInitial(centerId); };
  const handleCourseClickFromCenters = (practiceId) => { setOverlay("courses"); setCourseInitial(practiceId); };

  return (
    <div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');
        *{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}body{background:#FAF7F0}
        @keyframes float{0%,100%{transform:translate(0,0)}50%{transform:translate(-16px,16px)}}
        @media(max-width:768px){.desktop-nav{display:none!important}.mobile-toggle{display:block!important}.about-grid{grid-template-columns:1fr!important;gap:32px!important}.path-grid{grid-template-columns:1fr!important}}
        @media(min-width:769px){.mobile-toggle{display:none!important}}
        ::selection{background:rgba(196,149,106,0.2)}input::placeholder,textarea::placeholder{color:#B0A494}
      `}</style>

      <Nav active={activeSection} scrollTo={scrollTo} onExploreCourses={() => openCourses()} onFindCenter={() => openCenters()} />
      <Hero scrollTo={scrollTo} />
      <About />
      <ServicesPreview onExploreCourses={() => openCourses()} />
      <FindYourPath onExploreCourses={() => openCourses()} onFindCenter={() => openCenters()} />
      <Testimonials />
      <Contact onFindCenter={() => openCenters()} />
      <Footer />

      {/* OVERLAY: Explore Courses */}
      <Overlay open={overlay === "courses"} onClose={() => { setOverlay(null); setCourseInitial(null); }}>
        <ExploreCourses
          onClose={() => { setOverlay(null); setCourseInitial(null); }}
          onCenterClick={handleCenterClickFromCourses}
          onSignUp={setRegSession}
          initialPractice={courseInitial}
        />
      </Overlay>

      {/* OVERLAY: Find a Center */}
      <Overlay open={overlay === "centers"} onClose={() => { setOverlay(null); setCenterInitial(null); }}>
        <FindCenter
          onClose={() => { setOverlay(null); setCenterInitial(null); }}
          onCourseClick={handleCourseClickFromCenters}
          onSignUp={setRegSession}
          initialCenter={centerInitial}
        />
      </Overlay>

      {/* Registration Modal */}
      {regSession && <RegistrationModal session={regSession} onClose={() => setRegSession(null)} />}
    </div>
  );
}
