import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home"; 
import PastEvents from "./pages/PastEvents";
import { LinksEnum } from "./lib/LinksEnum"; 
import Login from "./pages/Login";
import SplashScreen from "./pages/Splash-Screen";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import AdminPanel from "./components/AdminPanel";
const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading of main elements (replace with real async logic if needed)
  useEffect(() => {
    // For demonstration, simulate a short loading period
    const load = setTimeout(() => setIsLoading(false), 800); // 800ms or replace with real loading
    return () => clearTimeout(load);
  }, []);

  return (
    <BrowserRouter>
      {isLoading ? (
        <SplashScreen isLoading={isLoading} />
      ) : (
        <Routes>
          <Route path={LinksEnum.HOME} element={<Home />} />
          <Route path={LinksEnum.PAST_EVENTS} element={<PastEvents />} />
          <Route path={LinksEnum.LOGIN} element={<Login />} />
          <Route path={LinksEnum.ADMINPANEL} element={<AdminPanel />} />
          <Route path="*" element={<Home />} /> {/* Fallback route */}
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default App;
