import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/home/Home";
import "./App.css";
import Faq from "./pages/faq/Faq";
import Nav from "./components/nav/Nav";
import Footer from "./pages/footer/Footer";
import Guestbook from "./pages/guestbook/Guestbook";
import RSVPForm from "./pages/rsvp/RSVPForm";
import Dashboard from "./pages/dashboard/Dashboard";
import ScrollToTop from "./ScrollToTop";

function AppContent() {
  const location = useLocation();
  const hideNavFooter = location.pathname === "/dashboard";

  return (
    <>
      {!hideNavFooter && <Nav />}
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/guest-book" element={<Guestbook />} />
        <Route path="/rsvp" element={<RSVPForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      {!hideNavFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
