import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home"; 
import PastEvents from "./pages/PastEvents";
import { LinksEnum } from "./lib/LinksEnum"; 
import AdminEvent from "./pages/Admin";
import Login from "./pages/Login";
import UpcomingEvents from "./components/UpcomingEvents";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={LinksEnum.HOME} element={<Home />} />
        <Route path={LinksEnum.PAST_EVENTS} element={<PastEvents />} />
        <Route path={LinksEnum.ADMIN} element={<AdminEvent />} />
        <Route path={LinksEnum.LOGIN} element={<Login />} />
        <Route path={LinksEnum.UPCOMING_EVENTS} element={<UpcomingEvents />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
