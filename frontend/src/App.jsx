import { useEffect, useState } from "react";
import {
  Search, Home, MessageSquare, BookOpen, Award, FlaskConical,
  Star, Bookmark, ChevronRight, ThumbsUp, ThumbsDown, Upload,
  Database, Shield, Activity, FileText, Globe, Menu, X,
  ChevronDown, ExternalLink, Check, AlertCircle, Clock,
  Filter, MapPin, Phone, ArrowRight, RefreshCw, Bell,
  BarChart2, Users, Settings, LogOut, HelpCircle, Layers
} from "lucide-react";

// ── DESIGN TOKENS ─────────────────────────────────────────────────────────────
const C = {
  navy:        "#1B3A6B",
  navyDark:    "#0F2844",
  navyLight:   "#EEF2F9",
  red:         "#C8102E",
  redLight:    "#FEF2F2",
  surface:     "#F7F8FA",
  card:        "#FFFFFF",
  border:      "#E1E5EC",
  borderMid:   "#C9D0DC",
  text:        "#1F2937",
  textMid:     "#4B5563",
  textDim:     "#9CA3AF",
  green:       "#16A34A",
  greenLight:  "#F0FDF4",
  amber:       "#B45309",
  amberLight:  "#FFFBEB",
  link:        "#2563EB",
};

// ── SHARED MICRO-COMPONENTS ───────────────────────────────────────────────────

// The signature element: IS Standard number rendered as a certification stamp
function ISBadge({ code, size = "sm" }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center",
      background: C.navy, color: "white",
      fontSize: size === "sm" ? 11 : 13,
      fontWeight: 700,
      padding: size === "sm" ? "2px 7px" : "4px 10px",
      borderRadius: 3,
      fontFamily: "'Courier New', monospace",
      letterSpacing: "0.06em",
      border: `1.5px solid ${C.navyDark}`,
    }}>
      {code}
    </span>
  );
}

function Tag({ children, color = C.navy }) {
  return (
    <span style={{
      display: "inline-block",
      background: color + "18",
      color,
      border: `1px solid ${color}33`,
      fontSize: 11, fontWeight: 600,
      padding: "2px 8px", borderRadius: 4,
    }}>{children}</span>
  );
}

function Btn({ children, variant = "primary", onClick, small, icon: Icon }) {
  const isPrimary   = variant === "primary";
  const isSecondary = variant === "secondary";
  const isGhost     = variant === "ghost";
  return (
    <button onClick={onClick} style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: small ? "6px 14px" : "9px 20px",
      borderRadius: 6,
      fontSize: small ? 12 : 14,
      fontWeight: 600,
      cursor: "pointer",
      border: isPrimary ? "none" : `1.5px solid ${isSecondary ? C.borderMid : "transparent"}`,
      background: isPrimary ? C.navy : isSecondary ? C.card : "transparent",
      color: isPrimary ? "white" : C.text,
      transition: "opacity .15s",
    }}>
      {Icon && <Icon size={small ? 13 : 15} />}
      {children}
    </button>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{
      fontSize: 10, fontWeight: 700, letterSpacing: "0.12em",
      color: C.textDim, textTransform: "uppercase", marginBottom: 8,
    }}>{children}</div>
  );
}

function ConfidencePill({ score, sources }) {
  const color = score == null ? C.navy : score >= 85 ? C.green : score >= 65 ? C.amber : C.red;
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      background: C.surface, border: `1px solid ${C.border}`,
      borderRadius: 20, padding: "4px 10px",
    }}>
      <div style={{
        width: 7, height: 7, borderRadius: "50%", background: color, flexShrink: 0,
      }} />
      <span style={{ fontSize: 11, color: C.textMid, fontWeight: 500 }}>
        Based on {sources} retrieved BIS sources
      </span>
    </div>
  );
}

// ── HEADER ────────────────────────────────────────────────────────────────────
function Header({ screen, setScreen }) {
  const [langOpen, setLangOpen] = useState(false);
  const langs = ["English", "हिंदी", "தமிழ்", "తెలుగు", "मराठी", "বাংলা"];
  const navItems = [
    { id: "home", label: "Home" },
    { id: "standards", label: "Standards" },
    { id: "labs", label: "Laboratories" },
    { id: "services", label: "Services" },
  ];

  return (
    <header style={{
      background: C.navyDark,
      borderBottom: `3px solid ${C.red}`,
      position: "sticky", top: 0, zIndex: 100,
    }}>
      <div style={{
        maxWidth: 1280, margin: "0 auto",
        padding: "0 24px",
        display: "flex", alignItems: "center", gap: 32, height: 60,
      }}>
        {/* Logo */}
        <button onClick={() => setScreen("home")} style={{
          display: "flex", alignItems: "center", gap: 10,
          background: "none", border: "none", cursor: "pointer",
          flexShrink: 0,
        }}>
          <div style={{
            width: 34, height: 34,
            background: C.red,
            borderRadius: 4,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ color: "white", fontSize: 13, fontWeight: 800 }}>BIS</span>
          </div>
          <div>
            <div style={{ color: "white", fontWeight: 700, fontSize: 14, lineHeight: 1.2 }}>
              BIS Intelligent Assistant
            </div>
            <div style={{ color: "#93A8C9", fontSize: 10, lineHeight: 1 }}>
              Bureau of Indian Standards
            </div>
          </div>
        </button>

        {/* Nav */}
        <nav style={{ display: "flex", gap: 4, flex: 1 }}>
          {navItems.map(n => (
            <button key={n.id} onClick={() => setScreen(n.id)} style={{
              background: screen === n.id ? "rgba(255,255,255,.1)" : "none",
              border: "none", cursor: "pointer",
              color: screen === n.id ? "white" : "#93A8C9",
              fontSize: 13, fontWeight: screen === n.id ? 600 : 400,
              padding: "6px 12px", borderRadius: 4,
              transition: "all .15s",
            }}>{n.label}</button>
          ))}
        </nav>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* Language */}
          <div style={{ position: "relative" }}>
            <button onClick={() => setLangOpen(!langOpen)} style={{
              display: "flex", alignItems: "center", gap: 4,
              background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.15)",
              borderRadius: 4, padding: "5px 10px",
              color: "#B8CDE8", fontSize: 12, cursor: "pointer",
            }}>
              <Globe size={13} />
              English
              <ChevronDown size={11} />
            </button>
            {langOpen && (
              <div style={{
                position: "absolute", right: 0, top: "100%", marginTop: 4,
                background: C.card, border: `1px solid ${C.border}`,
                borderRadius: 6, boxShadow: "0 8px 24px rgba(0,0,0,.12)",
                minWidth: 140, zIndex: 200,
              }}>
                {langs.map(l => (
                  <button key={l} onClick={() => setLangOpen(false)} style={{
                    display: "block", width: "100%", textAlign: "left",
                    padding: "8px 14px", fontSize: 13, color: C.text,
                    background: "none", border: "none", cursor: "pointer",
                  }}>{l}</button>
                ))}
              </div>
            )}
          </div>

          <button onClick={() => setScreen("admin")} style={{
            background: "rgba(255,255,255,.08)",
            border: "1px solid rgba(255,255,255,.15)",
            borderRadius: 4, padding: "5px 10px",
            color: "#B8CDE8", fontSize: 12, cursor: "pointer",
          }}>Admin</button>

          <button onClick={() => setScreen("chat")} style={{
            background: C.red, border: "none",
            borderRadius: 5, padding: "6px 14px",
            color: "white", fontSize: 13, fontWeight: 600,
            cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
          }}>
            <MessageSquare size={13} />
            Ask BIS
          </button>
        </div>
      </div>
    </header>
  );
}

// ── SCREEN 1: HOME ────────────────────────────────────────────────────────────
function HomeScreen({ setScreen, setChatQuery }) {
  const [query, setQuery] = useState("");
  const examples = [
    "Which BIS standard applies to my product?",
    "How do I get BIS certification?",
    "Which laboratory can test my product?",
    "What are the hallmarking requirements for gold?",
    "How to renew a BIS licence?",
    "What does IS 9000 cover?",
  ];
  const services = [
    { icon: Award, label: "Product Certification", desc: "ISI mark & licence" },
    { icon: Star, label: "Hallmarking", desc: "Gold, silver, platinum" },
    { icon: FlaskConical, label: "Laboratory Recognition", desc: "NABL & BIS labs" },
    { icon: BookOpen, label: "Standards", desc: "IS catalogue & access" },
    { icon: Users, label: "Consumer Services", desc: "Grievances & awareness" },
    { icon: Shield, label: "Conformity Assessment", desc: "Testing & inspection" },
  ];

  const handleAsk = (q) => {
    const text = q || query;
    if (!text.trim()) return;
    setChatQuery(text);
    setScreen("chat");
  };

  return (
    <div style={{ background: C.surface, minHeight: "calc(100vh - 63px)" }}>
      {/* Hero */}
      <div style={{
        background: C.navyDark,
        padding: "72px 24px 80px",
        textAlign: "center",
      }}>
        <div style={{
          display: "inline-block",
          background: "rgba(200,16,46,.15)",
          border: "1px solid rgba(200,16,46,.3)",
          borderRadius: 20,
          padding: "4px 14px",
          color: "#F4A7B3",
          fontSize: 11, fontWeight: 600, letterSpacing: "0.08em",
          marginBottom: 20,
        }}>
          OFFICIAL BIS AI KNOWLEDGE ASSISTANT
        </div>

        <h1 style={{
          color: "white", fontSize: 40, fontWeight: 800,
          lineHeight: 1.2, margin: "0 0 12px",
          letterSpacing: "-0.02em",
        }}>
          Understand Indian Standards.<br />
          <span style={{ color: "#7FA8DB" }}>Get reliable BIS guidance.</span>
        </h1>
        <p style={{
          color: "#93A8C9", fontSize: 16, margin: "0 auto 40px",
          maxWidth: 520, lineHeight: 1.6,
        }}>
          Ask in plain language about standards, certification, hallmarking,
          testing labs, or any BIS service.
        </p>

        {/* Search bar */}
        <div style={{
          maxWidth: 680, margin: "0 auto",
          background: C.card,
          borderRadius: 10,
          border: `2px solid rgba(255,255,255,.15)`,
          display: "flex", alignItems: "center",
          boxShadow: "0 8px 32px rgba(0,0,0,.3)",
          overflow: "hidden",
        }}>
          <Search size={20} style={{ marginLeft: 18, color: C.textDim, flexShrink: 0 }} />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleAsk()}
            placeholder="Ask about Indian Standards, certification, hallmarking, testing, or BIS services..."
            style={{
              flex: 1, border: "none", outline: "none",
              padding: "18px 14px",
              fontSize: 15, color: C.text,
              background: "transparent",
            }}
          />
          <button onClick={() => handleAsk()} style={{
            background: C.red,
            border: "none",
            padding: "12px 24px",
            color: "white", fontSize: 14, fontWeight: 600,
            cursor: "pointer", margin: 6, borderRadius: 6,
            display: "flex", alignItems: "center", gap: 6,
          }}>
            <ArrowRight size={16} />
            Ask
          </button>
        </div>

        {/* Trust */}
        <div style={{
          display: "flex", alignItems: "center", gap: 6,
          justifyContent: "center", marginTop: 16,
          color: "#6B8CAE", fontSize: 12,
        }}>
          <Shield size={13} />
          Answers are based on authorised BIS knowledge sources with citations.
        </div>
      </div>

      {/* Examples */}
      <div style={{
        maxWidth: 900, margin: "0 auto",
        padding: "40px 24px 0",
      }}>
        <SectionLabel>Common Questions</SectionLabel>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 10,
        }}>
          {examples.map((ex, i) => (
            <button key={i} onClick={() => handleAsk(ex)} style={{
              background: C.card,
              border: `1px solid ${C.border}`,
              borderRadius: 8,
              padding: "12px 16px",
              display: "flex", alignItems: "center", gap: 10,
              cursor: "pointer", textAlign: "left",
              transition: "border-color .15s, box-shadow .15s",
              color: C.text,
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%",
                background: C.navyLight,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <MessageSquare size={13} style={{ color: C.navy }} />
              </div>
              <span style={{ fontSize: 13, lineHeight: 1.4 }}>{ex}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Quick services */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px" }}>
        <SectionLabel>BIS Services</SectionLabel>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
          gap: 10,
        }}>
          {services.map((s, i) => (
            <button key={i} onClick={() => setScreen("services")} style={{
              background: C.card,
              border: `1px solid ${C.border}`,
              borderRadius: 8, padding: "18px 14px",
              cursor: "pointer", textAlign: "center",
              display: "flex", flexDirection: "column",
              alignItems: "center", gap: 8,
            }}>
              <div style={{
                width: 38, height: 38, borderRadius: 8,
                background: C.navyLight,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <s.icon size={18} style={{ color: C.navy }} />
              </div>
              <div style={{ fontSize: 12, fontWeight: 600, color: C.text }}>{s.label}</div>
              <div style={{ fontSize: 11, color: C.textDim }}>{s.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Footer strip */}
      <div style={{
        borderTop: `1px solid ${C.border}`,
        background: C.card,
        padding: "16px 24px",
        textAlign: "center",
      }}>
        <span style={{ fontSize: 12, color: C.textDim }}>
          Bureau of Indian Standards, Ministry of Consumer Affairs, Food & Public Distribution, Government of India
          &nbsp;·&nbsp; This assistant provides guidance only — refer to official BIS publications for compliance.
        </span>
      </div>
    </div>
  );
}

// ── SCREEN 2: AI CHAT ─────────────────────────────────────────────────────────
const SAMPLE_CHAT = [
  {
    role: "user",
    content: "How do I get BIS certification for my electrical product?",
  },
  {
    role: "ai",
    content: {
      summary: "BIS product certification for electrical products is obtained through the Product Certification Scheme under Section 14 of the BIS Act, 2016. The process follows four main stages.",
      sections: [
        {
          heading: "Application",
          body: "Submit an application through BIS online portal (manakonline.in) with product specifications, technical drawings, and applicable IS standard details. Pay the prescribed fee schedule.",
        },
        {
          heading: "Factory Assessment",
          body: "BIS will conduct a factory inspection to verify manufacturing capability, quality control systems, and in-house testing facilities align with the identified IS standard.",
        },
        {
          heading: "Product Testing",
          body: "Product samples are tested at a BIS-recognised laboratory against all requirements of the applicable IS standard. Test reports must confirm full conformance.",
        },
        {
          heading: "Licence Grant",
          body: "Upon satisfactory assessment and testing, a BIS licence is issued. The ISI Mark may then be applied on products. Licence is valid for one year and renewable annually.",
        },
      ],
      standards: [
        { code: "IS 9000", title: "Basic Environment Testing Procedures for Electronic & Electrical Items" },
        { code: "IS 302-1", title: "Safety of Household & Similar Electrical Appliances — General Requirements" },
      ],
      sources: [
        { label: "BIS Product Certification Guidelines", clause: "Section 14, BIS Act 2016", type: "Act" },
        { label: "Scheme-I: ISI Mark Scheme", clause: "Chapter 3 — Application Procedure", type: "Guidelines" },
        { label: "IS 302-1:2019", clause: "Clause 5 — General Conditions", type: "Standard" },
      ],
      confidence: 91,
      sourceCount: 3,
    },
  },
  {
    role: "user",
    content: "What fee structure applies for an electrical appliance application?",
  },
  {
    role: "ai",
    content: {
      summary: "BIS fees for product certification consist of an application fee, grant fee, and annual surveillance fee. Exact amounts depend on product category and turnover.",
      sections: [
        {
          heading: "Fee Components",
          body: "Application fee (one-time), testing charges (laboratory dependent), grant fee on licence issue, and annual marking fee based on quantity of ISI-marked products.",
        },
        {
          heading: "Current Schedule",
          body: "Refer to the BIS Fee Schedule (2023 revision) on the BIS website for exact amounts. Fees are revised periodically and vary by product category.",
        },
      ],
      standards: [],
      sources: [
        { label: "BIS Fee Schedule 2023", clause: "Annexure-II", type: "Official" },
      ],
      confidence: 74,
      sourceCount: 1,
    },
  },
];

function ChatMessage({ msg }) {
  const [feedback, setFeedback] = useState(null);
  if (msg.role === "user") {
    return (
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 20 }}>
        <div style={{
          background: C.navy, color: "white",
          borderRadius: "12px 12px 3px 12px",
          padding: "12px 16px", maxWidth: "65%",
          fontSize: 14, lineHeight: 1.6,
        }}>
          {msg.content}
        </div>
      </div>
    );
  }
  const c = msg.content;
  return (
    <div style={{ marginBottom: 28 }}>
      {/* AI bubble */}
      <div style={{
        background: C.card,
        border: `1px solid ${C.border}`,
        borderRadius: "3px 12px 12px 12px",
        padding: "18px 20px",
        maxWidth: "85%",
      }}>
        {/* Summary / Loading */}
        {msg.loading ? (
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            fontSize: 13, color: C.textMid,
            marginBottom: 4,
          }}>
            <div style={{
              width: 16, height: 16, borderRadius: "50%",
              border: `2px solid ${C.navyLight}`,
              borderTopColor: C.navy,
              animation: "spin 1s linear infinite",
              flexShrink: 0,
            }} />
            {c.summary}
          </div>
        ) : (
          <p style={{
            fontSize: 14, lineHeight: 1.7, color: C.text,
            margin: "0 0 16px",
            fontWeight: 500,
          }}>{c.summary}</p>
        )}

        {/* Sections */}
        {(c.sections || []).map((s, i) => (
          <div key={i} style={{
            borderLeft: `3px solid ${C.navyLight}`,
            paddingLeft: 12, marginBottom: 12,
          }}>
            <div style={{
              fontSize: 11, fontWeight: 700, color: C.navy,
              textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 3,
            }}>{s.heading}</div>
            <p style={{ fontSize: 13, color: C.textMid, margin: 0, lineHeight: 1.6 }}>
              {s.body}
            </p>
          </div>
        ))}

        {/* Applicable Standards */}
        {(c.standards || []).length > 0 && (
          <div style={{
            background: C.navyLight,
            borderRadius: 6,
            padding: "10px 14px",
            marginTop: 14, marginBottom: 14,
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.navy,
              letterSpacing: "0.06em", marginBottom: 8 }}>
              APPLICABLE STANDARDS
            </div>
            {(c.standards || []).map((s, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 10,
                marginBottom: i < (c.standards || []).length - 1 ? 6 : 0,
              }}>
                <ISBadge code={s.code} />
                <span style={{ fontSize: 12, color: C.text }}>{s.title}</span>
              </div>
            ))}
          </div>
        )}

        {/* Sources */}
        <div style={{
          borderTop: `1px solid ${C.border}`,
          paddingTop: 12, marginTop: 14,
        }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: C.textDim,
            letterSpacing: "0.1em", marginBottom: 8 }}>SOURCES</div>
          {(c.sources || []).map((s, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "flex-start", gap: 8,
              marginBottom: 6,
            }}>
              <div style={{
                background: "#E8EDF3",
                color: C.textMid,
                fontSize: 9, fontWeight: 700,
                padding: "2px 6px", borderRadius: 3,
                letterSpacing: "0.05em", flexShrink: 0, marginTop: 1,
              }}>{s.type.toUpperCase()}</div>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: 12, color: C.text, fontWeight: 500 }}>{s.label}</span>
                {s.clause && (
                  <span style={{ fontSize: 11, color: C.textDim }}> · {s.clause}</span>
                )}
              </div>
              <button style={{
                background: "none", border: `1px solid ${C.border}`,
                borderRadius: 4, padding: "2px 8px",
                fontSize: 10, color: C.link, cursor: "pointer",
                display: "flex", alignItems: "center", gap: 3, flexShrink: 0,
              }}>
                <ExternalLink size={9} />
                View
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginTop: 14, flexWrap: "wrap", gap: 8,
        }}>
          <ConfidencePill score={c.confidence} sources={c.sourceCount} />
          <div style={{ display: "flex", gap: 6 }}>
            <span style={{ fontSize: 11, color: C.textDim, alignSelf: "center" }}>
              Was this helpful?
            </span>
            <button onClick={() => setFeedback("yes")} style={{
              background: feedback === "yes" ? C.greenLight : "none",
              border: `1px solid ${feedback === "yes" ? C.green : C.border}`,
              borderRadius: 4, padding: "4px 8px",
              cursor: "pointer", color: feedback === "yes" ? C.green : C.textDim,
              display: "flex", alignItems: "center", gap: 3, fontSize: 11,
            }}>
              <ThumbsUp size={11} /> Helpful
            </button>
            <button onClick={() => setFeedback("no")} style={{
              background: feedback === "no" ? C.redLight : "none",
              border: `1px solid ${feedback === "no" ? C.red : C.border}`,
              borderRadius: 4, padding: "4px 8px",
              cursor: "pointer", color: feedback === "no" ? C.red : C.textDim,
              display: "flex", alignItems: "center", gap: 3, fontSize: 11,
            }}>
              <ThumbsDown size={11} /> Not helpful
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatScreen({ setScreen, initialQuery }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const navItems = [
    { id: "home",       icon: Home,          label: "Home" },
    { id: "chat",       icon: MessageSquare, label: "AI Assistant" },
    { id: "standards",  icon: BookOpen,       label: "Standards" },
    { id: "services",   icon: Award,          label: "Certification" },
    { id: "labs",       icon: FlaskConical,   label: "Laboratories" },
    { id: "hallmark",   icon: Star,           label: "Hallmarking" },
    { id: "consumer",   icon: Users,          label: "Consumer Services" },
    { id: "saved",      icon: Bookmark,       label: "Saved Queries" },
  ];

  const sendQuestion = async (question) => {
    if (!question || !question.trim()) return;

    const cleanQuestion = question.trim();

    // Show the user's question immediately.
    setMessages(prev => [
      ...prev,
      {
        role: "user",
        content: cleanQuestion
      }
    ]);

    // Show loading state while FastAPI + RAG + Ollama work.
    setMessages(prev => [
      ...prev,
      {
        role: "ai",
        loading: true,
        content: {
          summary: "Searching the BIS knowledge base...",
          sections: [],
          standards: [],
          sources: [],
          confidence: null,
          sourceCount: 0
        }
      }
    ]);

    try {
      const response = await fetch("http://127.0.0.1:8000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          question: cleanQuestion
        })
      });

      if (!response.ok) {
        throw new Error(`Backend request failed: ${response.status}`);
      }

      const data = await response.json();

      console.log("BIS backend response:", data);

      // Convert FastAPI source objects into the format
      // expected by the existing BIS UI.
      const sources = (data.sources || []).map((source) => ({
        label: source.source || "BIS Document",
        clause: `Page ${source.page ?? "Unknown"} — ${source.chunk ?? "Unknown"}`,
        type: "BIS SOURCE"
      }));

      const answerContent = {
        summary: data.answer || "No answer was returned by the BIS knowledge base.",
        sections: [],
        standards: [],
        sources,
        // The current backend does not calculate a confidence score,
        // so do not invent one.
        confidence: null,
        sourceCount: sources.length
      };

      // Replace only the loading message with the real answer.
      setMessages(prev => {
        const updated = [...prev];
        const lastIndex = updated.length - 1;

        if (updated[lastIndex]?.loading) {
          updated[lastIndex] = {
            role: "ai",
            content: answerContent
          };
        } else {
          updated.push({
            role: "ai",
            content: answerContent
          });
        }

        return updated;
      });

    } catch (error) {
      console.error("BIS backend error:", error);

      setMessages(prev => {
        const updated = [...prev];
        const lastIndex = updated.length - 1;

        const errorMessage = {
          role: "ai",
          content: {
            summary: "Sorry, I could not connect to the BIS AI backend. Make sure FastAPI and Ollama are running.",
            sections: [],
            standards: [],
            sources: [],
            confidence: null,
            sourceCount: 0
          }
        };

        if (updated[lastIndex]?.loading) {
          updated[lastIndex] = errorMessage;
        } else {
          updated.push(errorMessage);
        }

        return updated;
      });
    }
  };

  const send = async () => {
    if (!input.trim()) return;

    const question = input.trim();
    setInput("");
    await sendQuestion(question);
  };

  // If the user asks a question from the Home screen,
  // automatically send that question to the real backend.
  useEffect(() => {
    if (!initialQuery || !initialQuery.trim()) return;

    sendQuestion(initialQuery);
  }, [initialQuery]);

  return (
    <div style={{
      display: "flex", height: "calc(100vh - 63px)",
      background: C.surface,
    }}>
      {/* Sidebar */}
      <aside style={{
        width: 220, flexShrink: 0,
        background: C.card,
        borderRight: `1px solid ${C.border}`,
        display: "flex", flexDirection: "column",
        overflowY: "auto",
      }}>
        <div style={{ padding: "16px 12px 8px" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: C.textDim,
            letterSpacing: "0.1em", padding: "0 8px 8px" }}>
            NAVIGATION
          </div>
          {navItems.map(n => (
            <button key={n.id} onClick={() => setScreen(n.id)} style={{
              display: "flex", alignItems: "center", gap: 10,
              width: "100%", padding: "9px 10px", borderRadius: 6,
              background: n.id === "chat" ? C.navyLight : "none",
              border: "none", cursor: "pointer",
              color: n.id === "chat" ? C.navy : C.textMid,
              fontWeight: n.id === "chat" ? 600 : 400,
              fontSize: 13, textAlign: "left",
              marginBottom: 2,
            }}>
              <n.icon size={16} />
              {n.label}
            </button>
          ))}
        </div>

        <div style={{
          padding: "12px",
          borderTop: `1px solid ${C.border}`,
          marginTop: "auto",
        }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: C.textDim,
            letterSpacing: "0.1em", marginBottom: 8 }}>RECENT QUERIES</div>
          {["BIS certification for toys", "IS 1367 fasteners", "Hallmarking gold jewellery"].map((q, i) => (
            <button key={i} style={{
              display: "block", width: "100%", textAlign: "left",
              fontSize: 11, color: C.textMid, padding: "5px 4px",
              background: "none", border: "none", cursor: "pointer",
              borderBottom: i < 2 ? `1px solid ${C.border}` : "none",
              lineHeight: 1.4,
            }}>{q}</button>
          ))}
        </div>
      </aside>

      {/* Main chat */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column", overflow: "hidden",
      }}>
        {/* Chat header */}
        <div style={{
          background: C.card,
          borderBottom: `1px solid ${C.border}`,
          padding: "12px 24px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: 14, color: C.text }}>
              BIS AI Assistant
            </div>
            <div style={{ fontSize: 11, color: C.textDim }}>
              Answers grounded in official BIS standards and guidelines
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <Btn variant="secondary" small icon={Bookmark}>Save Session</Btn>
            <Btn variant="secondary" small icon={RefreshCw}>New Chat</Btn>
          </div>
        </div>

        {/* Messages */}
        <div style={{
          flex: 1, overflowY: "auto",
          padding: "24px",
        }}>
          {messages.map((m, i) => <ChatMessage key={i} msg={m} />)}

        </div>

        {/* Input area */}
        <div style={{
          background: C.card, borderTop: `1px solid ${C.border}`,
          padding: "16px 24px",
        }}>
          <div style={{
            display: "flex", gap: 10, alignItems: "flex-end",
            background: C.surface, border: `1.5px solid ${C.borderMid}`,
            borderRadius: 8, padding: "10px 14px",
          }}>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }}}
              placeholder="Ask a follow-up question or ask about another BIS topic..."
              rows={2}
              style={{
                flex: 1, border: "none", outline: "none", resize: "none",
                background: "transparent", fontSize: 13, color: C.text,
                fontFamily: "inherit", lineHeight: 1.5,
              }}
            />
            <button onClick={send} style={{
              background: C.navy, border: "none", borderRadius: 6,
              padding: "8px 16px", color: "white", fontSize: 13,
              fontWeight: 600, cursor: "pointer",
              display: "flex", alignItems: "center", gap: 6, flexShrink: 0,
            }}>
              <ArrowRight size={14} /> Ask
            </button>
          </div>
          <div style={{
            fontSize: 10, color: C.textDim, marginTop: 8,
            display: "flex", alignItems: "center", gap: 4,
          }}>
            <Shield size={10} />
            Powered by BIS knowledge base · Always verify with official BIS publications for compliance decisions.
          </div>
        </div>
      </div>
    </div>
  );
}

// ── SCREEN 3: STANDARDS LOOKUP ────────────────────────────────────────────────
const STANDARD_RESULTS = [
  {
    code: "IS 14543:2016",
    title: "Stainless Steel Utensils — Specification",
    why: "Stainless steel water bottles are classified as utensils under this standard. It specifies composition, dimensions, finish, and food-contact safety requirements.",
    clauses: ["Clause 4 — Material requirements", "Clause 6 — Workmanship and finish", "Clause 7 — Tests"],
    mandatory: true,
  },
  {
    code: "IS 15105:2002",
    title: "Design and Manufacture of Stainless Steel Pressure Vessels",
    why: "Applicable if the water bottle is designed for use under pressure (e.g. insulated vacuum bottles). Covers pressure-related safety.",
    clauses: ["Clause 3.2 — Material grade", "Clause 5 — Design criteria"],
    mandatory: false,
  },
  {
    code: "IS 16391:2015",
    title: "Safe Drinking Water Storage Containers — Specification",
    why: "For containers intended to store drinking water, this standard covers leach tests, material compatibility, and hygiene requirements.",
    clauses: ["Clause 5 — Physical requirements", "Clause 6 — Chemical test"],
    mandatory: false,
  },
];

function StandardsScreen() {
  const [product, setProduct] = useState("");
  const [searched, setSearched] = useState(true);

  return (
    <div style={{ background: C.surface, minHeight: "calc(100vh - 63px)", padding: "32px 24px" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: C.text, margin: "0 0 6px" }}>
            Product → Standard Finder
          </h2>
          <p style={{ fontSize: 14, color: C.textMid, margin: 0 }}>
            Describe your product and we will identify potentially applicable Indian Standards.
          </p>
        </div>

        {/* Input */}
        <div style={{
          background: C.card, border: `1px solid ${C.border}`,
          borderRadius: 10, padding: 20, marginBottom: 24,
        }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: C.textMid,
            display: "block", marginBottom: 8 }}>
            Describe your product
          </label>
          <div style={{ display: "flex", gap: 10 }}>
            <input
              value={product || "I manufacture stainless steel water bottles."}
              onChange={e => setProduct(e.target.value)}
              placeholder="e.g. I manufacture stainless steel water bottles"
              style={{
                flex: 1, border: `1.5px solid ${C.borderMid}`,
                borderRadius: 6, padding: "10px 14px",
                fontSize: 14, color: C.text, outline: "none",
              }}
            />
            <button onClick={() => setSearched(true)} style={{
              background: C.navy, border: "none",
              borderRadius: 6, padding: "10px 20px",
              color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer",
            }}>Find Standards</button>
          </div>
        </div>

        {searched && (
          <>
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              marginBottom: 16,
            }}>
              <div>
                <SectionLabel>Results for "stainless steel water bottles"</SectionLabel>
                <div style={{ fontSize: 13, color: C.textMid }}>
                  {STANDARD_RESULTS.length} potentially applicable standards identified
                </div>
              </div>
              <button style={{
                display: "flex", alignItems: "center", gap: 6,
                background: "none", border: `1px solid ${C.border}`,
                borderRadius: 6, padding: "6px 12px",
                fontSize: 12, color: C.textMid, cursor: "pointer",
              }}>
                <MessageSquare size={13} />
                Ask AI about these
              </button>
            </div>

            {STANDARD_RESULTS.map((s, i) => (
              <div key={i} style={{
                background: C.card,
                border: `1px solid ${C.border}`,
                borderLeft: `4px solid ${s.mandatory ? C.red : C.navy}`,
                borderRadius: 8, padding: 20, marginBottom: 12,
              }}>
                <div style={{
                  display: "flex", justifyContent: "space-between",
                  alignItems: "flex-start", marginBottom: 10, gap: 10,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <ISBadge code={s.code} size="md" />
                    {s.mandatory && <Tag color={C.red}>Mandatory Certification</Tag>}
                  </div>
                  <button style={{
                    display: "flex", alignItems: "center", gap: 5,
                    background: "none", border: `1px solid ${C.border}`,
                    borderRadius: 5, padding: "5px 10px",
                    fontSize: 11, color: C.link, cursor: "pointer",
                  }}>
                    <ExternalLink size={11} /> View Standard
                  </button>
                </div>

                <div style={{ fontWeight: 600, color: C.text, fontSize: 15, marginBottom: 8 }}>
                  {s.title}
                </div>

                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: C.textDim,
                    letterSpacing: "0.08em", marginBottom: 4 }}>WHY IT APPLIES</div>
                  <p style={{ fontSize: 13, color: C.textMid, margin: 0, lineHeight: 1.6 }}>
                    {s.why}
                  </p>
                </div>

                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: C.textDim,
                    letterSpacing: "0.08em", marginBottom: 6 }}>RELEVANT CLAUSES</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {s.clauses.map((cl, j) => (
                      <span key={j} style={{
                        background: C.surface, border: `1px solid ${C.border}`,
                        borderRadius: 4, padding: "3px 10px",
                        fontSize: 11, color: C.textMid,
                        fontFamily: "monospace",
                      }}>{cl}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <div style={{
              background: C.amberLight, border: `1px solid #F59E0B55`,
              borderRadius: 8, padding: "12px 16px",
              display: "flex", gap: 10, alignItems: "flex-start",
            }}>
              <AlertCircle size={16} style={{ color: C.amber, flexShrink: 0, marginTop: 1 }} />
              <p style={{ fontSize: 12, color: C.amber, margin: 0, lineHeight: 1.6 }}>
                These results are AI-generated guidance only. Consult the full IS text and a BIS
                officer to confirm applicable standards for your specific product configuration.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ── SCREEN 4: SERVICES ────────────────────────────────────────────────────────
function ServicesScreen({ setScreen }) {
  const [selected, setSelected] = useState("certification");
  const services = [
    {
      id: "certification",
      icon: Award,
      title: "Product Certification",
      shortDesc: "ISI Mark Licence",
      overview: "The ISI Mark is India's most recognised quality certification mark, issued by BIS under Scheme I (Product Certification Scheme). It is mandatory for over 400 product categories.",
      steps: [
        "Identify the applicable IS standard for your product.",
        "Register on manakonline.in and submit the application.",
        "Pay application fee and await BIS factory inspection.",
        "Submit product samples to a BIS-recognised testing laboratory.",
        "Receive grant of licence upon successful assessment.",
        "Display ISI Mark on products; subject to annual renewal and surveillance.",
      ],
      keyLinks: ["manakonline.in — Online application portal", "BIS Fee Schedule 2023", "List of recognised laboratories"],
    },
    {
      id: "hallmark",
      icon: Star,
      title: "Hallmarking",
      shortDesc: "Gold, Silver & Platinum",
      overview: "BIS Hallmarking is the official third-party assurance of the purity of precious metal articles. It is mandatory for gold jewellery in India under Hallmarking (Compulsory) Order 2021.",
      steps: [
        "Register jeweller entity with BIS.",
        "Bring articles to a BIS-recognised Assaying & Hallmarking Centre (AHC).",
        "AHC tests purity and applies the BIS hallmark using laser engraving.",
        "Receive HUID (Hallmark Unique ID) for each article.",
        "Article is now legally hallmarked and can be sold.",
      ],
      keyLinks: ["BIS Care App — Verify hallmark by HUID", "List of AHCs", "Jeweller registration portal"],
    },
    {
      id: "labs",
      icon: FlaskConical,
      title: "Laboratory Recognition",
      shortDesc: "NABL & BIS labs",
      overview: "BIS recognises laboratories to conduct testing of products against Indian Standards. Recognition is granted under Scheme IV of the Product Certification Scheme.",
      steps: [
        "Ensure the laboratory has NABL accreditation for the relevant scope.",
        "Apply to BIS for recognition with supporting technical documentation.",
        "BIS conducts proficiency assessment and laboratory audit.",
        "Upon satisfactory assessment, recognition is granted for specific IS and test scope.",
        "Recognised labs are listed in the BIS online directory.",
      ],
      keyLinks: ["NABL accreditation portal", "BIS Laboratory Recognition application"],
    },
  ];

  const current = services.find(s => s.id === selected);

  return (
    <div style={{ background: C.surface, minHeight: "calc(100vh - 63px)", padding: "32px 24px" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: C.text, margin: "0 0 20px" }}>
          BIS Service Guidance
        </h2>
        <div style={{ display: "flex", gap: 20 }}>
          {/* Service list */}
          <div style={{ width: 220, flexShrink: 0 }}>
            {services.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id)} style={{
                display: "flex", alignItems: "center", gap: 10,
                width: "100%", padding: "12px 14px", borderRadius: 8,
                background: selected === s.id ? C.card : "none",
                border: selected === s.id ? `1px solid ${C.border}` : "1px solid transparent",
                borderLeft: selected === s.id ? `3px solid ${C.navy}` : "3px solid transparent",
                cursor: "pointer", textAlign: "left", marginBottom: 6,
              }}>
                <s.icon size={16} style={{ color: selected === s.id ? C.navy : C.textDim }} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: selected === s.id ? 600 : 400,
                    color: selected === s.id ? C.text : C.textMid }}>{s.title}</div>
                  <div style={{ fontSize: 11, color: C.textDim }}>{s.shortDesc}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Detail */}
          {current && (
            <div style={{ flex: 1 }}>
              <div style={{
                background: C.card, border: `1px solid ${C.border}`,
                borderRadius: 10, padding: 24, marginBottom: 16,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 8, background: C.navyLight,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <current.icon size={20} style={{ color: C.navy }} />
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: C.text }}>
                      {current.title}
                    </h3>
                  </div>
                </div>
                <p style={{ fontSize: 14, color: C.textMid, lineHeight: 1.7, margin: "0 0 20px" }}>
                  {current.overview}
                </p>

                <SectionLabel>Step-by-Step Process</SectionLabel>
                {current.steps.map((step, i) => (
                  <div key={i} style={{
                    display: "flex", gap: 12, marginBottom: 10, alignItems: "flex-start",
                  }}>
                    <div style={{
                      minWidth: 24, height: 24,
                      background: C.navy, color: "white",
                      borderRadius: "50%",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 1,
                    }}>{i + 1}</div>
                    <p style={{ fontSize: 13, color: C.text, margin: 0, lineHeight: 1.6 }}>
                      {step}
                    </p>
                  </div>
                ))}
              </div>

              <div style={{
                background: C.card, border: `1px solid ${C.border}`,
                borderRadius: 10, padding: 20,
              }}>
                <SectionLabel>Key Resources</SectionLabel>
                {current.keyLinks.map((link, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 8,
                    padding: "8px 0",
                    borderBottom: i < current.keyLinks.length - 1 ? `1px solid ${C.border}` : "none",
                  }}>
                    <ExternalLink size={13} style={{ color: C.link, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: C.link }}>{link}</span>
                  </div>
                ))}

                <div style={{ marginTop: 16 }}>
                  <button onClick={() => setScreen("chat")} style={{
                    background: C.navy, border: "none",
                    borderRadius: 6, padding: "9px 18px",
                    color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer",
                    display: "flex", alignItems: "center", gap: 6,
                  }}>
                    <MessageSquare size={14} />
                    Ask AI for more details on {current.title}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── SCREEN 5: LABS ────────────────────────────────────────────────────────────
const LABS = [
  { name: "Central Glass & Ceramic Research Institute", city: "Kolkata", state: "West Bengal",
    scope: ["Glass products", "Ceramic ware", "Construction materials"], nabl: true, bis: true },
  { name: "Electronics Regional Test Laboratory", city: "Mumbai", state: "Maharashtra",
    scope: ["Electrical appliances", "Electronics", "IT equipment"], nabl: true, bis: true },
  { name: "National Test House", city: "Chennai", state: "Tamil Nadu",
    scope: ["Mechanical testing", "Chemical analysis", "Polymers", "Textiles"], nabl: true, bis: false },
  { name: "Fluid Control Research Institute", city: "Palakkad", state: "Kerala",
    scope: ["Valves", "Pipes", "Fittings", "Fluid handling"], nabl: true, bis: true },
];

function LabsScreen() {
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  return (
    <div style={{ background: C.surface, minHeight: "calc(100vh - 63px)", padding: "32px 24px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: C.text, margin: "0 0 6px" }}>
          Laboratory Finder
        </h2>
        <p style={{ fontSize: 14, color: C.textMid, margin: "0 0 24px" }}>
          Find BIS-recognised testing laboratories for your product category.
        </p>

        <div style={{
          background: C.card, border: `1px solid ${C.border}`,
          borderRadius: 10, padding: 20, marginBottom: 24,
          display: "flex", gap: 12, flexWrap: "wrap",
        }}>
          <div style={{ flex: "1 1 200px" }}>
            <label style={{ fontSize: 11, fontWeight: 600, color: C.textMid,
              display: "block", marginBottom: 5 }}>Product Category</label>
            <input
              value={category}
              onChange={e => setCategory(e.target.value)}
              placeholder="e.g. electrical appliances, toys, textiles..."
              style={{
                width: "100%", border: `1.5px solid ${C.borderMid}`,
                borderRadius: 6, padding: "9px 12px",
                fontSize: 13, color: C.text, outline: "none", boxSizing: "border-box",
              }}
            />
          </div>
          <div style={{ flex: "1 1 160px" }}>
            <label style={{ fontSize: 11, fontWeight: 600, color: C.textMid,
              display: "block", marginBottom: 5 }}>State / Location</label>
            <input
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder="e.g. Maharashtra, Delhi..."
              style={{
                width: "100%", border: `1.5px solid ${C.borderMid}`,
                borderRadius: 6, padding: "9px 12px",
                fontSize: 13, color: C.text, outline: "none", boxSizing: "border-box",
              }}
            />
          </div>
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <button style={{
              background: C.navy, border: "none",
              borderRadius: 6, padding: "9px 20px",
              color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer",
              display: "flex", alignItems: "center", gap: 6,
            }}>
              <Search size={14} /> Search Labs
            </button>
          </div>
        </div>

        {/* Filters row */}
        <div style={{
          display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap",
          alignItems: "center",
        }}>
          <span style={{ fontSize: 12, color: C.textDim, display: "flex", alignItems: "center", gap: 4 }}>
            <Filter size={12} /> Filter:
          </span>
          {["All", "BIS Recognised", "NABL Accredited", "Government Labs"].map((f, i) => (
            <button key={f} style={{
              background: i === 0 ? C.navy : C.card,
              border: `1px solid ${i === 0 ? C.navy : C.border}`,
              borderRadius: 4, padding: "4px 12px",
              fontSize: 12, color: i === 0 ? "white" : C.textMid, cursor: "pointer",
            }}>{f}</button>
          ))}
          <span style={{ fontSize: 12, color: C.textDim, marginLeft: "auto" }}>
            Showing {LABS.length} results
          </span>
        </div>

        {LABS.map((lab, i) => (
          <div key={i} style={{
            background: C.card, border: `1px solid ${C.border}`,
            borderRadius: 8, padding: "16px 20px", marginBottom: 10,
            display: "flex", gap: 16, alignItems: "flex-start",
          }}>
            <div style={{
              width: 42, height: 42, borderRadius: 8, background: C.navyLight,
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <FlaskConical size={20} style={{ color: C.navy }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "flex-start", marginBottom: 6, gap: 10,
              }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: C.text }}>
                  {lab.name}
                </div>
                <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                  {lab.nabl && <Tag color={C.green}>NABL</Tag>}
                  {lab.bis && <Tag color={C.navy}>BIS Recognised</Tag>}
                </div>
              </div>
              <div style={{
                display: "flex", alignItems: "center", gap: 4,
                color: C.textDim, fontSize: 12, marginBottom: 8,
              }}>
                <MapPin size={11} />
                {lab.city}, {lab.state}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {lab.scope.map((s, j) => (
                  <span key={j} style={{
                    background: C.surface, border: `1px solid ${C.border}`,
                    borderRadius: 4, padding: "2px 8px",
                    fontSize: 11, color: C.textMid,
                  }}>{s}</span>
                ))}
              </div>
            </div>
            <div style={{ flexShrink: 0 }}>
              <button style={{
                background: "none", border: `1px solid ${C.border}`,
                borderRadius: 5, padding: "6px 12px",
                fontSize: 11, color: C.navy, cursor: "pointer", fontWeight: 600,
              }}>Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── SCREEN 6: ADMIN DASHBOARD ─────────────────────────────────────────────────
function AdminScreen({ setScreen }) {
  const [adminTab, setAdminTab] = useState("documents");
  const stats = [
    { label: "Documents Indexed",    value: "1,847", icon: FileText,  change: "+12 this week" },
    { label: "Standards Loaded",     value: "423",    icon: BookOpen,  change: "IS catalogue" },
    { label: "Queries This Month",   value: "6,291",  icon: MessageSquare, change: "+18% vs last month" },
    { label: "System Health",        value: "98.4%",  icon: Activity,  change: "All systems normal" },
  ];
  const docs = [
    { name: "IS 302-1:2019 Household Appliances Safety.pdf", status: "indexed", size: "2.4 MB", date: "2024-10-12", clauses: 84 },
    { name: "BIS Certification Guidelines 2023.pdf",         status: "indexed", size: "1.8 MB", date: "2024-10-08", clauses: 210 },
    { name: "Hallmarking Amendment Order 2024.pdf",          status: "indexing", size: "0.6 MB",  date: "2024-10-28", clauses: 0 },
    { name: "IS 14543:2016 Stainless Steel Utensils.pdf",    status: "indexed", size: "3.1 MB", date: "2024-09-30", clauses: 61 },
    { name: "BIS Fee Schedule Oct 2024.pdf",                 status: "pending", size: "0.4 MB",  date: "2024-10-27", clauses: 0 },
  ];
  const statusStyle = {
    indexed:  { bg: C.greenLight, color: C.green, label: "Indexed" },
    indexing: { bg: C.amberLight, color: C.amber,  label: "Indexing…" },
    pending:  { bg: "#F5F5F5",    color: C.textDim, label: "Pending" },
  };

  return (
    <div style={{ display: "flex", minHeight: "calc(100vh - 63px)" }}>
      {/* Admin sidebar */}
      <aside style={{
        width: 220, flexShrink: 0,
        background: C.navyDark,
        display: "flex", flexDirection: "column",
      }}>
        <div style={{
          padding: "16px 16px 8px",
          borderBottom: "1px solid rgba(255,255,255,.08)",
          marginBottom: 8,
        }}>
          <div style={{
            background: "rgba(200,16,46,.25)",
            border: "1px solid rgba(200,16,46,.4)",
            borderRadius: 4, padding: "6px 10px",
            color: "#F4A7B3", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em",
            marginBottom: 8,
          }}>ADMIN ACCESS</div>
          <div style={{ color: "#93A8C9", fontSize: 11 }}>Logged in as BIS Admin</div>
        </div>

        {[
          { id: "documents", icon: FileText,   label: "Documents" },
          { id: "standards", icon: BookOpen,   label: "Standards" },
          { id: "sources",   icon: Database,   label: "Knowledge Sources" },
          { id: "health",    icon: Activity,   label: "System Health" },
          { id: "users",     icon: Users,      label: "Access Control" },
          { id: "settings",  icon: Settings,   label: "Settings" },
        ].map(n => (
          <button key={n.id} onClick={() => setAdminTab(n.id)} style={{
            display: "flex", alignItems: "center", gap: 10,
            width: "100%", padding: "9px 16px",
            background: adminTab === n.id ? "rgba(255,255,255,.1)" : "none",
            border: "none", cursor: "pointer",
            color: adminTab === n.id ? "white" : "#93A8C9",
            fontWeight: adminTab === n.id ? 600 : 400,
            fontSize: 13, textAlign: "left", borderRadius: 0,
            borderLeft: adminTab === n.id ? `3px solid ${C.red}` : "3px solid transparent",
          }}>
            <n.icon size={15} />
            {n.label}
          </button>
        ))}

        <div style={{ marginTop: "auto", padding: 16 }}>
          <button onClick={() => setScreen("home")} style={{
            display: "flex", alignItems: "center", gap: 8,
            width: "100%", background: "none", border: "none",
            color: "#6B8CAE", fontSize: 12, cursor: "pointer", padding: 0,
          }}>
            <LogOut size={13} /> Exit Admin
          </button>
        </div>
      </aside>

      {/* Admin content */}
      <div style={{ flex: 1, background: C.surface, overflow: "auto" }}>
        {/* Admin header */}
        <div style={{
          background: C.card, borderBottom: `1px solid ${C.border}`,
          padding: "16px 28px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: C.text }}>
              Knowledge Management Dashboard
            </h2>
            <div style={{ fontSize: 12, color: C.textDim }}>
              BIS AI Assistant — Administrator Panel
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button style={{
              display: "flex", alignItems: "center", gap: 6,
              background: C.red, border: "none",
              borderRadius: 6, padding: "8px 16px",
              color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer",
            }}>
              <Upload size={14} /> Upload Document
            </button>
          </div>
        </div>

        <div style={{ padding: "24px 28px" }}>
          {/* Stats */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: 12, marginBottom: 24,
          }}>
            {stats.map((s, i) => (
              <div key={i} style={{
                background: C.card, border: `1px solid ${C.border}`,
                borderRadius: 8, padding: "16px 18px",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <s.icon size={18} style={{ color: C.navy }} />
                  <span style={{ fontSize: 10, color: C.green, fontWeight: 600 }}>↑</span>
                </div>
                <div style={{ fontSize: 22, fontWeight: 800, color: C.text, lineHeight: 1 }}>
                  {s.value}
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, color: C.textMid, marginTop: 3 }}>
                  {s.label}
                </div>
                <div style={{ fontSize: 10, color: C.textDim, marginTop: 2 }}>{s.change}</div>
              </div>
            ))}
          </div>

          {/* Documents table */}
          <div style={{
            background: C.card, border: `1px solid ${C.border}`,
            borderRadius: 10, overflow: "hidden", marginBottom: 20,
          }}>
            <div style={{
              padding: "14px 20px",
              borderBottom: `1px solid ${C.border}`,
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: C.text }}>
                Document Index
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button style={{
                  display: "flex", alignItems: "center", gap: 5,
                  background: "none", border: `1px solid ${C.border}`,
                  borderRadius: 5, padding: "5px 10px",
                  fontSize: 11, color: C.textMid, cursor: "pointer",
                }}>
                  <Filter size={11} /> Filter
                </button>
                <button style={{
                  display: "flex", alignItems: "center", gap: 5,
                  background: "none", border: `1px solid ${C.border}`,
                  borderRadius: 5, padding: "5px 10px",
                  fontSize: 11, color: C.textMid, cursor: "pointer",
                }}>
                  <RefreshCw size={11} /> Refresh
                </button>
              </div>
            </div>

            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: C.surface }}>
                  {["Document Name", "Status", "Clauses", "Size", "Indexed On", "Actions"].map(h => (
                    <th key={h} style={{
                      padding: "10px 16px", textAlign: "left",
                      fontSize: 10, fontWeight: 700, color: C.textDim,
                      letterSpacing: "0.08em", textTransform: "uppercase",
                      borderBottom: `1px solid ${C.border}`,
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {docs.map((doc, i) => {
                  const ss = statusStyle[doc.status];
                  return (
                    <tr key={i} style={{
                      borderBottom: i < docs.length - 1 ? `1px solid ${C.border}` : "none",
                    }}>
                      <td style={{ padding: "11px 16px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <FileText size={14} style={{ color: C.textDim, flexShrink: 0 }} />
                          <span style={{ fontSize: 12, color: C.text, fontWeight: 500 }}>{doc.name}</span>
                        </div>
                      </td>
                      <td style={{ padding: "11px 16px" }}>
                        <span style={{
                          background: ss.bg, color: ss.color,
                          fontSize: 10, fontWeight: 700, padding: "2px 8px",
                          borderRadius: 4, letterSpacing: "0.05em",
                        }}>{ss.label}</span>
                      </td>
                      <td style={{ padding: "11px 16px", fontSize: 12, color: C.textMid, fontFamily: "monospace" }}>
                        {doc.clauses > 0 ? doc.clauses : "—"}
                      </td>
                      <td style={{ padding: "11px 16px", fontSize: 12, color: C.textMid }}>{doc.size}</td>
                      <td style={{ padding: "11px 16px", fontSize: 12, color: C.textMid, fontFamily: "monospace" }}>{doc.date}</td>
                      <td style={{ padding: "11px 16px" }}>
                        <div style={{ display: "flex", gap: 6 }}>
                          <button style={{
                            background: "none", border: `1px solid ${C.border}`,
                            borderRadius: 4, padding: "3px 8px",
                            fontSize: 10, color: C.link, cursor: "pointer",
                          }}>View</button>
                          <button style={{
                            background: "none", border: `1px solid ${C.border}`,
                            borderRadius: 4, padding: "3px 8px",
                            fontSize: 10, color: C.red, cursor: "pointer",
                          }}>Remove</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* System health */}
          <div style={{
            background: C.card, border: `1px solid ${C.border}`,
            borderRadius: 10, padding: 20,
          }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: C.text, marginBottom: 14 }}>
              System Health
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                { label: "Vector DB (ChromaDB)", status: "Operational", val: 98 },
                { label: "LLM Endpoint", status: "Operational", val: 100 },
                { label: "Document Indexer", status: "Processing", val: 64 },
                { label: "API Response Time", status: "1.2s avg", val: 85 },
              ].map((item, i) => (
                <div key={i} style={{
                  background: C.surface, borderRadius: 8, padding: 14,
                }}>
                  <div style={{
                    display: "flex", justifyContent: "space-between",
                    marginBottom: 8,
                  }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: C.text }}>
                      {item.label}
                    </span>
                    <span style={{
                      fontSize: 10, fontWeight: 700,
                      color: item.val >= 90 ? C.green : item.val >= 60 ? C.amber : C.red,
                    }}>{item.status}</span>
                  </div>
                  <div style={{
                    height: 5, background: C.border, borderRadius: 3, overflow: "hidden",
                  }}>
                    <div style={{
                      height: "100%", width: `${item.val}%`,
                      background: item.val >= 90 ? C.green : item.val >= 60 ? C.amber : C.red,
                      borderRadius: 3,
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── ROOT APP ──────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("home");
  const [chatQuery, setChatQuery] = useState("");

  const renderScreen = () => {
    switch (screen) {
      case "home":      return <HomeScreen setScreen={setScreen} setChatQuery={setChatQuery} />;
      case "chat":      return <ChatScreen setScreen={setScreen} initialQuery={chatQuery} />;
      case "standards": return <StandardsScreen />;
      case "services":  return <ServicesScreen setScreen={setScreen} />;
      case "labs":      return <LabsScreen />;
      case "admin":     return <AdminScreen setScreen={setScreen} />;
      default:          return <HomeScreen setScreen={setScreen} setChatQuery={setChatQuery} />;
    }
  };

  return (
    <>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
      <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif", minHeight: "100vh" }}>
      {screen !== "admin" && <Header screen={screen} setScreen={setScreen} />}
      {screen === "admin" && (
        <div style={{
          background: C.navyDark,
          borderBottom: `3px solid ${C.red}`,
          padding: "0 24px", height: 60,
          display: "flex", alignItems: "center", gap: 12,
        }}>
          <div style={{ width: 34, height: 34, background: C.red, borderRadius: 4,
            display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "white", fontSize: 13, fontWeight: 800 }}>BIS</span>
          </div>
          <div style={{ color: "white", fontWeight: 700, fontSize: 14 }}>
            BIS Intelligent Assistant
            <span style={{ color: "#6B8CAE", fontWeight: 400, marginLeft: 10, fontSize: 12 }}>
              / Admin Dashboard
            </span>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.green }} />
            <span style={{ color: "#6B8CAE", fontSize: 11 }}>All systems operational</span>
          </div>
        </div>
      )}
        {renderScreen()}
      </div>
    </>
  );
}