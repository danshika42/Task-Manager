import { useEffect, useState } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";
import React from "react";
import Completed from "./components/Completed";
import Progress from "./components/Progress";

function App() {
  return (
    <div>
      <Nav/>
      <Routes>
        <Route path='' element={<TaskList />}/>
        <Route path='/progress' element={<Progress />}/>
        <Route path='/completed' element={<Completed />}/>
        <Route path='/addtask' element={<AddTask/>}/>
      </Routes>
    </div>
  );
}

export default App;
