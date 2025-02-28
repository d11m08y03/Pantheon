import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home"; 
import PastEvents from "./pages/PastEvents";
import { LinksEnum } from "./lib/LinksEnum"; 
import AdminEvent from "./pages/Admin";
import Login from "./pages/Login";
import UpcomingEvents from "./components/UpcomingEvents";
import SplashScreen from "./pages/Splash-Screen";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 5000); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      {showSplash ? (
        <SplashScreen />
      ) : (
        <Routes>
          <Route path={LinksEnum.HOME} element={<Home />} />
          <Route path={LinksEnum.PAST_EVENTS} element={<PastEvents />} />
          <Route path={LinksEnum.ADMIN} element={<AdminEvent />} />
          <Route path={LinksEnum.LOGIN} element={<Login />} />
          <Route path={LinksEnum.UPCOMING_EVENTS} element={<UpcomingEvents />} />
          <Route path="*" element={<Home />} /> {/* Fallback route */}
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default App;
