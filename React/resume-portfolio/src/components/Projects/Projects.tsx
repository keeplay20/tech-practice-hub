import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { projects, projectCategories } from "../../data/portfolio";
import "./Projects.css";

const Projects: React.FC = () => {
  // Set "react-native" as the default selected category
  const [selectedCategory, setSelectedCategory] = useState("react-native");

  // Filter projects based on selected category
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const tech = project.technologies.map((t) => t.toLowerCase());
      const category = project.category.toLowerCase();

      switch (selectedCategory) {
        case "react-native":
          return tech.includes("react native") || category.includes("mobile");
        case "react":
          return tech.includes("react") && !tech.includes("react native");
        case "javascript":
          return (
            tech.includes("javascript") &&
            !tech.includes("react") &&
            !tech.includes("react native")
          );
        default:
          return false;
      }
    });
  }, [selectedCategory]);

  // Get projects count for each category
  const getCategoryCount = (categoryId: string) => {
    return projects.filter((project) => {
      const tech = project.technologies.map((t) => t.toLowerCase());
      const category = project.category.toLowerCase();

      switch (categoryId) {
        case "react-native":
          return tech.includes("react native") || category.includes("mobile");
        case "react":
          return tech.includes("react") && !tech.includes("react native");
        case "javascript":
          return (
            tech.includes("javascript") &&
            !tech.includes("react") &&
            !tech.includes("react native")
          );
        default:
          return false;
      }
    }).length;
  };

  return (
    <section id="projects" className="projects-section section">
      <div className="container">
        <div className="projects-header">
          <h2 className="section-title text-gradient">My Projects</h2>
          <p className="section-subtitle">
            A showcase of my recent work, highlighting technical skills and
            problem-solving abilities.
          </p>
        </div>

        <div className="projects-layout">
          {/* Left Sidebar - Category Navigation */}
          <div className="projects-sidebar">
            <h3 className="sidebar-title">Categories</h3>
            <div className="category-list">
              {projectCategories.map((category, index) => {
                const count = getCategoryCount(category.id);
                return (
                  <motion.button
                    key={category.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`category-item ${
                      selectedCategory === category.id
                        ? "category-item--active"
                        : ""
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <span className="category-icon">{category.icon}</span>
                    <span className="category-name">{category.name}</span>
                    <span className="category-count">{count}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Right Content - Projects Grid */}
          <div className="projects-content">
            <div className="projects-grid">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="project-card"
                >
                  <div className="project-header">
                    <div className="project-status">
                      <div className="status-badges">
                        <span
                          className={`status-badge ${project.status
                            .toLowerCase()
                            .replace(" ", "-")}`}
                        >
                          {project.status}
                        </span>
                        <span className="project-category">
                          {project.category}
                        </span>
                      </div>
                      <div className="project-actions-header">
                        {project.downloadLinks?.apk && (
                          <a
                            href={project.downloadLinks.apk}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="action-btn primary compact"
                          >
                            <span className="btn-icon">📱</span>
                            Download APK
                          </a>
                        )}
                      </div>
                    </div>
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-description">{project.description}</p>
                  </div>

                  <div className="project-content">
                    {/* Demo and Content Section */}
                    <div className="demo-content-section">
                      <div className="demo-content-container">
                        {/* Left Column - App Demo */}
                        <div className="demo-column">
                          <h4>App Demo</h4>
                          {project.demoVideo && (
                            <div className="project-demo">
                              <div className="demo-container">
                                {project.demoVideo.includes(".gif") ? (
                                  <img
                                    src={project.demoVideo}
                                    alt="App Demo GIF"
                                    className="demo-gif"
                                    onError={(e) =>
                                      console.error("GIF loading error:", e)
                                    }
                                    onLoad={() =>
                                      console.log("GIF loaded successfully")
                                    }
                                  />
                                ) : project.demoVideo.includes("youtube.com") ||
                                  project.demoVideo.includes("youtu.be") ? (
                                  <iframe
                                    src={project.demoVideo.replace(
                                      "watch?v=",
                                      "embed/"
                                    )}
                                    title="App Demo Video"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                  ></iframe>
                                ) : (
                                  <div className="demo-placeholder">
                                    <div className="placeholder-content">
                                      <span className="placeholder-icon">
                                        🎬
                                      </span>
                                      <p>
                                        Create a GIF from your iOS simulator
                                        demo and add it here!
                                      </p>
                                      <p className="placeholder-hint">
                                        Update <code>demoVideo</code> in
                                        portfolio.ts with your .gif file path
                                      </p>
                                      <div className="placeholder-steps">
                                        <p>
                                          <strong>Steps:</strong>
                                        </p>
                                        <p>
                                          1. Record iOS simulator → Export as
                                          .mov
                                        </p>
                                        <p>
                                          2. Convert to GIF using online tool or
                                          ffmpeg
                                        </p>
                                        <p>3. Add to public/images/ folder</p>
                                        <p>
                                          4. Update path:
                                          "/images/moviebuzz-demo.gif"
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Right Column - Key Highlights and Technologies */}
                        <div className="project-info-column">
                          {/* Key Highlights */}
                          <div className="project-highlights">
                            <h4>Key Highlights</h4>
                            <div className="highlights-list">
                              {project.highlights.map((highlight, idx) => (
                                <div key={idx} className="highlight-item">
                                  {highlight}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Technologies */}
                          <div className="project-tech">
                            <h4>Technologies Used</h4>
                            <div className="tech-tags">
                              {project.technologies.map((tech, idx) => (
                                <span key={idx} className="tech-tag">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
