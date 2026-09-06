import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Download,
  Menu,
  X,
  Code2,
  Server,
  Database,
  Smartphone,
  ExternalLink,
  MapPin,
  Sparkles,
  Layers,
  CheckCircle2,
  Terminal,
  Clock,
  Eye,
  Sun,
  Activity,
  Cpu,
  Globe
} from "lucide-react";

import { CanvasBackground } from "./components/CanvasBackground";
import { TerminalWidget } from "./components/TerminalWidget";
import { ProjectModal } from "./components/ProjectModal";
import { ResumeModal } from "./components/ResumeModal";

import fleetflowImg from "./assets/fleetflow.jpg";
import eduhubImg from "./assets/eduhub.jpg";
import todoappImg from "./assets/todoapp.jpg";

import "./styles.css";

const projects = [
  {
    id: "fleetflow",
    title: "FleetFlow",
    type: "Full-Stack Logistics Platform",
    category: "Full-Stack",
    image: fleetflowImg,
    description:
      "A comprehensive fleet management & logistics platform tracking vehicles, drivers, shipments, maintenance scheduling, fuel monitoring, and live WebSockets telemetry.",
    highlights: [
      "Real-time vehicle telemetry and location streaming powered by WebSockets.",
      "Asynchronous background task processing using Redis and Celery for automated maintenance triggers.",
      "Scalable relational data architecture modeled in PostgreSQL with indexed spatial queries.",
      "Interactive React dashboard with telemetry telemetry graphs, status cards, and live logs."
    ],
    tech: ["React.js", "FastAPI", "PostgreSQL", "WebSockets", "Redis", "Celery", "Docker"],
    link: "https://github.com/dattatrimadakatte/FleetFlow",
    featured: true
  },
  {
    id: "eduhub",
    title: "EduHub",
    type: "Educational Management Portal",
    category: "Web Apps",
    image: eduhubImg,
    description:
      "EduHub is an educational management portal designed to organize and manage educational information through a structured and user-friendly web interface.",
    highlights: [
      "Structured management of educational records and information.",
      "User-friendly interface for accessing and managing data.",
      "CRUD operations for managing application records.",
      "MySQL database integration for storing and managing data.",
      "Responsive interface using HTML5, CSS3 and JavaScript."
    ],
    tech: ["JavaScript", "Python", "MySQL", "HTML5", "CSS3", "CRUD"],
    link: "https://github.com/dattatrimadakatte/Edu_Hub",
    featured: false
  },
  {
    id: "todoapp",
    title: "Flask Todo Application",
    type: "Interactive Web App",
    category: "APIs",
    image: todoappImg,
    description:
      "A structured interview-preparation & task manager web application built using Flask, SQLAlchemy ORM, and MySQL database integration.",
    highlights: [
      "RESTful API architecture using Python Flask and SQLAlchemy ORM.",
      "Dynamic task status management with search, filter tags, and CRUD operations.",
      "Clean modular blueprint file structure ready for production deployment."
    ],
    tech: ["Python", "Flask", "SQLAlchemy", "MySQL", "REST APIs"],
    link: "https://github.com/dattatrimadakatte/Flas-App.git",
    featured: false
  }
];

const skillCategories = [
  { id: "all", label: "All Skills" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "database", label: "Database" },
  { id: "tools", label: "DevOps & Tools" }
];

const skillsList = [
  { name: "React.js", category: "frontend", desc: "Hooks, Context API, Modular Components, State Management", icon: Code2 },
  { name: "JavaScript (ES6+)", category: "frontend", desc: "Async/Await, Promises, DOM Manipulation, Fetch API", icon: Code2 },
  { name: "HTML5 & CSS3", category: "frontend", desc: "Semantic HTML, Flexbox, CSS Grid, Responsive Design", icon: Code2 },
  { name: "Python", category: "backend", desc: "Object-Oriented Programming, Scripting, Automation", icon: Server },
  { name: "FastAPI", category: "backend", desc: "Asynchronous APIs, Pydantic, Swagger Docs, High Performance", icon: Server },
  { name: "Flask", category: "backend", desc: "Microframework, Jinja2, Blueprints, REST Endpoints", icon: Server },
  { name: "REST APIs & JWT", category: "backend", desc: "HTTP Specs, Role-Based Access Control, Auth Flows", icon: Server },
  { name: "PostgreSQL", category: "database", desc: "Relational Schemas, Indexing, Transactions, Queries", icon: Database },
  { name: "MySQL", category: "database", desc: "Database Administration, Joins, Stored Data Views", icon: Database },
  { name: "Redis & Celery", category: "tools", desc: "Caching, Message Queue, Asynchronous Background Tasks", icon: Cpu },
  { name: "WebSockets", category: "tools", desc: "Full-Duplex Real-Time Data Streaming", icon: Globe },
  { name: "Git & GitHub", category: "tools", desc: "Version Control, Feature Branching, Pull Requests, Code Reviews", icon: Github },
  { name: "Docker", category: "tools", desc: "Containerization, Docker Compose, Deployment Workflows", icon: Server }
];

const services = [
  {
    num: "01",
    title: "Full-Stack Web Applications",
    desc: "End-to-end web applications combining modern React frontends with fast, asynchronous Python APIs and secure databases."
  },
  {
    num: "02",
    title: "REST API & Backend Development",
    desc: "Clean, self-documenting REST APIs built with FastAPI and Flask, featuring role-based authentication, database ORMs, and error handling."
  },
  {
    num: "03",
    title: "Responsive Frontend UI/UX",
    desc: "Pixel-perfect, responsive user interfaces using React.js and modern CSS, optimized for performance across mobile, tablet, and desktop."
  },
  {
    num: "04",
    title: "Database Architecture & Optimization",
    desc: "Relational database schema modeling, index optimization, and CRUD backend integration using PostgreSQL and MySQL."
  }
];

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [selectedSkillCategory, setSelectedSkillCategory] = useState("all");
  const [selectedProjectCategory, setSelectedProjectCategory] = useState("all");
  const [activeModalProject, setActiveModalProject] = useState(null);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState("cyan");
  const [canvasActive, setCanvasActive] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);

  // Form state
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  // India time clock
  const [indiaTime, setIndiaTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const timeStr = new Date().toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      });
      setIndiaTime(timeStr);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Theme observer
  useEffect(() => {
    document.body.className = `theme-${activeTheme}`;
  }, [activeTheme]);

  // Section observer for active navbar links
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const handleScroll = () => {
      const scrollY = window.scrollY;
      sections.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 120;
        const sectionId = current.getAttribute("id");
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("madakattedattatri29@gmail.com");
    showToast("Email address copied to clipboard!");
  };

  const handleTerminalCommand = (cmd) => {
    const el = document.getElementById(cmd);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      showToast("Please fill in all contact fields.");
      return;
    }
    setFormSubmitting(true);
    setTimeout(() => {
      setFormSubmitting(false);
      setFormSuccess(true);
      showToast("Message sent successfully! Dattatri will get back to you soon.");
      setFormState({ name: "", email: "", message: "" });
      setTimeout(() => setFormSuccess(false), 5000);
    }, 1200);
  };

  const filteredSkills =
    selectedSkillCategory === "all"
      ? skillsList
      : skillsList.filter((s) => s.category === selectedSkillCategory);

  const filteredProjects =
    selectedProjectCategory === "all"
      ? projects
      : projects.filter((p) => p.category === selectedProjectCategory);

  const navItems = ["home", "about", "skills", "projects", "services", "experience", "contact"];

  return (
    <div className="app">
      {/* Dynamic Background Canvas */}
      <CanvasBackground theme={activeTheme} active={canvasActive} />

      {/* Glassmorphic Navbar */}
      <header className="navbar">
        <a href="#home" className="brand" onClick={() => setMobileMenuOpen(false)}>
          <span className="brand-mark">&lt;/&gt;</span>
          <span>
            Dattatri<span className="dot">.dev</span>
          </span>
        </a>

        <div className="nav-right-controls">
          <nav className={`nav-links ${mobileMenuOpen ? "mobile-open" : ""}`}>
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className={activeSection === item ? "active" : ""}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </a>
            ))}
          </nav>

          {/* Ambient Theme Color Picker */}
          <div className="theme-picker" title="Change ambient theme color">
            <button
              className={`theme-dot cyan ${activeTheme === "cyan" ? "active" : ""}`}
              onClick={() => setActiveTheme("cyan")}
              aria-label="Cyan theme"
            />
            <button
              className={`theme-dot indigo ${activeTheme === "indigo" ? "active" : ""}`}
              onClick={() => setActiveTheme("indigo")}
              aria-label="Indigo theme"
            />
            <button
              className={`theme-dot emerald ${activeTheme === "emerald" ? "active" : ""}`}
              onClick={() => setActiveTheme("emerald")}
              aria-label="Emerald theme"
            />
          </div>

          <button
            className="menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <main>
        {/* HERO SECTION */}
        <section id="home" className="section hero">
          <div className="hero-content">
            <div className="status-badge">
              <span className="status-pulse"></span>
              <span>Available for Full-Time & Freelance</span>
            </div>
            <h1>
              Building high-performance <br />
              <span className="gradient-text">Full-Stack Web Apps</span>
            </h1>
            <p className="hero-description">
              Hi, I'm <strong>Dattatri Madakatte</strong> — a Software Engineer & MCA Graduate.
              I build modern, reactive user interfaces with <strong>React.js</strong> and fast, scalable backend services with <strong>Python, FastAPI & PostgreSQL</strong>.
            </p>

            <div className="hero-actions">
              <a href="#projects" className="btn primary">
                Explore Work <ArrowUpRight size={18} />
              </a>
              <button className="btn secondary" onClick={() => setIsResumeModalOpen(true)}>
                View Resume <Download size={18} />
              </button>
              <button className="btn outline" onClick={handleCopyEmail}>
                Copy Email
              </button>
            </div>

            <div className="social-links">
              <a
                href="https://github.com/dattatrimadakatte/"
                target="_blank"
                rel="noreferrer"
                className="social-link"
              >
                <Github size={18} /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/dattatri-madakatte-55450022a/"
                target="_blank"
                rel="noreferrer"
                className="social-link"
              >
                <Linkedin size={18} /> LinkedIn
              </a>
              <a href="mailto:madakattedattatri29@gmail.com" className="social-link">
                <Mail size={18} /> Direct Email
              </a>
            </div>
          </div>

          {/* Interactive Hero Code / Terminal Widget */}
          <TerminalWidget onExecuteCommand={handleTerminalCommand} />
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="section">
          <div className="section-heading">
            <span className="section-num">01</span>
            <h2>About Me</h2>
          </div>

          <div className="about-grid">
            <div className="about-text glass-panel" style={{ padding: "36px" }}>
              <p className="lead">
                I am a passionate Full-Stack Developer with a Master of Computer Applications (MCA) degree, committed to engineering clean, efficient, and user-centric digital products.
              </p>
              <p>
                My expertise spans full-stack architecture — crafting responsive React.js single-page applications on the frontend, designing RESTful APIs with Python & FastAPI on the backend, and optimizing relational data structures in PostgreSQL & MySQL.
              </p>
              <p>
                During my Python Full-Stack Developer Internship at <strong>Infosys Springboard</strong>, I honed practical software engineering workflows, Git version control, microservice integrations, and test-driven deployment strategies.
              </p>
            </div>

            <div className="stats-grid">
              <div className="stat-card glass-panel">
                <div className="stat-number">MCA</div>
                <div className="stat-label">Master of Computer Applications</div>
              </div>
              <div className="stat-card glass-panel">
                <div className="stat-number">1+</div>
                <div className="stat-label">Full-Stack Projects Built</div>
              </div>
              <div className="stat-card glass-panel">
                <div className="stat-number">Infosys</div>
                <div className="stat-label">Springboard Internship</div>
              </div>
              <div className="stat-card glass-panel">
                <div className="stat-number">6+</div>
                <div className="stat-label">Core Tech Frameworks</div>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="section">
          <div className="section-heading">
            <span className="section-num">02</span>
            <h2>Technical Skills & Stack</h2>
          </div>

          <div className="skills-filter-tabs">
            {skillCategories.map((cat) => (
              <button
                key={cat.id}
                className={`tab-btn ${selectedSkillCategory === cat.id ? "active" : ""}`}
                onClick={() => setSelectedSkillCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="skills-cards-grid">
            {filteredSkills.map((skill) => {
              const IconComp = skill.icon;
              return (
                <div key={skill.name} className="skill-card glass-panel">
                  <div className="skill-icon-wrapper">
                    <IconComp size={22} />
                  </div>
                  <h3>{skill.name}</h3>
                  <p>{skill.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="section">
          <div className="section-heading">
            <span className="section-num">03</span>
            <h2>Featured Projects</h2>
          </div>

          <div className="skills-filter-tabs">
            {["all", "Full-Stack", "Web Apps", "APIs"].map((cat) => (
              <button
                key={cat}
                className={`tab-btn ${selectedProjectCategory === cat ? "active" : ""}`}
                onClick={() => setSelectedProjectCategory(cat)}
              >
                {cat === "all" ? "All Projects" : cat}
              </button>
            ))}
          </div>

          <div className="projects-grid">
            {filteredProjects.map((project) => (
              <article key={project.id} className="project-card glass-panel">
                {project.image && (
                  <img src={project.image} alt={project.title} className="project-thumbnail" />
                )}
                <div className="project-content">
                  <div className="project-top-row">
                    <span className="project-type-tag">{project.type}</span>
                    <div className="project-actions">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        title="View Code on GitHub"
                      >
                        <Github size={18} />
                      </a>
                    </div>
                  </div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.description}</p>
                  <div className="tech-tags">
                    {project.tech.map((t) => (
                      <span key={t} className="tech-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                  <button
                    className="project-details-btn"
                    onClick={() => setActiveModalProject(project)}
                  >
                    <span>View Architecture Details</span>
                    <Eye size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* SERVICES / CAPABILITIES SECTION */}
        <section id="services" className="section">
          <div className="section-heading">
            <span className="section-num">04</span>
            <h2>Core Capabilities</h2>
          </div>

          <div className="services-grid">
            {services.map((service) => (
              <div key={service.num} className="service-card glass-panel">
                <div className="service-num">{service.num}</div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* EXPERIENCE & EDUCATION SECTION */}
        <section id="experience" className="section">
          <div className="section-heading">
            <span className="section-num">05</span>
            <h2>Experience & Education</h2>
          </div>

          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-node"></div>
              <span className="timeline-date">JUN 2026 — AUG 2026</span>
              <h3 className="timeline-title">Python Full-Stack Developer Intern</h3>
              <div className="timeline-org">Infosys Springboard</div>
              <p className="timeline-desc">
                Engaged in comprehensive full-stack development. Built RESTful microservices using Flask and FastAPI, developed reactive frontend views in React.js, structured PostgreSQL/MySQL schemas, and managed codebase versions with Git/GitHub.
              </p>
            </div>

            <div className="timeline-item">
              <div className="timeline-node"></div>
              <span className="timeline-date">2024 — PRESENT</span>
              <h3 className="timeline-title">Master of Computer Applications (MCA)</h3>
              <div className="timeline-org">Computer Applications</div>
              <p className="timeline-desc">
                Advanced studies focusing on software engineering principles, database management systems, web technologies, algorithm design, and modern application development frameworks.
              </p>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="section">
          <div className="section-heading">
            <span className="section-num">06</span>
            <h2>Get In Touch</h2>
          </div>

          <div className="contact-container">
            <div className="contact-info-card glass-panel">
              <div>
                <h2>Let's build something remarkable together.</h2>
                <p>
                  Whether you have an open full-time position, a freelance web development project, or just want to connect — my inbox is always open.
                </p>

                <div className="contact-details-list">
                  <div className="contact-detail-item">
                    <div className="contact-icon-box">
                      <Mail size={18} />
                    </div>
                    <div>
                      <small style={{ color: "var(--text-dim)", display: "block" }}>Email</small>
                      <strong>madakattedattatri29@gmail.com</strong>
                    </div>
                  </div>

                  <div className="contact-detail-item">
                    <div className="contact-icon-box">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <small style={{ color: "var(--text-dim)", display: "block" }}>Location</small>
                      <strong>India {indiaTime && `(${indiaTime} IST)`}</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="hero-actions">
                <button className="btn primary" onClick={handleCopyEmail}>
                  <Mail size={18} /> Copy Email
                </button>
                <a
                  className="btn secondary"
                  href="https://www.linkedin.com/in/dattatri-madakatte-55450022a/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Linkedin size={18} /> LinkedIn
                </a>
              </div>
            </div>

            <div className="contact-form-card glass-panel">
              <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Your Email Address</label>
                  <input
                    type="email"
                    id="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="jane@example.com"
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message / Project Details</label>
                  <textarea
                    id="message"
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Hi Dattatri, I'd like to discuss a project..."
                    className="form-textarea"
                    required
                  />
                </div>

                <button type="submit" className="btn primary" style={{ width: "100%" }} disabled={formSubmitting}>
                  {formSubmitting ? "Sending..." : "Send Message"}
                </button>

                {formSuccess && (
                  <p style={{ color: "#34d399", fontSize: "14px", marginTop: "12px", textAlign: "center" }}>
                    ✓ Message sent successfully!
                  </p>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer>
        <div className="footer-content">
          <p>© {new Date().getFullYear()} Dattatri Madakatte. Built with React.js & Modern CSS.</p>
          <div className="footer-links">
            <a href="https://github.com/dattatrimadakatte/" target="_blank" rel="noreferrer">
              <Github size={16} /> GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/dattatri-madakatte-55450022a/"
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin size={16} /> LinkedIn
            </a>
          </div>
        </div>
      </footer>

      {/* MODALS & TOAST NOTIFICATIONS */}
      {activeModalProject && (
        <ProjectModal project={activeModalProject} onClose={() => setActiveModalProject(null)} />
      )}

      <ResumeModal isOpen={isResumeModalOpen} onClose={() => setIsResumeModalOpen(false)} />

      {toastMessage && (
        <div className="toast-notification">
          <Sparkles size={18} style={{ color: "var(--accent-primary)" }} />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
