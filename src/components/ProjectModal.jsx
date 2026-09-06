import React, { useEffect } from 'react';
import { X, ExternalLink, Github, CheckCircle2, Layers, Cpu, Code } from 'lucide-react';

export function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="modal-header">
          <span className="modal-badge">{project.type}</span>
          <h2>{project.title}</h2>
          <p className="modal-subtitle">{project.description}</p>
        </div>

        {project.image && (
          <div className="modal-image-container">
            <img src={project.image} alt={project.title} className="modal-project-img" />
          </div>
        )}

        <div className="modal-body">
          <div className="modal-section">
            <h3><Layers size={18} /> Architecture & System Overview</h3>
            <p>{project.architecture || project.description}</p>
          </div>

          {project.highlights && project.highlights.length > 0 && (
            <div className="modal-section">
              <h3><CheckCircle2 size={18} /> Key Technical Features</h3>
              <ul className="highlights-list">
                {project.highlights.map((item, idx) => (
                  <li key={idx}>
                    <span className="bullet"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="modal-section">
            <h3><Cpu size={18} /> Technology Stack</h3>
            <div className="modal-tech-tags">
              {project.tech.map((t) => (
                <span key={t} className="modal-tech-pill">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          {project.link && (
            <a href={project.link} target="_blank" rel="noreferrer" className="btn primary">
              <Github size={18} /> View GitHub Repository
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn secondary">
              <ExternalLink size={18} /> Live Demo
            </a>
          )}
          <button className="btn outline" onClick={onClose}>
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}
