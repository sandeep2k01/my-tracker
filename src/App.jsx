import { useState, useEffect } from "react";

const C = {
  bg: "#FFFFFF", surface: "#F8FAFC", border: "#E2E8F0",
  text: "#0F172A", textMid: "#475569", textLight: "#94A3B8",
  blue: "#1D4ED8", blueBg: "#EFF6FF", blueBorder: "#BFDBFE",
  green: "#15803D", greenBg: "#F0FDF4", greenBorder: "#BBF7D0",
  amber: "#B45309", amberBg: "#FFFBEB", amberBorder: "#FDE68A",
  purple: "#6D28D9", purpleBg: "#F5F3FF", purpleBorder: "#DDD6FE",
  orange: "#C2410C", orangeBg: "#FFF7ED", orangeBorder: "#FED7AA",
  red: "#DC2626", redBg: "#FEF2F2", redBorder: "#FECACA",
  dark: "#0F172A", darkText: "#F8FAFC", darkMid: "#64748B",
};

const MONTHS = [
  { id: "m1", num: 1, title: "HTML & CSS", color: C.amber, bg: C.amberBg, border: C.amberBorder, days: 30, icon: "🏗️",
    weeks: [
      { w: 1, focus: "HTML Only", concepts: ["Document structure — html, head, body", "Headings, paragraphs, links, images", "Lists — ordered and unordered", "Forms — input, button, select, textarea", "Semantic tags — header, nav, main, footer"] },
      { w: 2, focus: "CSS Fundamentals", concepts: ["Selectors — class, id, element", "Box model — margin, padding, border", "Colors, typography, font-size", "Display — block, inline, inline-block", "Pseudo-classes — hover, focus, active"] },
      { w: 3, focus: "Flexbox & Grid", concepts: ["Flexbox — justify-content, align-items, gap", "CSS Grid — template-columns, template-rows", "When to use Flex vs Grid", "Position — relative, absolute, fixed, sticky", "Z-index and stacking context"] },
      { w: 4, focus: "Responsive Design", concepts: ["Media queries — min-width breakpoints", "Mobile-first approach", "Responsive images — max-width: 100%", "CSS variables — --color-primary", "rem, em, vh, vw units"] },
    ],
    project: "Startup Landing Page Clone", projectColor: C.amber },
  { id: "m2", num: 2, title: "JavaScript", color: C.blue, bg: C.blueBg, border: C.blueBorder, days: 30, icon: "⚡",
    weeks: [
      { w: 5, focus: "JS Core", concepts: ["Variables — var, let, const", "Arrays — map, filter, reduce, forEach", "Objects — destructuring, spread operator", "Functions — declarations, expressions, arrow", "Template literals, ternary, short-circuit"] },
      { w: 6, focus: "Closures & Scope", concepts: ["Execution context and call stack", "Hoisting — var vs let vs const", "Scope and scope chain", "Closures — function remembers outer scope", "IIFE — immediately invoked function"] },
      { w: 7, focus: "DOM Manipulation", concepts: ["querySelector, getElementById", "addEventListener — click, input, submit", "innerHTML, textContent, classList", "createElement, appendChild, removeChild", "Event delegation — one listener on parent"] },
      { w: 8, focus: "Async JavaScript", concepts: ["Synchronous vs asynchronous", "Callbacks and callback hell", "Promises — .then() .catch() .finally()", "async/await — cleaner promise syntax", "Fetch API — making real HTTP requests"] },
    ],
    project: "Bill Splitter App", projectColor: C.blue },
  { id: "m3", num: 3, title: "React", color: C.green, bg: C.greenBg, border: C.greenBorder, days: 30, icon: "⚛️",
    weeks: [
      { w: 9, focus: "React Core", concepts: ["JSX — HTML in JavaScript", "Components — functional, reusable", "Props — passing data to children", "useState — local state management", "Conditional rendering and lists with .map()"] },
      { w: 10, focus: "useEffect & APIs", concepts: ["useEffect — dependency array patterns", "Fetching data in useEffect correctly", "Loading states and error states", "Conditional rendering with ternary", "Keys in lists — why they matter"] },
      { w: 11, focus: "Hooks & Router", concepts: ["Custom hooks — useFetch, useLocalStorage", "useContext — share state without prop drilling", "React Router — BrowserRouter, Routes, Route", "useNavigate, useParams, Link", "Component composition — children prop"] },
      { w: 12, focus: "Forms & Patterns", concepts: ["Controlled inputs — value + onChange", "Form validation from scratch", "useMemo and useCallback basics", "Folder structure — components, pages, hooks", "Reading and debugging others' React code"] },
    ],
    project: "Job Application Tracker", projectColor: C.green },
  { id: "m4", num: 4, title: "Real-Time + Git", color: C.purple, bg: C.purpleBg, border: C.purpleBorder, days: 25, icon: "🔴",
    weeks: [
      { w: 13, focus: "Git Properly", concepts: ["Branching — checkout -b, merge, rebase", "Merge conflicts — resolve them intentionally", "Pull Requests — create, review, merge", ".gitignore — node_modules, .env files", "git log, diff, stash — reading history"] },
      { w: 14, focus: "Firebase Basics", concepts: ["Firebase Console — project setup", "Firestore vs Realtime Database", "onSnapshot — real-time listener pattern", "addDoc, updateDoc, deleteDoc", "Environment variables for API keys"] },
      { w: 15, focus: "Real-Time App", concepts: ["Connecting Firebase to React", "useEffect cleanup for listeners", "Real-time UI without page refresh", "Firebase security rules basics", "Deploying React + Firebase on Vercel"] },
    ],
    project: "Live Notice Board", projectColor: C.purple },
  { id: "m5", num: 5, title: "Apply + Interview", color: C.orange, bg: C.orangeBg, border: C.orangeBorder, days: 35, icon: "🎯",
    weeks: [
      { w: 16, focus: "Interview Prep", concepts: ["STAR format for project explanations", "Practice: closures, event loop, useEffect out loud", "Build todo app from blank file in 20 mins", "Research companies before applying", "Prepare AI honesty answer"] },
      { w: 17, focus: "Apply Consistently", concepts: ["5 applications per week — Wellfound, LinkedIn", "Cold email to startup founders — 3 lines", "Mock interview on Pramp.com weekly", "Follow up on applications after 5 days", "Update Job Tracker with every application"] },
    ],
    project: "Next.js + TypeScript Upgrade", projectColor: C.orange },
];

const DAY_TASKS = [
  { id: "watched", label: "Watched today's video", icon: "📺" },
  { id: "built", label: "Built from memory (no copy-paste)", icon: "💻" },
  { id: "modified", label: "Modified / extended what I built", icon: "🔧" },
  { id: "pushed", label: "Pushed to GitHub", icon: "📤" },
  { id: "explained", label: "Explained today's concept out loud", icon: "🗣️" },
];

const MOODS = [
  { id: "great", label: "Understood everything", color: C.green, emoji: "🟢" },
  { id: "okay", label: "Mostly understood", color: C.amber, emoji: "🟡" },
  { id: "confused", label: "Still confused", color: C.red, emoji: "🔴" },
];

function getTodayKey() {
  return new Date().toISOString().split("T")[0];
}

function getDayNumber(startDate) {
  if (!startDate) return 1;
  const start = new Date(startDate);
  const today = new Date();
  const diff = Math.floor((today - start) / (1000 * 60 * 60 * 24));
  return Math.max(1, diff + 1);
}

function getMonthForDay(dayNum) {
  let d = 0;
  for (const m of MONTHS) {
    if (dayNum <= d + m.days) return m;
    d += m.days;
  }
  return MONTHS[MONTHS.length - 1];
}

function getWeekForDay(dayNum) {
  let d = 0;
  for (const m of MONTHS) {
    for (const w of m.weeks) {
      const wdays = Math.ceil(m.days / m.weeks.length);
      if (dayNum <= d + wdays) return { month: m, week: w };
      d += wdays;
    }
  }
  return { month: MONTHS[MONTHS.length - 1], week: MONTHS[MONTHS.length - 1].weeks[0] };
}

function getStreakFromLogs(logs) {
  let streak = 0;
  const today = new Date();
  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split("T")[0];
    const log = logs[key];
    if (log && log.tasks && Object.values(log.tasks).some(Boolean)) {
      streak++;
    } else if (i > 0) break;
  }
  return streak;
}

function getLast60Days(logs) {
  const days = [];
  const today = new Date();
  for (let i = 59; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split("T")[0];
    const log = logs[key];
    const count = log?.tasks ? Object.values(log.tasks).filter(Boolean).length : 0;
    days.push({ key, count, date: d });
  }
  return days;
}

export default function Tracker() {
  const [view, setView] = useState("today");
  const [startDate, setStartDate] = useState(null);
  const [logs, setLogs] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeMonth, setActiveMonth] = useState("m1");

  const todayKey = getTodayKey();
  const todayLog = logs[todayKey] || { tasks: {}, mood: null, concept: "", blocker: "", win: "" };
  const dayNum = getDayNumber(startDate);
  const { month: currentMonth, week: currentWeek } = getWeekForDay(dayNum);
  const streak = getStreakFromLogs(logs);
  const totalDaysLogged = Object.keys(logs).filter(k => {
    const l = logs[k];
    return l?.tasks && Object.values(l.tasks).some(Boolean);
  }).length;

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const sd = await window.storage.get("startDate");
        if (sd) setStartDate(sd.value);
        const lg = await window.storage.get("dailyLogs");
        if (lg) setLogs(JSON.parse(lg.value));
      } catch (e) {}
      setLoading(false);
    }
    load();
  }, []);

  async function handleStartToday() {
    const today = getTodayKey();
    setStartDate(today);
    try { await window.storage.set("startDate", today); } catch (e) {}
  }

  async function saveLog(updated) {
    setLogs(updated);
    setSaving(true);
    try { await window.storage.set("dailyLogs", JSON.stringify(updated)); } catch (e) {}
    setTimeout(() => setSaving(false), 600);
  }

  async function toggleTask(taskId) {
    const updated = {
      ...logs,
      [todayKey]: {
        ...todayLog,
        tasks: { ...todayLog.tasks, [taskId]: !todayLog.tasks[taskId] },
      },
    };
    await saveLog(updated);
  }

  async function setMood(moodId) {
    const updated = { ...logs, [todayKey]: { ...todayLog, mood: moodId } };
    await saveLog(updated);
  }

  async function updateField(field, value) {
    const updated = { ...logs, [todayKey]: { ...todayLog, [field]: value } };
    setLogs(updated);
    try { await window.storage.set("dailyLogs", JSON.stringify(updated)); } catch (e) {}
  }

  const tasksDone = DAY_TASKS.filter(t => todayLog.tasks[t.id]).length;
  const pct = Math.round((tasksDone / DAY_TASKS.length) * 100);

  const tabs = [
    { id: "today", label: "📅 Today" },
    { id: "progress", label: "📈 Progress" },
    { id: "curriculum", label: "📚 Curriculum" },
    { id: "history", label: "🗓️ History" },
  ];

  if (loading) return (
    <div style={{ background: C.bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "32px", marginBottom: "12px" }}>⏳</div>
        <div style={{ fontSize: "14px", color: C.textLight }}>Loading your progress...</div>
      </div>
    </div>
  );

  if (!startDate) return (
    <div style={{ background: C.bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap'); * { box-sizing: border-box; margin: 0; padding: 0; }`}</style>
      <div style={{ maxWidth: "460px", width: "100%", padding: "40px 32px", textAlign: "center" }}>
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>🚀</div>
        <h1 style={{ fontSize: "26px", fontWeight: "700", color: C.text, marginBottom: "10px" }}>Frontend Roadmap Tracker</h1>
        <p style={{ fontSize: "14px", color: C.textMid, lineHeight: "1.7", marginBottom: "28px" }}>
          150 days. 4 real-world projects. One startup job.<br />
          Your progress saves automatically every day.
        </p>
        <div style={{ background: C.greenBg, border: `1px solid ${C.greenBorder}`, borderRadius: "10px", padding: "16px", marginBottom: "24px", textAlign: "left" }}>
          {["Day 1–30: HTML & CSS → Startup Landing Page", "Day 31–60: JavaScript → Bill Splitter App", "Day 61–90: React → Job Application Tracker", "Day 91–115: Firebase + Git → Live Notice Board", "Day 116–150: Interview Prep → First Offer"].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: "8px", marginBottom: i < 4 ? "8px" : "0" }}>
              <span style={{ color: C.green, fontWeight: "700", fontSize: "13px" }}>{i + 1}.</span>
              <span style={{ fontSize: "13px", color: C.text }}>{item}</span>
            </div>
          ))}
        </div>
        <button onClick={handleStartToday} style={{
          width: "100%", padding: "14px", fontSize: "15px", fontWeight: "700",
          background: C.dark, color: C.darkText, border: "none", borderRadius: "10px",
          cursor: "pointer", letterSpacing: "0.02em"
        }}>
          Start Day 1 Today →
        </button>
        <p style={{ fontSize: "11px", color: C.textLight, marginTop: "12px" }}>Your progress is saved automatically in this browser</p>
      </div>
    </div>
  );

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'DM Sans', 'Segoe UI', sans-serif", color: C.text }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 2px; }
        button { cursor: pointer; font-family: inherit; border: none; }
        textarea, input { font-family: inherit; }
      `}</style>

      {/* Header */}
      <div style={{ background: C.dark, padding: "16px 24px 0" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "16px", flexWrap: "wrap", gap: "12px" }}>
            <div>
              <h1 style={{ fontSize: "17px", fontWeight: "700", color: C.darkText }}>
                Frontend Roadmap Tracker
              </h1>
              <p style={{ fontSize: "12px", color: C.darkMid, marginTop: "2px" }}>
                {currentMonth.icon} Currently: {currentMonth.title} — Week {currentWeek.w} — {currentWeek.focus}
              </p>
            </div>
            <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
              {[
                { n: `Day ${dayNum}`, l: "of 150", color: currentMonth.color },
                { n: `${streak}`, l: streak === 1 ? "day streak" : "day streak", color: "#F59E0B" },
                { n: `${totalDaysLogged}`, l: "days logged", color: "#34D399" },
              ].map(s => (
                <div key={s.l} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "20px", fontWeight: "700", color: s.color, fontFamily: "'DM Mono', monospace", lineHeight: 1 }}>{s.n}</div>
                  <div style={{ fontSize: "10px", color: C.darkMid, marginTop: "1px" }}>{s.l}</div>
                </div>
              ))}
              {saving && <span style={{ fontSize: "11px", color: "#34D399", fontFamily: "'DM Mono', monospace" }}>saving...</span>}
            </div>
          </div>

          {/* Overall progress bar */}
          <div style={{ marginBottom: "14px" }}>
            <div style={{ display: "flex", gap: "2px" }}>
              {MONTHS.map(m => {
                const totalDays = MONTHS.reduce((a, x) => a + x.days, 0);
                const widthPct = (m.days / totalDays) * 100;
                let filled = 0;
                let monthStart = 0;
                for (const mm of MONTHS) {
                  if (mm.id === m.id) break;
                  monthStart += mm.days;
                }
                if (dayNum > monthStart + m.days) filled = 100;
                else if (dayNum > monthStart) filled = ((dayNum - monthStart) / m.days) * 100;
                return (
                  <div key={m.id} style={{ width: `${widthPct}%`, position: "relative" }}>
                    <div style={{ height: "6px", background: "#1E293B", borderRadius: "3px", overflow: "hidden" }}>
                      <div style={{ width: `${filled}%`, height: "100%", background: m.color, borderRadius: "3px", transition: "width 0.3s" }} />
                    </div>
                    <div style={{ fontSize: "9px", color: filled > 0 ? m.color : "#374151", marginTop: "3px", textAlign: "center", fontFamily: "'DM Mono', monospace", letterSpacing: "0.05em", whiteSpace: "nowrap", overflow: "hidden" }}>
                      {m.icon} M{m.num}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: "2px" }}>
            {tabs.map(t => (
              <button key={t.id} onClick={() => setView(t.id)} style={{
                padding: "8px 16px", fontSize: "12px", fontWeight: "500",
                background: view === t.id ? C.bg : "transparent",
                color: view === t.id ? C.text : C.darkMid,
                borderRadius: "6px 6px 0 0", transition: "all 0.15s"
              }}>{t.label}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "22px 24px" }}>

        {/* ===== TODAY TAB ===== */}
        {view === "today" && (
          <div>
            {/* Today header */}
            <div style={{ background: currentMonth.bg, border: `1px solid ${currentMonth.border}`, borderRadius: "12px", padding: "18px 22px", marginBottom: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
                <div>
                  <div style={{ fontSize: "10px", fontWeight: "700", color: currentMonth.color, letterSpacing: "0.12em", fontFamily: "'DM Mono', monospace", marginBottom: "4px" }}>
                    DAY {dayNum} · {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" }).toUpperCase()}
                  </div>
                  <h2 style={{ fontSize: "18px", fontWeight: "700", color: C.text }}>{currentWeek.focus}</h2>
                  <p style={{ fontSize: "13px", color: C.textMid, marginTop: "2px" }}>{currentMonth.icon} {currentMonth.title} — Week {currentWeek.w}</p>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "32px", fontWeight: "700", color: pct === 100 ? C.green : currentMonth.color, fontFamily: "'DM Mono', monospace", lineHeight: 1 }}>{pct}%</div>
                  <div style={{ fontSize: "10px", color: C.textLight, marginTop: "2px" }}>today done</div>
                </div>
              </div>

              {/* Progress bar */}
              <div style={{ marginTop: "14px", height: "6px", background: "white", borderRadius: "3px", overflow: "hidden" }}>
                <div style={{ width: `${pct}%`, height: "100%", background: pct === 100 ? C.green : currentMonth.color, borderRadius: "3px", transition: "width 0.4s" }} />
              </div>
            </div>

            {/* This week's concepts */}
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: "10px", padding: "14px 18px", marginBottom: "14px" }}>
              <div style={{ fontSize: "10px", fontWeight: "700", color: C.textLight, letterSpacing: "0.1em", marginBottom: "10px", fontFamily: "'DM Mono', monospace" }}>📚 THIS WEEK — CONCEPTS TO STUDY</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
                {currentWeek.concepts.map((c, i) => (
                  <div key={i} style={{ display: "flex", gap: "8px", padding: "7px 10px", background: "white", borderRadius: "6px", border: `1px solid ${C.border}` }}>
                    <span style={{ color: currentMonth.color, fontSize: "12px", flexShrink: 0 }}>✓</span>
                    <span style={{ fontSize: "12px", color: C.textMid, lineHeight: "1.5" }}>{c}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily checklist */}
            <div style={{ background: "white", border: `1px solid ${C.border}`, borderRadius: "10px", padding: "14px 18px", marginBottom: "14px" }}>
              <div style={{ fontSize: "10px", fontWeight: "700", color: C.textLight, letterSpacing: "0.1em", marginBottom: "12px", fontFamily: "'DM Mono', monospace" }}>
                ✅ TODAY'S CHECKLIST — {tasksDone}/{DAY_TASKS.length} DONE
              </div>
              {DAY_TASKS.map((task, i) => {
                const done = !!todayLog.tasks[task.id];
                return (
                  <button key={task.id} onClick={() => toggleTask(task.id)} style={{
                    display: "flex", alignItems: "center", gap: "12px", width: "100%",
                    padding: "12px 14px", marginBottom: i < DAY_TASKS.length - 1 ? "8px" : "0",
                    background: done ? currentMonth.bg : C.surface,
                    border: `1px solid ${done ? currentMonth.border : C.border}`,
                    borderRadius: "8px", textAlign: "left", transition: "all 0.15s"
                  }}>
                    <div style={{
                      width: "22px", height: "22px", borderRadius: "50%", flexShrink: 0,
                      background: done ? currentMonth.color : "white",
                      border: `2px solid ${done ? currentMonth.color : C.borderMid || C.border}`,
                      display: "flex", alignItems: "center", justifyContent: "center"
                    }}>
                      {done && <span style={{ fontSize: "12px", color: "white" }}>✓</span>}
                    </div>
                    <span style={{ fontSize: "14px" }}>{task.icon}</span>
                    <span style={{ fontSize: "13px", fontWeight: done ? "600" : "400", color: done ? C.text : C.textMid, textDecoration: done ? "none" : "none" }}>
                      {task.label}
                    </span>
                    {done && <span style={{ marginLeft: "auto", fontSize: "11px", color: currentMonth.color, fontWeight: "600" }}>DONE</span>}
                  </button>
                );
              })}
            </div>

            {/* Mood + reflection */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
              {/* Mood */}
              <div style={{ background: "white", border: `1px solid ${C.border}`, borderRadius: "10px", padding: "14px 18px" }}>
                <div style={{ fontSize: "10px", fontWeight: "700", color: C.textLight, letterSpacing: "0.1em", marginBottom: "12px", fontFamily: "'DM Mono', monospace" }}>🎯 HOW WELL DID I UNDERSTAND TODAY?</div>
                {MOODS.map(m => (
                  <button key={m.id} onClick={() => setMood(m.id)} style={{
                    display: "flex", alignItems: "center", gap: "10px", width: "100%",
                    padding: "9px 12px", marginBottom: "6px",
                    background: todayLog.mood === m.id ? m.color + "15" : C.surface,
                    border: `1px solid ${todayLog.mood === m.id ? m.color : C.border}`,
                    borderRadius: "8px", textAlign: "left", transition: "all 0.15s"
                  }}>
                    <span style={{ fontSize: "16px" }}>{m.emoji}</span>
                    <span style={{ fontSize: "13px", color: todayLog.mood === m.id ? m.color : C.textMid, fontWeight: todayLog.mood === m.id ? "600" : "400" }}>{m.label}</span>
                  </button>
                ))}
              </div>

              {/* Win */}
              <div style={{ background: "white", border: `1px solid ${C.border}`, borderRadius: "10px", padding: "14px 18px" }}>
                <div style={{ fontSize: "10px", fontWeight: "700", color: C.textLight, letterSpacing: "0.1em", marginBottom: "10px", fontFamily: "'DM Mono', monospace" }}>⚡ TODAY'S WIN</div>
                <textarea
                  value={todayLog.win || ""}
                  onChange={e => updateField("win", e.target.value)}
                  placeholder="What clicked for you today? One concept that now makes sense..."
                  style={{ width: "100%", border: `1px solid ${C.border}`, borderRadius: "8px", padding: "10px 12px", fontSize: "13px", color: C.text, resize: "none", height: "80px", outline: "none", background: C.surface, lineHeight: "1.6" }}
                />
                <div style={{ fontSize: "10px", fontWeight: "700", color: C.textLight, letterSpacing: "0.1em", margin: "10px 0 8px", fontFamily: "'DM Mono', monospace" }}>🚧 BLOCKER / CONFUSION</div>
                <textarea
                  value={todayLog.blocker || ""}
                  onChange={e => updateField("blocker", e.target.value)}
                  placeholder="What confused you? What will you re-study tomorrow?"
                  style={{ width: "100%", border: `1px solid ${C.border}`, borderRadius: "8px", padding: "10px 12px", fontSize: "13px", color: C.text, resize: "none", height: "70px", outline: "none", background: C.surface, lineHeight: "1.6" }}
                />
              </div>
            </div>

            {/* Concept field */}
            <div style={{ background: C.greenBg, border: `1px solid ${C.greenBorder}`, borderRadius: "10px", padding: "14px 18px" }}>
              <div style={{ fontSize: "10px", fontWeight: "700", color: C.green, letterSpacing: "0.1em", marginBottom: "8px", fontFamily: "'DM Mono', monospace" }}>✍️ EXPLAIN TODAY'S CONCEPT IN YOUR OWN WORDS</div>
              <p style={{ fontSize: "12px", color: C.textMid, marginBottom: "8px" }}>Write as if explaining to someone who has never coded. If you can write it simply, you understand it.</p>
              <textarea
                value={todayLog.concept || ""}
                onChange={e => updateField("concept", e.target.value)}
                placeholder="Today I learned that... It works by... A real example would be..."
                style={{ width: "100%", border: `1px solid ${C.greenBorder}`, borderRadius: "8px", padding: "10px 12px", fontSize: "13px", color: C.text, resize: "none", height: "90px", outline: "none", background: "white", lineHeight: "1.7" }}
              />
            </div>
          </div>
        )}

        {/* ===== PROGRESS TAB ===== */}
        {view === "progress" && (
          <div>
            {/* Stats row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "20px" }}>
              {[
                { n: `Day ${dayNum}`, l: "Current Day", sub: "of 150 total", color: currentMonth.color },
                { n: streak, l: "Day Streak", sub: streak >= 7 ? "🔥 Keep going!" : "Build the habit", color: "#F59E0B" },
                { n: totalDaysLogged, l: "Days Logged", sub: `${Math.round((totalDaysLogged / Math.min(dayNum, 150)) * 100)}% consistency`, color: C.green },
                { n: `${pct}%`, l: "Today Done", sub: `${tasksDone} of ${DAY_TASKS.length} tasks`, color: pct === 100 ? C.green : C.blue },
              ].map((s, i) => (
                <div key={i} style={{ background: "white", border: `1px solid ${C.border}`, borderRadius: "10px", padding: "16px 18px", textAlign: "center" }}>
                  <div style={{ fontSize: "28px", fontWeight: "700", color: s.color, fontFamily: "'DM Mono', monospace", lineHeight: 1 }}>{s.n}</div>
                  <div style={{ fontSize: "12px", fontWeight: "600", color: C.text, marginTop: "6px" }}>{s.l}</div>
                  <div style={{ fontSize: "11px", color: C.textLight, marginTop: "3px" }}>{s.sub}</div>
                </div>
              ))}
            </div>

            {/* Month progress */}
            <div style={{ background: "white", border: `1px solid ${C.border}`, borderRadius: "10px", padding: "18px 20px", marginBottom: "20px" }}>
              <div style={{ fontSize: "10px", fontWeight: "700", color: C.textLight, letterSpacing: "0.1em", marginBottom: "14px", fontFamily: "'DM Mono', monospace" }}>📊 MONTH-BY-MONTH PROGRESS</div>
              {(() => {
                let dayOffset = 0;
                return MONTHS.map(m => {
                  const monthStart = dayOffset;
                  const monthEnd = dayOffset + m.days;
                  dayOffset += m.days;
                  let pct = 0;
                  let status = "upcoming";
                  if (dayNum > monthEnd) { pct = 100; status = "complete"; }
                  else if (dayNum > monthStart) { pct = ((dayNum - monthStart) / m.days) * 100; status = "active"; }
                  return (
                    <div key={m.id} style={{ marginBottom: "12px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                          <span style={{ fontSize: "16px" }}>{m.icon}</span>
                          <span style={{ fontSize: "13px", fontWeight: "600", color: status === "upcoming" ? C.textLight : C.text }}>{m.title}</span>
                          {status === "active" && <span style={{ fontSize: "10px", fontWeight: "700", color: m.color, background: m.bg, border: `1px solid ${m.border}`, padding: "2px 7px", borderRadius: "4px", fontFamily: "'DM Mono', monospace" }}>ACTIVE</span>}
                          {status === "complete" && <span style={{ fontSize: "10px", fontWeight: "700", color: C.green, background: C.greenBg, border: `1px solid ${C.greenBorder}`, padding: "2px 7px", borderRadius: "4px", fontFamily: "'DM Mono', monospace" }}>✓ DONE</span>}
                        </div>
                        <span style={{ fontSize: "12px", color: status === "upcoming" ? C.textLight : C.textMid, fontFamily: "'DM Mono', monospace" }}>
                          {Math.round(pct)}% · {m.days} days
                        </span>
                      </div>
                      <div style={{ height: "8px", background: C.surface, borderRadius: "4px", overflow: "hidden" }}>
                        <div style={{ width: `${pct}%`, height: "100%", background: status === "complete" ? C.green : m.color, borderRadius: "4px", transition: "width 0.4s" }} />
                      </div>
                    </div>
                  );
                });
              })()}
            </div>

            {/* Activity grid — last 60 days */}
            <div style={{ background: "white", border: `1px solid ${C.border}`, borderRadius: "10px", padding: "18px 20px" }}>
              <div style={{ fontSize: "10px", fontWeight: "700", color: C.textLight, letterSpacing: "0.1em", marginBottom: "14px", fontFamily: "'DM Mono', monospace" }}>🟩 LAST 60 DAYS ACTIVITY</div>
              <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                {getLast60Days(logs).map((day, i) => {
                  const intensity = day.count === 0 ? 0 : day.count <= 2 ? 1 : day.count <= 4 ? 2 : 3;
                  const colors = ["#E2E8F0", "#BBF7D0", "#4ADE80", "#16A34A"];
                  const isToday = day.key === todayKey;
                  return (
                    <div key={i} title={`${day.date.toLocaleDateString("en-IN")} — ${day.count} tasks`} style={{
                      width: "14px", height: "14px", borderRadius: "3px",
                      background: colors[intensity],
                      border: isToday ? `2px solid ${C.blue}` : "none",
                      flexShrink: 0
                    }} />
                  );
                })}
              </div>
              <div style={{ display: "flex", gap: "8px", alignItems: "center", marginTop: "10px" }}>
                <span style={{ fontSize: "11px", color: C.textLight }}>Less</span>
                {["#E2E8F0", "#BBF7D0", "#4ADE80", "#16A34A"].map((c, i) => (
                  <div key={i} style={{ width: "12px", height: "12px", background: c, borderRadius: "2px" }} />
                ))}
                <span style={{ fontSize: "11px", color: C.textLight }}>More</span>
              </div>
            </div>
          </div>
        )}

        {/* ===== CURRICULUM TAB ===== */}
        {view === "curriculum" && (
          <div>
            <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
              {MONTHS.map(m => (
                <button key={m.id} onClick={() => setActiveMonth(m.id)} style={{
                  padding: "7px 14px", fontSize: "12px", fontWeight: "600",
                  background: activeMonth === m.id ? m.color : C.surface,
                  color: activeMonth === m.id ? "white" : C.textMid,
                  border: `1px solid ${activeMonth === m.id ? m.color : C.border}`,
                  borderRadius: "6px", transition: "all 0.15s"
                }}>{m.icon} {m.title}</button>
              ))}
            </div>

            {(() => {
              const m = MONTHS.find(x => x.id === activeMonth);
              return (
                <div>
                  <div style={{ background: m.bg, border: `1px solid ${m.border}`, borderRadius: "12px", padding: "18px 22px", marginBottom: "14px" }}>
                    <div style={{ fontSize: "11px", fontWeight: "700", color: m.color, letterSpacing: "0.1em", fontFamily: "'DM Mono', monospace', marginBottom: '6px" }}>
                      MONTH {m.num} · {m.days} DAYS · {m.icon} {m.title}
                    </div>
                    <div style={{ marginTop: "8px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
                      <div style={{ background: "white", border: `1px solid ${m.border}`, borderRadius: "8px", padding: "10px 14px", flex: 1, minWidth: "180px" }}>
                        <div style={{ fontSize: "10px", fontWeight: "700", color: m.color, marginBottom: "4px" }}>🏆 PROJECT</div>
                        <div style={{ fontSize: "14px", fontWeight: "600", color: C.text }}>{m.project}</div>
                      </div>
                      <div style={{ background: "white", border: `1px solid ${m.border}`, borderRadius: "8px", padding: "10px 14px", flex: 1, minWidth: "120px" }}>
                        <div style={{ fontSize: "10px", fontWeight: "700", color: m.color, marginBottom: "4px" }}>📅 DURATION</div>
                        <div style={{ fontSize: "14px", fontWeight: "600", color: C.text }}>{m.days} days · {m.weeks.length} weeks</div>
                      </div>
                    </div>
                  </div>

                  {m.weeks.map((w, i) => (
                    <div key={i} style={{ background: "white", border: `1px solid ${C.border}`, borderRadius: "10px", padding: "16px 18px", marginBottom: "10px" }}>
                      <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "12px" }}>
                        <span style={{ fontSize: "11px", fontWeight: "700", color: m.color, fontFamily: "'DM Mono', monospace" }}>WEEK {w.w}</span>
                        <h3 style={{ fontSize: "15px", fontWeight: "700", color: C.text }}>{w.focus}</h3>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
                        {w.concepts.map((c, j) => (
                          <div key={j} style={{ display: "flex", gap: "8px", padding: "7px 10px", background: C.surface, borderRadius: "6px" }}>
                            <span style={{ color: m.color, fontSize: "12px", flexShrink: 0 }}>✓</span>
                            <span style={{ fontSize: "12px", color: C.textMid, lineHeight: "1.5" }}>{c}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        )}

        {/* ===== HISTORY TAB ===== */}
        {view === "history" && (
          <div>
            <div style={{ fontSize: "10px", fontWeight: "700", color: C.textLight, letterSpacing: "0.1em", marginBottom: "14px", fontFamily: "'DM Mono', monospace" }}>
              📖 YOUR LEARNING LOG — LAST 30 ENTRIES
            </div>
            {Object.entries(logs)
              .sort(([a], [b]) => b.localeCompare(a))
              .slice(0, 30)
              .map(([date, log]) => {
                const taskCount = log.tasks ? Object.values(log.tasks).filter(Boolean).length : 0;
                const mood = MOODS.find(m => m.id === log.mood);
                const d = new Date(date);
                const dayN = getDayNumber(startDate) - Math.floor((new Date(todayKey) - d) / (1000 * 60 * 60 * 24));
                return (
                  <div key={date} style={{ background: "white", border: `1px solid ${C.border}`, borderRadius: "10px", padding: "14px 18px", marginBottom: "10px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                      <div>
                        <span style={{ fontSize: "12px", fontWeight: "700", color: C.textMid, fontFamily: "'DM Mono', monospace" }}>
                          {d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}
                        </span>
                        {dayN > 0 && <span style={{ fontSize: "10px", color: C.textLight, marginLeft: "8px" }}>Day {dayN}</span>}
                      </div>
                      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                        {mood && <span style={{ fontSize: "14px" }}>{mood.emoji}</span>}
                        <span style={{ fontSize: "11px", fontWeight: "700", color: taskCount >= 4 ? C.green : taskCount >= 2 ? C.amber : C.textLight, fontFamily: "'DM Mono', monospace" }}>
                          {taskCount}/{DAY_TASKS.length} tasks
                        </span>
                      </div>
                    </div>
                    {log.tasks && (
                      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: log.concept || log.win ? "10px" : "0" }}>
                        {DAY_TASKS.map(t => (
                          <span key={t.id} style={{
                            fontSize: "11px", padding: "2px 8px", borderRadius: "4px",
                            background: log.tasks[t.id] ? C.greenBg : C.surface,
                            color: log.tasks[t.id] ? C.green : C.textLight,
                            border: `1px solid ${log.tasks[t.id] ? C.greenBorder : C.border}`
                          }}>{t.icon} {t.label.split(" ").slice(0, 2).join(" ")}</span>
                        ))}
                      </div>
                    )}
                    {log.win && (
                      <div style={{ fontSize: "13px", color: C.textMid, lineHeight: "1.6", padding: "8px 12px", background: C.greenBg, borderRadius: "6px", marginBottom: "6px" }}>
                        <span style={{ fontWeight: "600", color: C.green }}>Win: </span>{log.win}
                      </div>
                    )}
                    {log.concept && (
                      <div style={{ fontSize: "13px", color: C.textMid, lineHeight: "1.6", padding: "8px 12px", background: C.blueBg, borderRadius: "6px" }}>
                        <span style={{ fontWeight: "600", color: C.blue }}>Learned: </span>{log.concept}
                      </div>
                    )}
                  </div>
                );
              })}
            {Object.keys(logs).length === 0 && (
              <div style={{ textAlign: "center", padding: "40px", color: C.textLight }}>
                <div style={{ fontSize: "32px", marginBottom: "10px" }}>📭</div>
                <p style={{ fontSize: "14px" }}>No logs yet. Complete today's checklist to start your history.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
