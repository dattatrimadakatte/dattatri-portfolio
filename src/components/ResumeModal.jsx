import React, { useEffect, useState } from 'react';
import { X, Download, Printer, Copy, Check, Briefcase, GraduationCap, Code2, Mail, MapPin } from 'lucide-react';

export function ResumeModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopySummary = () => {
    const text = `Dattatri Madakatte — Full-Stack Developer
Email: madakattedattatri29@gmail.com | Location: India
Education: Master of Computer Applications (MCA)
Skills: React.js, Python, FastAPI, PostgreSQL, REST APIs, WebSockets, Docker, Git
Experience: Python Full-Stack Developer Intern @ Infosys Springboard (Jun 2026 - Aug 2026)`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content glass-panel resume-modal-panel" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="resume-actions-bar">
          <button className="btn primary small" onClick={handlePrint}>
            <Printer size={15} /> Print / Save PDF
          </button>
          <button className="btn secondary small" onClick={handleCopySummary}>
            {copied ? <Check size={15} /> : <Copy size={15} />} {copied ? 'Copied Summary!' : 'Copy Summary'}
          </button>
        </div>

        <div className="printable-resume">
          <header className="resume-header">
            <h1>DATTATRI MADAKATTE</h1>
            <p className="resume-tagline">Full-Stack Developer & Software Engineer</p>
            <div className="resume-contact-row">
              <span><Mail size={14} /> madakattedattatri29@gmail.com</span>
              <span><MapPin size={14} /> India</span>
              <span>LinkedIn: dattatri-madakatte</span>
              <span>GitHub: dattatrimadakatte</span>
            </div>
          </header>

          <hr className="resume-divider" />

          <section className="resume-sec">
            <h3>PROFESSIONAL SUMMARY</h3>
            <p>
              Motivated MCA graduate and Full-Stack Developer with experience building scalable web applications using React.js for modern frontends and Python / FastAPI for reliable backend microservices. Proven proficiency in PostgreSQL database design, REST APIs, asynchronous task queues, and version control workflows.
            </p>
          </section>

          <section className="resume-sec">
            <h3>TECHNICAL SKILLS</h3>
            <ul className="resume-skills-list">
              <li><strong>Frontend:</strong> React.js, JavaScript (ES6+), HTML5, CSS3, Responsive Web Design</li>
              <li><strong>Backend:</strong> Python, FastAPI, Flask, REST API Architecture, JWT Auth, WebSockets</li>
              <li><strong>Databases & Tools:</strong> PostgreSQL, MySQL, Docker, Redis, Celery, Git, GitHub</li>
            </ul>
          </section>

          <section className="resume-sec">
            <h3>EXPERIENCE</h3>
            <div className="resume-exp-item">
              <div className="exp-head">
                <strong>Python Full-Stack Developer Intern</strong>
                <span>Jun 2026 — Aug 2026</span>
              </div>
              <p className="company-name">Infosys Springboard</p>
              <ul>
                <li>Developed full-stack web applications integrating React.js frontend interfaces with Flask & FastAPI services.</li>
                <li>Designed RESTful API endpoints and configured relational database schemas using PostgreSQL and MySQL.</li>
                <li>Utilized Git version control and participated in code review and module integration workflows.</li>
              </ul>
            </div>
          </section>

          <section className="resume-sec">
            <h3>EDUCATION</h3>
            <div className="resume-exp-item">
              <div className="exp-head">
                <strong>Master of Computer Applications (MCA)</strong>
                <span>2024 — Present</span>
              </div>
              <p className="company-name">Computer Applications</p>
            </div>
          </section>

          <section className="resume-sec">
            <h3>FEATURED PROJECTS</h3>
            <div className="resume-project-item">
              <strong>FleetFlow — Full-Stack Logistics Platform</strong>
              <p>Built a comprehensive logistics tracking system using React.js, FastAPI, PostgreSQL, WebSockets, Redis, and Celery for real-time fleet updates.</p>
            </div>
            <div className="resume-project-item">
              <strong>EduHub — Educational Management Portal</strong>
              <p>Educational management portal designed to organize and manage educational information through a structured web interface with MySQL integration and CRUD operations.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
