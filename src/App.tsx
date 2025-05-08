import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, Legend,
  ScatterChart, Scatter, ComposedChart, CartesianGrid, Brush
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";

const LIGHT_PALETTE = [
  "#1f2937", // dark slate
  "#2563eb", // blue-600
  "#4b5563", // gray-600
  "#ef4444", // red-500
  "#10b981", // green-500
  "#f59e0b", // amber-500
  "#8b5cf6", // violet-500
  "#ec4899", // pink-500
  "#3b82f6", // blue-500
  "#22d3ee", // cyan-400
  "#eab308"  // yellow-500
];

const DARK_PALETTE = [
  "#60a5fa", // blue-400
  "#f87171", // red-400
  "#34d399", // green-400
  "#fbbf24", // amber-400
  "#a78bfa", // violet-400
  "#f472b6", // pink-400
  "#38bdf8", // cyan-400
  "#facc15", // yellow-400
  "#64748b", // gray-500
  "#3b82f6", // blue-500
  "#22d3ee"  // cyan-400
];

const CHART_TYPES = [
  { value: "stacked bar", label: "Stacked Bar" },
  { value: "pie chart", label: "Pie Chart" },
  { value: "donut chart", label: "Donut Chart" },
  { value: "side by side bars", label: "Side by Side Bars" },
  { value: "dual combination", label: "Dual Combination" },
  { value: "area chart", label: "Area Chart" },
  { value: "box plot", label: "Box Plot" },
  { value: "scatter plot", label: "Scatter Plot" },
  { value: "line chart", label: "Line Chart" },
  { value: "packed bubbles", label: "Packed Bubbles" },
  { value: "horizontal bar", label: "Horizontal Bar" }
];

const NUM_QUESTIONS = 5;

type DashboardResult = {
  question: string;
  chartType: string;
  data: any[];
  columns: string[];
};

type Dashboard = {
  id: string;
  results: DashboardResult[];
  questions: string[];
  paletteIdx: number;
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function isChartTypeSuitable(type: string, data: any[], columns: string[]): boolean {
  if (!data.length) return false;
  const numericCols = columns.filter(col => typeof data[0][col] === "number");
  const catCols = columns.filter(col => typeof data[0][col] === "string");
  switch (type) {
    case "pie chart":
    case "donut chart":
    case "packed bubbles":
      return numericCols.length > 0 && catCols.length > 0;
    case "stacked bar":
    case "side by side bars":
    case "dual combination":
      return numericCols.length >= 2 && catCols.length > 0;
    case "area chart":
    case "line chart":
      return numericCols.length > 0 && columns.length > 1;
    case "box plot":
      return numericCols.length > 0;
    case "scatter plot":
      return numericCols.length >= 2;
    case "horizontal bar":
      return numericCols.length > 0 && catCols.length > 0;
    default:
      return true;
  }
}

function ChartRenderer({
  chartType, data, columns, palette, dark
}: DashboardResult & { chartType: string, palette: string[], dark: boolean }) {
  const type = chartType.toLowerCase();
  const numericCols = columns.filter(col => typeof data[0]?.[col] === "number");
  const catCols = columns.filter(col => typeof data[0]?.[col] === "string");
  const pieDataKey = numericCols[0] || columns[1];
  const pieNameKey = catCols[0] || columns[0];
  const xKey = columns[0];
  const yKey = numericCols[0] || columns[1];

  switch (type) {
    case "pie chart":
      return (
        <ResponsiveContainer width="100%" height={140}>
          <PieChart>
            <Pie data={data} dataKey={pieDataKey} nameKey={pieNameKey} cx="50%" cy="50%" outerRadius={60} label>
              {data.map((_, idx) => <Cell key={idx} fill={palette[idx % palette.length]} />)}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      );
    case "donut chart":
      return (
        <ResponsiveContainer width="100%" height={140}>
          <PieChart>
            <Pie data={data} dataKey={pieDataKey} nameKey={pieNameKey} cx="50%" cy="50%" innerRadius={35} outerRadius={60} label>
              {data.map((_, idx) => <Cell key={idx} fill={palette[idx % palette.length]} />)}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      );
    case "line chart":
      return (
        <ResponsiveContainer width="100%" height={140}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={dark ? "#4b5563" : "#e0e7ff"} />
            <XAxis dataKey={xKey} stroke={dark ? "#f3f4f6" : "#1e293b"} />
            <YAxis stroke={dark ? "#f3f4f6" : "#1e293b"} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey={yKey} stroke={palette[0]} strokeWidth={3} dot={{ r: 5 }} />
            <Brush dataKey={xKey} height={20} stroke={palette[1]} />
          </LineChart>
        </ResponsiveContainer>
      );
    case "area chart":
      return (
        <ResponsiveContainer width="100%" height={140}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={dark ? "#4b5563" : "#e0e7ff"} />
            <XAxis dataKey={xKey} stroke={dark ? "#f3f4f6" : "#1e293b"} />
            <YAxis stroke={dark ? "#f3f4f6" : "#1e293b"} />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey={yKey} stroke={palette[0]} fill={palette[1]} fillOpacity={0.5} />
            <Brush dataKey={xKey} height={20} stroke={palette[1]} />
          </AreaChart>
        </ResponsiveContainer>
      );
    case "stacked bar":
      return (
        <ResponsiveContainer width="100%" height={140}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={dark ? "#4b5563" : "#e0e7ff"} />
            <XAxis dataKey={xKey} stroke={dark ? "#f3f4f6" : "#1e293b"} />
            <YAxis stroke={dark ? "#f3f4f6" : "#1e293b"} />
            <Tooltip />
            <Legend />
            {numericCols.slice(0, 2).map((col, idx) => (
              <Bar key={col} dataKey={col} stackId="a" fill={palette[idx]} />
            ))}
            <Brush dataKey={xKey} height={20} stroke={palette[1]} />
          </BarChart>
        </ResponsiveContainer>
      );
    case "side by side bars":
      return (
        <ResponsiveContainer width="100%" height={140}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={dark ? "#4b5563" : "#e0e7ff"} />
            <XAxis dataKey={xKey} stroke={dark ? "#f3f4f6" : "#1e293b"} />
            <YAxis stroke={dark ? "#f3f4f6" : "#1e293b"} />
            <Tooltip />
            <Legend />
            {numericCols.slice(0, 2).map((col, idx) => (
              <Bar key={col} dataKey={col} fill={palette[idx]} />
            ))}
            <Brush dataKey={xKey} height={20} stroke={palette[1]} />
          </BarChart>
        </ResponsiveContainer>
      );
    case "dual combination":
      return (
        <ResponsiveContainer width="100%" height={140}>
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={dark ? "#4b5563" : "#e0e7ff"} />
            <XAxis dataKey={xKey} stroke={dark ? "#f3f4f6" : "#1e293b"} />
            <YAxis stroke={dark ? "#f3f4f6" : "#1e293b"} />
            <Tooltip />
            <Legend />
            <Bar dataKey={numericCols[0]} fill={palette[0]} />
            <Line type="monotone" dataKey={numericCols[1] || numericCols[0]} stroke={palette[1]} />
            <Brush dataKey={xKey} height={20} stroke={palette[1]} />
          </ComposedChart>
        </ResponsiveContainer>
      );
    case "box plot":
      return <div style={{ padding: 20, color: dark ? "#f3f4f6" : "#1e293b" }}>Box plot not implemented</div>;
    case "scatter plot":
      return (
        <ResponsiveContainer width="100%" height={140}>
          <ScatterChart>
            <CartesianGrid stroke={dark ? "#4b5563" : "#e0e7ff"} />
            <XAxis dataKey={numericCols[0]} name={numericCols[0]} stroke={dark ? "#f3f4f6" : "#1e293b"} />
            <YAxis dataKey={numericCols[1]} name={numericCols[1]} stroke={dark ? "#f3f4f6" : "#1e293b"} />
            <Tooltip />
            <Legend />
            <Scatter data={data} fill={palette[0]} />
          </ScatterChart>
        </ResponsiveContainer>
      );
    case "packed bubbles":
      return (
        <ResponsiveContainer width="100%" height={140}>
          <PieChart>
            <Pie data={data} dataKey={pieDataKey} nameKey={pieNameKey} cx="50%" cy="50%" outerRadius={60} label>
              {data.map((_, idx) => <Cell key={idx} fill={palette[idx % palette.length]} />)}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      );
    case "horizontal bar":
      return (
        <ResponsiveContainer width="100%" height={140}>
          <BarChart data={data} layout="vertical">
            <CartesianGrid stroke={dark ? "#4b5563" : "#e0e7ff"} />
            <XAxis type="number" stroke={dark ? "#f3f4f6" : "#1e293b"} />
            <YAxis dataKey={xKey} type="category" stroke={dark ? "#f3f4f6" : "#1e293b"} />
            <Tooltip />
            <Bar dataKey={yKey} fill={palette[0]} />
          </BarChart>
        </ResponsiveContainer>
      );
    default:
      return <div style={{ padding: 20, color: dark ? "#f3f4f6" : "#1e293b" }}>Chart type not supported</div>;
  }
}

function App() {
  const [questions, setQuestions] = useState<string[]>(Array(NUM_QUESTIONS).fill(""));
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [dark, setDark] = useState(false);

  const [toast, setToast] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  const [pageLoaded, setPageLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => setPageLoaded(true), 350);
  }, []);

  useEffect(() => {
    document.body.style.background = dark
      ? "linear-gradient(120deg, #181f3a 0%, #232946 100%)"
      : "linear-gradient(120deg, #fff 0%, #fff 100%)"; // white top gap
  }, [dark]);

  function pickUniqueChartTypes(results: any[]): string[] {
    const assigned: string[] = [];
    for (let i = 0; i < results.length; i++) {
      const suitable = CHART_TYPES.find(ct => isChartTypeSuitable(ct.value, results[i].data, results[i].columns) && !assigned.includes(ct.value));
      assigned.push(suitable?.value || "bar chart");
    }
    return assigned;
  }

  const handleInputChange = (idx: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[idx] = value;
    setQuestions(newQuestions);
  };

  const handleChartTypeChange = (dashboardIdx: number, chartIdx: number, newType: string) => {
    setDashboards(prev => {
      const copy = [...prev];
      copy[dashboardIdx] = {
        ...copy[dashboardIdx],
        results: copy[dashboardIdx].results.map((res, idx) =>
          idx === chartIdx ? { ...res, chartType: newType } : res
        )
      };
      return copy;
    });
  };

  const handleGenerateDashboard = async () => {
    setError("");
    if (questions.some(q => !q.trim())) {
      setError("Please fill in all 5 questions.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inputs: questions }),
      });
      const data = await response.json();
      if (response.ok && Array.isArray(data)) {
        const chartTypes = pickUniqueChartTypes(data);
        const paletteIdx = dark ? 1 : 0;
        setDashboards([
          {
            id: uuidv4(),
            results: data.map((res: any, idx: number) => ({
              question: res.question,
              chartType: chartTypes[idx] || "bar chart",
              data: res.data,
              columns: res.columns
            })),
            questions: [...questions],
            paletteIdx
          },
          ...dashboards,
        ]);
        setQuestions(Array(NUM_QUESTIONS).fill(""));
        setActiveTab(1);
        showToast("✨ Dashboard generated!");
      } else if (data && data.error) {
        setError(data.error);
      } else {
        setError("Unexpected response from backend.");
      }
    } catch (err: any) {
      setError("Could not connect to backend.");
    }
    setLoading(false);
  };

  const fadeInVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
  };

  const slideInVariant = {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7 } }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        color: dark ? "#E0F2FE" : "#232946",
        background: dark
          ? "linear-gradient(120deg, #181f3a 0%, #232946 100%)"
          : "linear-gradient(120deg, #fff 0%, #fff 100%)",
        transition: "background 0.5s, color 0.5s"
      }}
    >
      {/* Dark/Light Mode Toggle */}
      <button
        onClick={() => setDark(d => !d)}
        style={{
          position: "fixed",
          top: 24,
          right: 24,
          zIndex: 1000,
          background: dark ? "#222b4b" : "#E0F2FE",
          color: dark ? "#FFD93D" : "#3B82F6",
          border: "none",
          borderRadius: "50%",
          width: 48,
          height: 48,
          fontSize: 22,
          cursor: "pointer",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          transition: "background 0.5s, color 0.5s"
        }}
        title="Toggle dark/light mode"
      >
        {dark ? "🌙" : "🌞"}
      </button>

      {/* Toast notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            style={{
              position: "fixed",
              bottom: 40,
              right: 40,
              background: "#3B82F6",
              color: "#fff",
              padding: "14px 32px",
              borderRadius: 10,
              fontWeight: 700,
              fontSize: 16,
              zIndex: 1001,
              boxShadow: "0 2px 12px rgba(59,130,246,0.18)"
            }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header with white gap on top */}
      <div style={{ height: 16, backgroundColor: "#fff" }} /> {/* 1 inch white gap */}
      <div
        style={{
          background: "linear-gradient(90deg, #e0f2fe 0%, #bae6fd 100%)",
          padding: "104px 0 80px 0",
          textAlign: "center",
          borderBottom: "1px solid #dbeafe",
          marginBottom: 40,
          boxShadow: "0 2px 16px rgba(59,130,246,0.04)"
        }}
      >
        <motion.h1
          style={{
            fontSize: "3.5rem",
            fontWeight: 900,
            color: "#0a2259",
            letterSpacing: "-1px",
            marginBottom: 16,
            marginTop: 0,
            lineHeight: 1.1,
            cursor: "default"
          }}
          animate={{
            y: [0, -15, 0, 15, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut"
          }}
        >
          NL2SQL
        </motion.h1>
        <div
          style={{
            fontSize: "1.32rem",
            color: "#0a2259",
            fontWeight: 500,
            maxWidth: 700,
            margin: "0 auto"
          }}
        >
          This NL2SQL translates natural language questions into queries and visualizes the result with intelligent chart suggestion
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 16px" }}>
        <div style={{ display: "flex", gap: 16, marginBottom: 32 }}>
          <button
            onClick={() => setActiveTab(0)}
            style={{
              flex: 1,
              padding: "12px 0",
              border: "none",
              borderRadius: 8,
              background: activeTab === 0 ? "#3B82F6" : "#e0e7ef",
              color: activeTab === 0 ? "#fff" : "#232946",
              fontWeight: 700,
              fontSize: 16,
              cursor: "pointer",
              boxShadow: activeTab === 0 ? "0 2px 8px rgba(59,130,246,0.16)" : undefined,
              transition: "background 0.3s, color 0.3s"
            }}
          >
            Ask Questions
          </button>
          <button
            onClick={() => setActiveTab(1)}
            style={{
              flex: 1,
              padding: "12px 0",
              border: "none",
              borderRadius: 8,
              background: activeTab === 1 ? "#3B82F6" : "#e0e7ef",
              color: activeTab === 1 ? "#fff" : "#232946",
              fontWeight: 700,
              fontSize: 16,
              cursor: "pointer",
              boxShadow: activeTab === 1 ? "0 2px 8px rgba(59,130,246,0.16)" : undefined,
              transition: "background 0.3s, color 0.3s"
            }}
          >
            Dashboards
          </button>
        </div>

        {/* Question Input Tab */}
        {activeTab === 0 && (
          <motion.div
            initial="hidden"
            animate={pageLoaded ? "visible" : "hidden"}
            variants={fadeInVariant}
            style={{
              background: dark ? "#232946" : "#fff",
              borderRadius: 14,
              boxShadow: "0 2px 16px rgba(59,130,246,0.08)",
              padding: 32,
              marginBottom: 32
            }}
          >
            <h2 style={{ fontWeight: 700, fontSize: 22, marginBottom: 24, color: dark ? "#E0F2FE" : "#232946" }}>
              Enter 5 questions about your data
            </h2>
            {questions.map((q, idx) => (
              <div key={idx} style={{ marginBottom: 18 }}>
                <label style={{ fontWeight: 500, color: "#2563eb", fontSize: 15 }}>
                  Question {idx + 1}
                </label>
                <input
                  type="text"
                  value={q}
                  onChange={e => handleInputChange(idx, e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: 8,
                    border: "1px solid #dbeafe",
                    marginTop: 6,
                    fontSize: 16,
                    color: "#232946",
                    background: "#f8fafc"
                  }}
                  placeholder="E.g. What was the sales trend in 2024?"
                  disabled={loading}
                />
              </div>
            ))}
            {error && <div style={{ color: "#e53935", marginTop: 8 }}>{error}</div>}
            <button
              onClick={handleGenerateDashboard}
              disabled={loading}
              style={{
                marginTop: 20,
                padding: "14px 36px",
                background: "#3B82F6",
                color: "#fff",
                fontWeight: 700,
                fontSize: 17,
                border: "none",
                borderRadius: 8,
                boxShadow: "0 2px 8px rgba(59,130,246,0.09)",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
                transition: "opacity 0.3s"
              }}
            >
              {loading ? "Generating..." : "Generate Dashboard"}
            </button>
          </motion.div>
        )}

        {/* Dashboard Tab */}
        {activeTab === 1 && (
          <motion.div
            initial="hidden"
            animate={pageLoaded ? "visible" : "hidden"}
            variants={slideInVariant}
            style={{
              marginBottom: 32
            }}
          >
            {dashboards.length === 0 ? (
              <div style={{ color: "#64748b", fontWeight: 500, fontSize: 18, textAlign: "center", marginTop: 40 }}>
                No dashboards yet. Ask questions to generate your first dashboard!
              </div>
            ) : (
              dashboards.map((dashboard, dIdx) => (
                <div
                  key={dashboard.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 24,
                    background: dark ? "#181f3a" : "#f4f6fa",
                    borderRadius: 24,
                    padding: 32,
                    boxShadow: dark
                      ? "0 8px 32px 0 #1a2a4d, 0 0px 1px #3B82F6"
                      : "0 2px 24px rgba(59,130,246,0.06)",
                    border: dark ? "1px solid #293366" : "1px solid #e5eaf5",
                    marginBottom: 36,
                    marginTop: 0,
                  }}
                >
                  {dashboard.results.map((res, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: dark
                          ? "linear-gradient(120deg, #222b4b 0%, #232946 100%)"
                          : "#fff",
                        borderRadius: 16,
                        padding: 18,
                        boxShadow: dark
                          ? "0 2px 24px #3B82F6, 0 0px 1px #3B82F6"
                          : "0 1px 8px rgba(59,130,246,0.09)",
                        border: dark ? "1px solid #3B82F6" : "1px solid #e5eaf5",
                        minWidth: 0,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "background 0.5s, box-shadow 0.5s"
                      }}
                    >
                      <div style={{ fontWeight: 600, color: "#2563eb", marginBottom: 8, fontSize: 15, alignSelf: "flex-start" }}>
                        {res.question}
                      </div>
                      <div style={{ marginBottom: 6, color: "#64748b", fontSize: 13, alignSelf: "flex-start" }}>
                        Chart type:
                        <select
                          value={res.chartType}
                          onChange={e => handleChartTypeChange(dIdx, idx, e.target.value)}
                          style={{
                            marginLeft: 6,
                            fontSize: 13,
                            padding: "2px 8px",
                            borderRadius: 6,
                            border: "1px solid #bcd3f7",
                            background: dark ? "#232946" : "#f0f6ff",
                            color: dark ? "#fff" : "#232946"
                          }}
                        >
                          {CHART_TYPES.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      </div>
                      <ChartRenderer
                        chartType={res.chartType}
                        data={res.data}
                        columns={res.columns}
                        palette={dark ? DARK_PALETTE : LIGHT_PALETTE}
                        dark={dark}
                      />
                    </div>
                  ))}
                </div>
              ))
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default App;
