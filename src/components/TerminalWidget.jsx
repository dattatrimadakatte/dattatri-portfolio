import React, { useState } from 'react';
import { Terminal, Copy, Check, Code, FileCode, Play, Sparkles } from 'lucide-react';

const files = {
  'developer.py': `class FullStackDeveloper:
    def __init__(self):
        self.name = "Dattatri Madakatte"
        self.role = "Full-Stack Developer & Engineer"
        self.education = "MCA (Masters of Computer Applications)"
        self.location = "India"
        self.status = "Open for Freelance & Full-Time Roles"

    def get_core_stack(self):
        return {
            "frontend": ["React.js", "JavaScript (ES6+)", "HTML5/CSS3"],
            "backend": ["Python", "FastAPI", "Flask", "REST APIs"],
            "database": ["PostgreSQL", "MySQL", "SQLAlchemy"],
            "tools": ["Git", "GitHub", "Docker", "Redis", "WebSockets"]
        }

    def build_solution(self, prompt):
        return f"Transforming {prompt} into high-performance web app..."

dev = FullStackDeveloper()
print(dev.build_solution("Your Vision"))`,

  'stack.json': `{
  "developer": "Dattatri Madakatte",
  "frontend": {
    "framework": "React.js",
    "languages": ["JavaScript", "HTML5", "CSS3"],
    "styling": "Vanilla CSS & Modern Layouts"
  },
  "backend": {
    "frameworks": ["FastAPI", "Flask"],
    "languages": ["Python"],
    "protocols": ["REST", "WebSockets", "JWT Auth"]
  },
  "database": ["PostgreSQL", "MySQL"],
  "devops": ["Docker", "Git/GitHub", "Redis", "Celery"]
}`,

  'contact.ts': `interface DeveloperContact {
  email: string;
  linkedin: string;
  github: string;
  availability: boolean;
}

export const contactInfo: DeveloperContact = {
  email: "madakattedattatri29@gmail.com",
  linkedin: "linkedin.com/in/dattatri-madakatte-55450022a",
  github: "github.com/dattatrimadakatte",
  availability: true
};`
};

export function TerminalWidget({ onExecuteCommand }) {
  const [activeTab, setActiveTab] = useState('developer.py');
  const [copied, setCopied] = useState(false);
  const [commandInput, setCommandInput] = useState('');
  const [logs, setLogs] = useState([
    { type: 'sys', text: 'Terminal initialized. Type "help" for interactive commands.' }
  ]);

  const handleCopy = () => {
    navigator.clipboard.writeText(files[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const cmd = commandInput.trim().toLowerCase();
    if (!cmd) return;

    const newLogs = [...logs, { type: 'cmd', text: `$ ${commandInput}` }];

    if (cmd === 'help') {
      newLogs.push({
        type: 'res',
        text: 'Available commands: projects | skills | contact | about | clear'
      });
    } else if (cmd === 'projects') {
      newLogs.push({
        type: 'res',
        text: 'Featured Projects: 1. FleetFlow (Logistics) | 2. EduHub (Educational Portal) | 3. Flask Todo App'
      });
      if (onExecuteCommand) onExecuteCommand('projects');
    } else if (cmd === 'skills') {
      newLogs.push({
        type: 'res',
        text: 'Core Tech: React.js, Python, FastAPI, PostgreSQL, REST APIs, WebSockets, Docker'
      });
      if (onExecuteCommand) onExecuteCommand('skills');
    } else if (cmd === 'contact' || cmd === 'email') {
      newLogs.push({
        type: 'res',
        text: 'Email: madakattedattatri29@gmail.com | Status: Available for work'
      });
      if (onExecuteCommand) onExecuteCommand('contact');
    } else if (cmd === 'about') {
      newLogs.push({
        type: 'res',
        text: 'MCA Graduate & Full-Stack Developer passionate about clean code and modern web apps.'
      });
      if (onExecuteCommand) onExecuteCommand('about');
    } else if (cmd === 'clear') {
      setLogs([]);
      setCommandInput('');
      return;
    } else {
      newLogs.push({
        type: 'err',
        text: `Command not recognized: "${cmd}". Type "help" for commands.`
      });
    }

    setLogs(newLogs);
    setCommandInput('');
  };

  return (
    <div className="terminal-widget-container">
      <div className="terminal-header">
        <div className="window-controls">
          <span className="dot red"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>
        </div>
        <div className="file-tabs">
          {Object.keys(files).map((fileName) => (
            <button
              key={fileName}
              className={`file-tab ${activeTab === fileName ? 'active' : ''}`}
              onClick={() => setActiveTab(fileName)}
            >
              <FileCode size={13} />
              <span>{fileName}</span>
            </button>
          ))}
        </div>
        <button className="copy-code-btn" onClick={handleCopy} title="Copy code">
          {copied ? <Check size={14} className="copied-icon" /> : <Copy size={14} />}
        </button>
      </div>

      <div className="code-content-wrapper">
        <pre className="code-display">
          <code>{files[activeTab]}</code>
        </pre>
      </div>

      <div className="terminal-shell">
        <div className="shell-logs">
          {logs.map((log, index) => (
            <div key={index} className={`log-line ${log.type}`}>
              {log.text}
            </div>
          ))}
        </div>
        <form onSubmit={handleCommandSubmit} className="shell-input-form">
          <span className="prompt-symbol">❯</span>
          <input
            type="text"
            value={commandInput}
            onChange={(e) => setCommandInput(e.target.value)}
            placeholder="Type 'help', 'projects', 'skills'..."
            className="shell-input"
          />
          <button type="submit" className="shell-submit-btn" aria-label="Run command">
            <Play size={12} />
          </button>
        </form>
      </div>
    </div>
  );
}
