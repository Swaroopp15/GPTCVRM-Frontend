import { Route, Routes } from "react-router";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import { useState } from "react";
import ContextProvider from "../Context/Context";
import Departments from "./pages/Departments";
import Department from "./pages/Department";
import Faculty from "./pages/Faculty";
import Labs from "./pages/Labs";
import Placements from "./pages/Placements";
import About from "./pages/About";
import Committees from "./pages/Committees";
import Committee from "./pages/Committee";
import Results from "./pages/Results";
import AdminLogin from "./pages/Login";
import Events from "./pages/Events";
import Notifications from "./pages/Notifications";
import Admin from "./pages/Admin";

function App() {
  const [college, setCollege] = useState({});
  return (
    <>
      <ContextProvider>
        <Header />
        <div className="mt-24">

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/committees" element={<Committees />} />
          <Route path="/committee/:id" element={<Committee />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/department/:depo_code" element={<Department />} >
            <Route path="faculty" element={<Faculty/>} />
            <Route path="labs" element={<Labs/>} />
            <Route path="placements" element={<Placements/>} />
          </Route>
          <Route path="/results" element={<Results/>} />
          <Route path="/placements" element={<Placements/>} />
          <Route path="/events" element={<Events />} />
          <Route path="/admin" element={<Admin/>} />
          <Route path="/login" element={<AdminLogin/>}/>
          <Route path="/notifications" element={<Notifications/>} />
        </Routes>
        </div>
      </ContextProvider>
    </>
  );
}

export default App;
