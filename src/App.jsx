import { Route, Routes } from "react-router";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import { useState } from "react";
import ContextProvider from "../Context/Context";

function App() {
  const [college, setCollege] = useState({});
  return (
    <>
      <ContextProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <h1 className="text-3xl font-bold underline text-center">
          Hello world!
        </h1>
      </ContextProvider>
    </>
  );
}

export default App;
