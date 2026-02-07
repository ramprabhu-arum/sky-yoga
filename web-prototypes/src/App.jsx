import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Lazy load the prototypes
const SkyYogaV3 = lazy(() => import('./designs/sky-yoga-v3/index'));
const SkyYogaV5 = lazy(() => import('./designs/sky-yoga-v5/index'));
const SkyYogaZen = lazy(() => import('./designs/sky-yoga-zen/index'));
const SkyYogaSerene = lazy(() => import('./designs/sky-yoga-serene/index'));
const SkyYogaEditorial = lazy(() => import('./designs/sky-yoga-editorial/index'));

function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #1A1A1A 0%, #0F0F0F 100%)',
      fontFamily: "'DM Sans', system-ui, sans-serif",
      color: '#FAF7F0',
      padding: '24px'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=DM+Sans:wght@400;500;700&display=swap');
        .card:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.4); border-color: rgba(196,149,106,0.4); }
      `}</style>

      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <div style={{
          width: '64px', height: '64px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #C4956A, #8B6F4E)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Cormorant Garamond', serif", fontSize: '28px', fontWeight: 700,
          margin: '0 auto 24px', boxShadow: '0 0 30px rgba(196,149,106,0.2)'
        }}>S</div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '48px', fontWeight: 300, marginBottom: '12px', letterSpacing: '-0.02em' }}>
          Sky Yoga <span style={{ fontStyle: 'italic', color: '#C4956A' }}>Prototypes</span>
        </h1>
        <p style={{ color: 'rgba(250,247,240,0.5)', maxWidth: '400px', margin: '0 auto', fontSize: '16px', lineHeight: 1.6 }}>
          Explore design concepts and interactive mockups effectively isolated for performance.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '24px',
        width: '100%',
        maxWidth: '800px'
      }}>
        <Link to="/sky-yoga-v3" className="card" style={{
          textDecoration: 'none',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '24px',
          padding: '32px',
          transition: 'all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start'
        }}>
          <div style={{
            padding: '8px 16px', borderRadius: '100px',
            background: 'rgba(196,149,106,0.1)', color: '#C4956A',
            fontSize: '12px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase',
            marginBottom: '20px'
          }}>Classic</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px', color: '#FAF7F0', margin: '0 0 8px 0' }}>Sky Yoga V3</h2>
          <p style={{ color: 'rgba(250,247,240,0.4)', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
            The original comprehensive layout focusing on warm tones, rich typography, and content density.
          </p>
          <div style={{ marginTop: '24px', color: '#C4956A', fontSize: '14px', fontWeight: 600 }}>Launch Prototype →</div>
        </Link>

        <Link to="/sky-yoga-v5" className="card" style={{
          textDecoration: 'none',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '24px',
          padding: '32px',
          transition: 'all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start'
        }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
            <div style={{
              padding: '8px 16px', borderRadius: '100px',
              background: 'rgba(196,149,106,0.1)', color: '#C4956A',
              fontSize: '12px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase'
            }}>Classic v1.1</div>
            <div style={{
              padding: '8px 16px', borderRadius: '100px',
              background: 'rgba(139,154,111,0.1)', color: '#8B9A6F',
              fontSize: '12px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase'
            }}>Version 1.0</div>
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px', color: '#FAF7F0', margin: '0 0 8px 0' }}>Sky Yoga V5</h2>
          <p style={{ color: 'rgba(250,247,240,0.4)', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
            Enhanced classic design with books, videos, and multi-day program registration features.
          </p>
          <div style={{ marginTop: '24px', color: '#C4956A', fontSize: '14px', fontWeight: 600 }}>Launch Prototype →</div>
        </Link>

        {/* <Link to="/sky-yoga-zen" className="card" style={{
          textDecoration: 'none',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '24px',
          padding: '32px',
          transition: 'all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start'
        }}>
          <div style={{
            padding: '8px 16px', borderRadius: '100px',
            background: 'rgba(212,175,55,0.1)', color: '#D4AF37',
            fontSize: '12px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase',
            marginBottom: '20px'
          }}>New Concept</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px', color: '#FAF7F0', margin: '0 0 8px 0' }}>Zen Monolith</h2>
          <p style={{ color: 'rgba(250,247,240,0.4)', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
            A dark, minimalist aesthetic emphasizing negative space, glassmorphism, and serenity.
          </p>
          <div style={{ marginTop: '24px', color: '#D4AF37', fontSize: '14px', fontWeight: 600 }}>Launch Prototype →</div>
        </Link> */}

        <Link to="/sky-yoga-serene" className="card" style={{
          textDecoration: 'none',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '24px',
          padding: '32px',
          transition: 'all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start'
        }}>
          <div style={{
            padding: '8px 16px', borderRadius: '100px',
            background: 'rgba(116,140,112,0.1)', color: '#748C70',
            fontSize: '12px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase',
            marginBottom: '20px'
          }}>New Concept</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px', color: '#FAF7F0', margin: '0 0 8px 0' }}>Serene Garden</h2>
          <p style={{ color: 'rgba(250,247,240,0.4)', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
            A light, airy interface inspired by nature, featuring soft greens and ample whitespace.
          </p>
          <div style={{ marginTop: '24px', color: '#748C70', fontSize: '14px', fontWeight: 600 }}>Launch Prototype →</div>
        </Link>

        <Link to="/sky-yoga-editorial" className="card" style={{
          textDecoration: 'none',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '24px',
          padding: '32px',
          transition: 'all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start'
        }}>
          <div style={{
            padding: '8px 16px', borderRadius: '100px',
            background: 'rgba(230,57,70,0.1)', color: '#E63946',
            fontSize: '12px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase',
            marginBottom: '20px'
          }}>Premium</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px', color: '#FAF7F0', margin: '0 0 8px 0' }}>Editorial Bold</h2>
          <p style={{ color: 'rgba(250,247,240,0.4)', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
            Magazine-inspired design with dramatic typography, asymmetric grids, and high contrast.
          </p>
          <div style={{ marginTop: '24px', color: '#E63946', fontSize: '14px', fontWeight: 600 }}>Launch Prototype →</div>
        </Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sky-yoga-v3/*" element={
          <Suspense fallback={<div style={{ height: '100vh', background: '#FAF7F0' }} />}>
            <SkyYogaV3 />
          </Suspense>
        } />
        <Route path="/sky-yoga-v5/*" element={
          <Suspense fallback={<div style={{ height: '100vh', background: '#FAF7F0' }} />}>
            <SkyYogaV5 />
          </Suspense>
        } />
        <Route path="/sky-yoga-zen/*" element={
          <Suspense fallback={<div style={{ height: '100vh', background: '#121212' }} />}>
            <SkyYogaZen />
          </Suspense>
        } />
        <Route path="/sky-yoga-serene/*" element={
          <Suspense fallback={<div style={{ height: '100vh', background: '#FAF9F6' }} />}>
            <SkyYogaSerene />
          </Suspense>
        } />
        <Route path="/sky-yoga-editorial/*" element={
          <Suspense fallback={<div style={{ height: '100vh', background: '#FFF' }} />}>
            <SkyYogaEditorial />
          </Suspense>
        } />
      </Routes>
    </Router>
  );
}
