import { Routes, Route } from "react-router-dom";
import Navbar from "./global/Nav";
import Mint from "./mint/Mint";
import CollectorFond from "./collector/CollectorFond";
import AdminPanel from "./admin/AdminPanel";
import AdminPanelStart from "./admin/AdminPanelStart";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path=":id?" element={<Mint />}></Route>
        <Route path="/admin" element={<AdminPanelStart />}></Route>
        <Route path="/admin/:id" element={<AdminPanel />}></Route>
        <Route path="/mint" element={<Mint />}></Route>
        <Route path="/collectorfond" element={<CollectorFond />}></Route>
      </Routes>
    </div>
  );
}

export default App;