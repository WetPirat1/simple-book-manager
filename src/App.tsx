import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add" element={<div>Add a Book Page</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
