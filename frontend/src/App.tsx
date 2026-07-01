import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Studio from "./pages/Studio";
import Journal from "./pages/Journal";
import Contact from "./pages/Contact";
import Legal from "./pages/Legal";
import DesignLab from "./pages/DesignLab";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ComingSoon from "./pages/ComingSoon";
import IntroVideo from "./components/IntroVideo";
import ServiceDetail from "./pages/ServiceDetail";

export default function App() {
  const [showIntro, setShowIntro] = useState(() => {
    // Check sessionStorage so we only play the video intro once per tab session
    return !sessionStorage.getItem("introPlayed");
  });

  const handleIntroComplete = () => {
    sessionStorage.setItem("introPlayed", "true");
    setShowIntro(false);
  };

  return (
    <>
      {showIntro && <IntroVideo onComplete={handleIntroComplete} />}
      <Router>
        <ScrollToTop />
        <Layout isIntroActive={showIntro}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/services/:serviceId" element={<ServiceDetail />} />
            <Route path="/studio" element={<Studio />} />
            <Route path="/journal" element={<Navigate to="/coming-soon" replace />} />
            <Route path="/coming-soon" element={<ComingSoon />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/design-lab" element={<DesignLab />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

