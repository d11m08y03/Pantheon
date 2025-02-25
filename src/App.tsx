import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home"; 
import IncomingEvents from "./pages/Incoming-events";
import PastEvents from "./pages/PastEvents";
import { LinksEnum } from "./lib/LinksEnum"; 
import AdminEvent from "./pages/Admin";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={LinksEnum.HOME} element={<Home />} />
        <Route path={LinksEnum.INCOMING_EVENTS} element={<IncomingEvents />} />
        <Route path={LinksEnum.PAST_EVENTS} element={<PastEvents />} />
        <Route path={LinksEnum.ADMIN} element={<AdminEvent />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
