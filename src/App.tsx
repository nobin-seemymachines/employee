import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Dashboard from "./pages/Dashboard";
import EditEmployee from "./components/Employee/EditEmployee";
import ProtectedRoutes from "./services/ProtectedRoutes";

function App() {
  //   value ? Add Employee : Edit Employee
  const [value, setValue] = useState<boolean>(true);

  // Add Employee ? empid == null : (Edit Employee) empid = employeeId
  const [empId, setEmpId] = useState<string>("");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoutes />}>
          <Route
            path="/dashboard"
            element={<Dashboard Employe={{ setValue, setEmpId }} />}
          />
          <Route
            path="/employee"
            element={<EditEmployee empdata={{ value, empId }} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
