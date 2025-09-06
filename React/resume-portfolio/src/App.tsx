import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Experience from "./components/Experience/Experience";
import Skills from "./components/Skills/Skills";
import GameCenter from "./components/GameCenter/GameCenter";
import ProjectsPage from "./components/ProjectsPage/ProjectsPage";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";

type Page = "portfolio" | "games" | "projects";

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("portfolio");

  return (
    <div className="App">
      <AnimatePresence mode="wait">
        {currentPage === "portfolio" ? (
          <motion.div
            key="portfolio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Header 
              onGameCenterClick={() => setCurrentPage("games")}
              onProjectsClick={() => setCurrentPage("projects")}
            />
            <main>
              <Hero />
              <About />
              <Experience />
              <Skills />
              <Contact />
            </main>
            <Footer />
          </motion.div>
        ) : currentPage === "games" ? (
          <motion.div
            key="games"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <GameCenter onBack={() => setCurrentPage("portfolio")} />
          </motion.div>
        ) : (
          <motion.div
            key="projects"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ProjectsPage onBack={() => setCurrentPage("portfolio")} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
