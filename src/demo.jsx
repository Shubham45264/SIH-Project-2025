import React from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";

/*
  Ocean Hazard Frontend (single-file demo)
  - Uses React + Tailwind CSS
  - Default export is App component
  - Features:
    - Home page (hero, map placeholder, recent reports)
    - Login / Signup with 2 user types: Local (citizen) and Authority
    - Authority dashboard route (/dashboard) ; local users redirect to home after login
    - Mock auth using localStorage (replace with real API calls)

  How to use this file in a Vite/CRA project:
  - Place this file as src/App.jsx and ensure your index.jsx renders <App /> inside BrowserRouter
  - Install dependencies: react-router-dom
  - Tailwind must be configured in the project (index.css contains @tailwind directives)

  NOTE: This file is a UI-first prototype. Replace mock functions with real API calls, secure auth, and map integration (Mapbox/Leaflet) before production.
*/

// ---------- Mock helpers ----------
const AUTH_KEY = "oh_user"; // localStorage key for simple demo auth

function setUser(user) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
}
function getUser() {
  try {
    return JSON.parse(localStorage.getItem(AUTH_KEY));
  } catch (e) {
    return null;
  }
}
function logout() {
  localStorage.removeItem(AUTH_KEY);
}

// Simple protected route for authority
function RequireAuthority({ children }) {
  const user = getUser();
  if (!user || user.type !== "authority") return <Navigate to="/login" replace />;
  return children;
}

// ---------- UI Components ----------
function NavBar() {
  const user = getUser();
  return (
    <header className="bg-gradient-to-r from-sky-600 to-cyan-500 text-white">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">🌊</div>
          <div>
            <div className="text-lg font-bold">CoastWatch</div>
            <div className="text-xs opacity-90">Ocean Hazard Reporting</div>
          </div>
        </Link>

        <nav className="flex items-center gap-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/reports" className="hover:underline">Reports</Link>
          {!user && <Link to="/login" className="bg-white/20 px-3 py-1 rounded">Login</Link>}
          {user && (
            <div className="flex items-center gap-3">
              <span className="text-sm">{user.name} ({user.type})</span>
              <button
                onClick={() => { logout(); window.location.href = "/" }}
                className="bg-white text-sky-700 px-3 py-1 rounded">Logout</button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl font-extrabold text-sky-800">CoastWatch — Trusted Coastal Hazard Alerts</h1>
          <p className="mt-4 text-slate-700">Combine citizen reports, social media signals, and authoritative ocean advisories to detect hazards fast. Report incidents, confirm local reports, and receive geo-targeted alerts.</p>

          <div className="mt-6 flex gap-3">
            <Link to="/report" className="bg-sky-600 text-white px-4 py-2 rounded shadow">Report Hazard</Link>
            <Link to="/login" className="border border-sky-600 text-sky-600 px-4 py-2 rounded">Sign in</Link>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-2">
            <div className="p-3 bg-sky-50 rounded">
              <div className="text-sm font-semibold">Live alerts</div>
              <div className="text-xs text-slate-600">INCOIS advisory fusion</div>
            </div>
            <div className="p-3 bg-sky-50 rounded">
              <div className="text-sm font-semibold">Community verified</div>
              <div className="text-xs text-slate-600">Local confirmations & reputation</div>
            </div>
          </div>
        </div>

        <div>
          {/* Map placeholder — replace with Mapbox/Leaflet */}
          <div className="h-72 rounded-lg shadow-inner overflow-hidden border border-slate-200">
            <div className="h-full w-full bg-gradient-to-br from-cyan-50 to-sky-100 flex items-center justify-center">
              <div className="text-sky-700 text-center">
                <div className="text-2xl font-bold">Map Preview</div>
                <div className="mt-2 text-sm">(Integrate Mapbox / Leaflet for live map)</div>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="p-3 bg-white border rounded">
              <div className="text-sm font-semibold">Recent Verified</div>
              <div className="text-xs text-slate-600">Baga Beach — Rip current</div>
            </div>
            <div className="p-3 bg-white border rounded">
              <div className="text-sm font-semibold">Recent Unverified</div>
              <div className="text-xs text-slate-600">Marina — suspected oil spill</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <main>
      <Hero />
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard title="Report from Phone" desc="Upload video/photo + location. Live-capture for high-severity reports." emoji="📱" />
          <FeatureCard title="Social Signals" desc="AI mines social media to detect early signals near shores." emoji="🛰️" />
          <FeatureCard title="Authority Fusion" desc="Fuse INCOIS advisories and local confirmations for trusted alerts." emoji="🏛️" />
        </div>
      </section>
    </main>
  );
}

function FeatureCard({ title, desc, emoji }) {
  return (
    <div className="p-4 bg-white rounded shadow-sm border">
      <div className="text-3xl">{emoji}</div>
      <div className="mt-2 font-semibold">{title}</div>
      <div className="text-sm text-slate-600 mt-1">{desc}</div>
    </div>
  );
}

// ---------- Report Page (simplified) ----------
function ReportPage() {
  const user = getUser();
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold">Report a Hazard</h2>
      <p className="text-sm text-slate-600 mt-2">Upload photo/video and add a short description. We will verify using AI and local confirmations.</p>

      {!user && <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400">Please <Link to="/login" className="underline">login</Link> to submit reports. Locals can confirm within the time window.</div>}

      <div className="mt-6 bg-white p-4 rounded border">
        <label className="block text-sm font-medium">Short Description</label>
        <input className="mt-1 w-full border rounded p-2" placeholder="e.g. strong rip currents near the pier" />
        <label className="block text-sm font-medium mt-3">Upload Media (photo/video)</label>
        <input type="file" accept="video/*,image/*" className="mt-1" />
        <div className="mt-4 flex gap-3">
          <button className="bg-sky-600 text-white px-4 py-2 rounded">Submit</button>
          <button className="border px-4 py-2 rounded">Record Live (mobile)</button>
        </div>
      </div>
    </div>
  );
}

// ---------- Reports listing ----------
function ReportsPage() {
  // Mock data
  const reports = [
    { id: 1, title: "Rip current at Baga", status: "verified", time: "15m" },
    { id: 2, title: "Oil sheen near Marina", status: "unverified", time: "1h" },
  ];
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold">Recent Reports</h2>
      <div className="mt-4 grid gap-3">
        {reports.map(r => (
          <div key={r.id} className={`p-4 border rounded flex justify-between items-center ${r.status==='verified' ? 'bg-green-50' : 'bg-white'}`}>
            <div>
              <div className="font-semibold">{r.title}</div>
              <div className="text-xs text-slate-600">{r.time} ago</div>
            </div>
            <div className="text-sm">{r.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- Login / Signup ----------
function LoginPage() {
  const navigate = useNavigate();
  const [type, setType] = React.useState("local"); // 'local' or 'authority'
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleLogin(e) {
    e.preventDefault();
    // Mock auth: accept any name/password
    const user = { name: name || (type==='authority'? 'AuthorityUser':'LocalUser'), type };
    setUser(user);
    if (type === 'authority') navigate('/dashboard');
    else navigate('/');
  }

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold">Sign in</h2>
        <p className="text-sm text-slate-600">Choose account type and sign in.</p>

        <div className="mt-4 flex gap-2">
          <button onClick={() => setType('local')} className={`px-3 py-1 rounded ${type==='local'?'bg-sky-600 text-white':'border'}`}>Local</button>
          <button onClick={() => setType('authority')} className={`px-3 py-1 rounded ${type==='authority'?'bg-sky-600 text-white':'border'}`}>Authority</button>
        </div>

        <form onSubmit={handleLogin} className="mt-4 space-y-3">
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" className="w-full border p-2 rounded" />
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="w-full border p-2 rounded" />
          <div className="flex items-center justify-between">
            <button className="bg-sky-600 text-white px-4 py-2 rounded">Sign in</button>
            <Link to="/signup" className="text-sm text-sky-600">Create account</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

function SignupPage() {
  const navigate = useNavigate();
  const [type, setType] = React.useState('local');
  const [name, setName] = React.useState('');

  function handleSignup(e) {
    e.preventDefault();
    const user = { name: name || (type==='authority'? 'AuthorityUser':'LocalUser'), type };
    setUser(user);
    if (type === 'authority') navigate('/dashboard');
    else navigate('/');
  }

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold">Create account</h2>
        <div className="mt-3 flex gap-2">
          <button onClick={() => setType('local')} className={`px-3 py-1 rounded ${type==='local'?'bg-sky-600 text-white':'border'}`}>Local</button>
          <button onClick={() => setType('authority')} className={`px-3 py-1 rounded ${type==='authority'?'bg-sky-600 text-white':'border'}`}>Authority</button>
        </div>

        <form onSubmit={handleSignup} className="mt-4 space-y-3">
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" className="w-full border p-2 rounded" />
          <input placeholder="Phone / Email" className="w-full border p-2 rounded" />
          <div className="flex items-center justify-between">
            <button className="bg-sky-600 text-white px-4 py-2 rounded">Create</button>
            <Link to="/login" className="text-sm text-sky-600">Already have account?</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

// ---------- Authority Dashboard (simplified) ----------
function AuthorityDashboard() {
  const navigate = useNavigate();
  const user = getUser();
  function handleLogout() { logout(); navigate('/'); }

  // mock metrics
  const metrics = [
    { label: 'Active Alerts', value: 3 },
    { label: 'Pending Verifications', value: 7 },
    { label: 'Nearby Reports', value: 12 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Authority Dashboard</h2>
          <div className="text-sm text-slate-600">Welcome, {user?.name}</div>
        </div>
        <div>
          <button onClick={handleLogout} className="bg-red-600 text-white px-3 py-1 rounded">Logout</button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6">
        {metrics.map(m => (
          <div key={m.label} className="p-4 bg-white border rounded">
            <div className="text-sm text-slate-500">{m.label}</div>
            <div className="text-2xl font-bold">{m.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-white rounded border p-4">
        <h3 className="font-semibold">Pending Reports</h3>
        <div className="mt-3 grid gap-3">
          {[1,2,3].map(i => (
            <div key={i} className="p-3 border rounded flex justify-between items-center">
              <div>
                <div className="font-semibold">Rip current near Beach {i}</div>
                <div className="text-xs text-slate-500">Uploaded 18m ago — confidence 58%</div>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 rounded bg-green-600 text-white">Approve</button>
                <button className="px-3 py-1 rounded border">Request Live Capture</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------- App (router) ----------
export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<RequireAuthority><AuthorityDashboard /></RequireAuthority>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}