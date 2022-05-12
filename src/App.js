import Home from "./Containers/Home/Home";
import CreateTeam from "./Containers/CreateTeam/index";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/createteam" element={<CreateTeam />} />
    </Routes>
  );
}

export default App;
