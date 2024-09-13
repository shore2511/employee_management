import React from "react";
import NavBar from "../src/Components/NavBar";
import { Route, Routes } from "react-router-dom";
import InsertForm from "./Components/InsertForm";
import ReadForm from "./Components/ReadForm";
import DeleteForm from "./Components/DeleteForm";
import UpdateForm from "./Components/UpdateForm";
import FindForm from "./Components/FindForm";
import Graph from "./Components/Graph";

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Graph />}></Route>
        <Route path="/insert" element={<InsertForm />}></Route>
        <Route path="/read" element={<ReadForm />}></Route>
        <Route path="/delete" element={<DeleteForm />}></Route>
        <Route path="/update" element={<UpdateForm />}></Route>
        <Route path="/find" element={<FindForm />}></Route>
      </Routes>
    </div>
  );
};

export default App;
