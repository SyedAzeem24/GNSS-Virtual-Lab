import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import Learn from "./pages/Learn";
import Visibility from "./pages/Visibility";


function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/visibility" element={<Visibility />} />
         
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
