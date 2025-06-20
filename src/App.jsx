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
import NotFoundPage from "././components/hero/Not-found";
import UpdateLabs from "./components/admin/Forms/Labs/UpdateLabs";
import CreateEvent from "./components/admin/Forms/Events/CreateEvent";
import AdminEvents from "./components/admin/Forms/Events/AdminEvents";
import UpdateEvent from "./components/admin/Forms/Events/UpdateEvent";
import ViewEvents from "./components/admin/Forms/Events/ViewEvents";
import DeleteEvent from "./components/admin/Forms/Events/DeleteEvent";
import AdminNotifications from "./components/admin/Forms/Notifications/AdminNotifications";
import AddNotification from "./components/admin/Forms/Notifications/AddNotification";
import DeleteNotification from "./components/admin/Forms/Notifications/DeleteNotification";
import UpdateNotification from "./components/admin/Forms/Notifications/UpdateNotification";
import DeleteResults from "./components/admin/Forms/Results/DeleteResults";
import DeletePlacements from "./components/admin/Forms/Placements/DeletePlacements";
import UpdateInfo from "./components/admin/Forms/College_Info/UpdateInfo";
import AdminCollegeInfo from "./components/admin/Forms/College_Info/AdminCollegeInfo";
import EventDetails from "./components/Events/EventDetails";
import Facilities from "./pages/Facilities";
import AdminFacility from "./components/admin/Forms/Facility/AdminFacility";
import AddFacility from "./components/admin/Forms/Facility/AddFacility";
import DeleteFacility from "./components/admin/Forms/Facility/DeleteFacility";
import UpdateFacility from "./components/admin/Forms/Facility/UpdateFacility";
import Academics from "./components/Academics/Academics";
import Library from "../src/pages/Library";
import AdminLibrary from "./components/admin/Forms/Library/AdminLibrary";
import AddBook from "./components/admin/Forms/Library/AddBook";
import DeleteBook from "./components/admin/Forms/Library/DeleteBook";
import UpdateBook from "./components/admin/Forms/Library/UpdateBook";
import AdminEbook from "./components/admin/Forms/Ebook/AdminEbook";
import AddEbook from "./components/admin/Forms/Ebook/AddEbook";
import DeleteEbook from "./components/admin/Forms/Ebook/DeleteEbook";
import AdmissionProcess from "./components/AboutPageSections/AdmissionProcess";
import StudentList from "./pages/StudentsList";
import AdminStudents from "./components/admin/Forms/Students/AdminStudents";
import AddStudents from "./components/admin/Forms/Students/AddStudents";
import UpdateImage from "./components/admin/Forms/College_Info/Image";

function App() {
  const [college, setCollege] = useState({});
  return (
    <>
      <ContextProvider>
        <Header />
        <div className="mt-24">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/library" element={<Library />} />
            <Route path="/admissions" element={<Admissions />} />
            <Route path="/admissionprocess" element={<AdmissionProcess />} />
            <Route path="/academics" element={<Academics />} />
            <Route path="/students" element={<StudentList />} />
            <Route path="/committees" element={<Committees />} />
            <Route path="/committee/:id" element={<Committee />} />
            {/* <Route path="/departments" element={<Departments />} /> */}
            <Route path="/departments" element={<Department />} />
            <Route path="/department/:depo_code" element={<Department />}>
              <Route path="faculty" element={<Faculties />} />
              <Route path="labs" element={<Labs />} />
              <Route path="placements" element={<Placements />} />
            </Route>
            <Route path="/results" element={<Results />} />
            <Route path="/placements" element={<Placements />} />
            <Route path="/events" element={<Events />} />
            <Route path="/facilities" element={<Facilities/>} />
            <Route path="/events/:id" element={<EventDetails />} />
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
                <Route path="show" element={<ShowDepartments />} />
                <Route path="update" element={<UpdateDepartment />} />
                <Route path="update/:depo_code" element={<UpdateDepartment />} />
              </Route>
              {/* Committees Routes */}
              <Route path="committees" element={<AdminCommittees />}>
                <Route path="" element={<AddCommittee />} /> {/* default route */}
                <Route path="add" element={<AddCommittee />} />
                <Route path="delete" element={<DeleteCommittee />} />
                <Route path="add-member" element={<AddMember />} />
                {/* <Route path="delete-member" element={<DeleteCommittee />} /> */}
                <Route path="update" element={<UpdateCommittee />} />
              </Route>
              {/* Committees Routes */}
              <Route path="labs" element={<AdminLabs />}>
                <Route path="" element={<AddLabs />} /> {/* default route */}
                <Route path="add" element={<AddLabs />} />
                <Route path="delete" element={<DeleteLabs />} />
                <Route path="update" element={<UpdateLabs />} />
              </Route>
              {/* Admission Routes */}
              <Route path="admissions" element={<AddAdmission />}></Route>
              {/* Results Routes */}
              <Route path="results" element={<AdminResults />}>
                <Route path="add" element={<AddResults />} />
                <Route path="" element={<AddResults />} />
                <Route path="delete" element={<DeleteResults />} />
              </Route>
              {/* Placements Routes */}
              <Route path="placements" element={<AdminPlacements />}>
                <Route path="add" element={<AddPlacements />} />
                <Route path="" element={<AddPlacements />} />
                <Route path="delete" element={<DeletePlacements />} />
              </Route>
              {/* Notifications Routes */}
              <Route path="notifications" element={<AdminNotifications />}>
                <Route path="" element={<AddNotification />} />
                <Route path="add" element={<AddNotification />} />
                <Route path="delete" element={<DeleteNotification />} />
                <Route path="update" element={<UpdateNotification />} />
                <Route path="view" element={<AdminNotifications />} />
              </Route>
              {/* Events Routes */}
              <Route path="events" element={<AdminEvents />}>
                <Route path="" element={<CreateEvent />} />
                <Route path="create" element={<CreateEvent />} />
                <Route path="update" element={<UpdateEvent />} />
                <Route path="view" element={<ViewEvents />} />
                <Route path="delete" element={<DeleteEvent />} />
              </Route>
              <Route path="college-info" element={<AdminCollegeInfo />}>
                <Route path="" element={<UpdateInfo />} />
                <Route path="info" element={<UpdateInfo />} />
                <Route path="image" element={<UpdateImage />} />
              </Route>
              <Route path="facility" element={<AdminFacility/>}>
                <Route path="" element={<AddFacility />} />
                <Route path="add" element={<AddFacility />} />
                <Route path="delete" element={<DeleteFacility />} />
                <Route path="update" element={<UpdateFacility />} />
              </Route>
              <Route path="library" element={<AdminLibrary />} >
                 <Route path="" element={<AddBook />} />
                 <Route path="add" element={<AddBook />} />
                 <Route path="delete" element={<DeleteBook />} />
                 <Route path="update" element={<UpdateBook/>} />
                </Route>
                 <Route path="ebook" element={<AdminEbook />} >
                 <Route path="" element={<AddEbook />} />
                 <Route path="add" element={<AddEbook />} />
                 <Route path="delete" element={<DeleteEbook />} />
                 {/* <Route path="update" element={<UpdateBook/>} /> */}
                </Route>
                <Route path="students" element={<AdminStudents />} >
                 <Route path="" element={<AddStudents />} />
                 <Route path="add" element={<AddStudents />} />
                 <Route path="delete" element={<DeleteEbook />} />
                 {/* <Route path="update" element={<UpdateBook/>} /> */}
                </Route>

            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </ContextProvider>
    </>
  );
}

export default App;
