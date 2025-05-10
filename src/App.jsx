import { Route, Routes } from "react-router";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import { useState } from "react";
import ContextProvider from "../Context/Context";
import Departments from "./pages/Departments";
import Department from "./pages/Department";
import Faculty from "./components/admin/Forms/Faculty/Faculty";
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
import AddFaculty from "./components/admin/Forms/Faculty/AddFaculty";
import DashBoard from "./components/admin/DashBoard";
import DeleteFaculty from "./components/admin/Forms/Faculty/DeleteFaculty";
import AdminDepartments from "./components/admin/Forms/Departments/AdminDepartments";
import AddDepartment from "./components/admin/Forms/Departments/AddDepartment";
import DeleteDepartment from "./components/admin/Forms/Departments/DeleteDepartment";
import AdminCommittees from "./components/admin/Forms/Committees/AdminCommittees";
import AddCommittee from "./components/admin/Forms/Committees/AddCommittees";
import DeleteCommitee from "./components/admin/Forms/Committees/DeleteCommittees";
import DeleteCommittee from "./components/admin/Forms/Committees/DeleteCommittees";
import AddMember from "./components/admin/Forms/Committees/AddMembers";
import AdminLabs from "./components/admin/Forms/Labs/AdminLabs";
import AddLabs from "./components/admin/Forms/Labs/AddLabs";
import AddAdmission from "./components/admin/Forms/Admission/AddAdmission";
import Admissions from "./pages/Admissions";
import AdminResults from "./components/admin/Forms/Results/AdminResults";
import AddResults from "./components/admin/Forms/Results/AddResults";
import AdminPlacements from "./components/admin/Forms/Placements/AdminPlacements";
import AddPlacements from "./components/admin/Forms/Placements/AddPlacements";
import ShowDepartments from "./components/admin/Forms/Departments/ShowDepatments";
import Contact from "./pages/Contact";
import Faculties from "./pages/Faculties";
import UpdateDepartment from "./components/admin/Forms/Departments/UpdateDepartment";
import UpdateCommittee from "./components/admin/Forms/Committees/UpdateCommittee";
import UpdateFaculty from "./components/admin/Forms/Faculty/UpdateFaculty";
import DeleteLabs from "./components/admin/Forms/Labs/DeleteLabs";
import NotFoundPage from "./pages/Not-found";
import UpdateLabs from "./components/admin/Forms/Labs/UpdateLabs";
import CreateEvent from "./components/admin/Forms/Events/CreateEvent";
import AdminEvents from "./components/admin/Forms/Events/AdminEvents";
import UpdateEvent from "./components/admin/Forms/Events/UpdateEvent";
import ViewEvents from "./components/admin/Forms/Events/ViewEvents";
function App() {
  const [college, setCollege] = useState({});
  return (
    <>
      <ContextProvider>
        <Header />
        <div className="mt-24">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="contact" element={<Contact/>}/>
            <Route path="/about" element={<About />} />
            <Route path="/admissions" element={<Admissions/>} />
            <Route path="/committees" element={<Committees />} />
            <Route path="/committee/:id" element={<Committee />} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/department/:depo_code" element={<Department />}>
              <Route path="faculty" element={<Faculties />} />
              <Route path="labs" element={<Labs />} />
              <Route path="placements" element={<Placements />} />
            </Route>
            <Route path="/results" element={<Results />} />
            <Route path="/placements" element={<Placements />} />
            <Route path="/events" element={<Events />} />
            <Route path="/login" element={<AdminLogin />} />
            <Route path="/notifications" element={<Notifications />} />
            {/* admin routes */}
            <Route path="/admin" element={<Admin />}>
              <Route path="" element={<DashBoard />} />
              {/* Faculty Routes */}
              <Route path="faculty" element={<Faculty />}>
                <Route path="" element={<AddFaculty />} /> {/* default route */}
                <Route path="add" element={<AddFaculty />} />
                <Route path="delete" element={<DeleteFaculty />} />
                <Route path="update" element={<UpdateFaculty />} />
              </Route>
              {/* Departments Routes */}
              <Route path="departments" element={<AdminDepartments />}>
                <Route path="" element={<AddDepartment />} /> {/* default route */}
                <Route path="add" element={<AddDepartment />} />
                <Route path="delete" element={<DeleteDepartment />} />
                <Route path="show" element={<ShowDepartments/>}/>
                <Route path="update" element={<UpdateDepartment />} />
              </Route>
              {/* Committees Routes */}
              <Route path="committees" element={<AdminCommittees />}>
                <Route path="" element={<AddCommittee />} /> {/* default route */}
                <Route path="add" element={<AddCommittee />} />
                <Route path="delete" element={<DeleteCommittee />} />
                <Route path="add-member" element={<AddMember/>} />
                {/* <Route path="delete-member" element={<DeleteCommittee />} /> */}
                <Route path="update" element={<UpdateCommittee />} />
              </Route>
               {/* Committees Routes */}
               <Route path="labs" element={<AdminLabs />}>
                <Route path="" element={<AddLabs />} /> {/* default route */}
                <Route path="add" element={<AddLabs />} />
                <Route path="delete" element={<DeleteLabs />} />
                <Route path="update" element={<UpdateLabs/>} />
              </Route>
              {/* Admission Routes */}
              <Route path="admissions" element={<AddAdmission />}></Route>
              {/* Results Routes */}
              <Route path="results" element={<AdminResults/>}>
                <Route path="add" element={<AddResults/>} />
                <Route path="" element={<AddResults/>} />
              </Route>
              {/* Placements Routes */}
              <Route path="placements" element={<AdminPlacements/>}>
                <Route path="add" element={<AddPlacements/>} />
                <Route path="" element={<AddPlacements/>} />
              </Route>
              {/* Events Routes */}
              <Route path="events" element={<AdminEvents />}>
                <Route path="" element={<CreateEvent/>} />
                <Route path="create" element={<CreateEvent />} />
                <Route path="update" element={<UpdateEvent />} />
                <Route path="view" element={<ViewEvents />} />
                <Route path="delete" element={<DeleteLabs />} />
                </Route>
            </Route>
            <Route path="*" element={<NotFoundPage/>} />
          </Routes>
        </div>
      </ContextProvider>
    </>
  );
}

export default App;
