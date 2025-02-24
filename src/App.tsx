import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { LinksEnum } from "./lib/LinksEnum";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={LinksEnum.HOME} element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
