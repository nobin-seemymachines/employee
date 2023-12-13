// EditEmployee.tsx
import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateEmployeeDetails } from "./formValidation";
import { addEmployee, editEmployee, getEmployee } from "../../services/api";
import { dateConvert } from "../../services/dateConvert";

interface Props {
  empdata: {
    value: boolean;
    empId: string;
  };
}

function EditEmployee({ empdata }: Props) {
  //employee details
  const [empDetails, setEmpDetails] = useState({
    fname: "",
    lname: "",
    email: "",
    dob: "",
    doj: "",
    designation: "",
    experience: "",
    phoneNumber: "",
  });

  // employee details input field error
  const [errors, setErrors] = useState({
    fname: "",
    lname: "",
    email: "",
    dob: "",
    doj: "",
    designation: "",
    experience: "",
    phoneNumber: "",
  });

  const navigate = useNavigate();
  const [authError, setAuthError] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmpDetails({ ...empDetails, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  //Add Employee
  const addEmp = async () => {
    try {
      const response = await addEmployee(empDetails);

      if (response.status === 201) {
        alert("Employee Added Success");
        navigate("/dashboard");
      } else {
        console.log("Authentication failed. Status code:", response.status);
      }
    } catch (error: any) {
      setAuthError(error.response.data.message);
    }
  };

  //Edit Employee
  const editEmp = async () => {
    try {
      const response = await editEmployee({
        employeeId: empdata.empId,
        ...empDetails,
      });

      if (response.status === 201) {
        alert("Employee Edited Success");
        navigate("/dashboard");
      } else {
        console.log("Authentication failed. Status code:", response.status);
      }
    } catch (error: any) {
      setAuthError(error.response.data.message);
    }
  };

  //Submit Add or Edit Employee
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateEmployeeDetails(empDetails);
    setErrors(validationErrors);
    if (Object.values(validationErrors).every((error) => !error)) {
      empdata.value ? addEmp() : editEmp();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (empdata.empId) {
        try {
          const response = await getEmployee(empdata.empId);
          const empData = response.data.data.employee;
          console.log("Employee : ", empData);
          setEmpDetails((prevDetails) => ({
            ...prevDetails,
            fname: empData.fname,
            lname: empData.lname,
            email: empData.email,
            dob: dateConvert(empData.dob),
            doj: dateConvert(empData.doj),
            designation: empData.designation,
            experience: empData.experience,
            phoneNumber: empData.phoneNumber,
          }));
        } catch (error) {
          console.log("Error fetching employee list:", error);
        }
      } else {
        console.log("add employe");
      }
    };
    fetchData();
  }, [empdata.empId]);

  return (
    <div className="emp">
      <div className="employee-detail">
        <div className="employe-header">
          <h1>{empdata.value ? "Add Employee" : "Edit Employee"}</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="inputs-grouped">
            <div className="input-group">
              <label htmlFor="fname">First Name</label>
              <input
                type="text"
                name="fname"
                onChange={handleChange}
                value={empDetails.fname}
              />
              <span className="material-symbols-outlined close-btn">
                cancel
              </span>
              <p className="error-message">{errors.fname}</p>
            </div>
            <div className="input-group">
              <label htmlFor="lname">Last Name</label>
              <input
                type="text"
                name="lname"
                onChange={handleChange}
                value={empDetails.lname}
              />
              <span className="material-symbols-outlined close-btn">
                cancel
              </span>
              <p className="error-message">{errors.lname}</p>
            </div>
            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                value={empDetails.email}
              />
              <span className="material-symbols-outlined close-btn">
                cancel
              </span>
              <p className="error-message">{errors.email}</p>
            </div>
            <div className="input-grid-group">
              <div className="input-group">
                <label htmlFor="dob">Date Of Birth</label>
                <input
                  type="date"
                  name="dob"
                  onChange={handleChange}
                  value={empDetails.dob}
                />
                <p className="error-message">{errors.dob}</p>
              </div>
              <div className="input-group">
                <label htmlFor="doj">Date Of Join</label>
                <input
                  type="date"
                  name="doj"
                  onChange={handleChange}
                  value={empDetails.doj}
                />
                <p className="error-message">{errors.doj}</p>
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="designation">Designation</label>
              <input
                type="text"
                name="designation"
                onChange={handleChange}
                value={empDetails.designation}
              />
              <span className="material-symbols-outlined close-btn">
                cancel
              </span>
              <p className="error-message">{errors.designation}</p>
            </div>
            <div className="input-grid-group">
              <div className="input-group">
                <label htmlFor="experience">Experience (in yrs)</label>
                <input
                  type="text"
                  name="experience"
                  onChange={handleChange}
                  value={empDetails.experience}
                />
                <span className="material-symbols-outlined close-btn">
                  cancel
                </span>
                <p className="error-message">{errors.experience}</p>
              </div>
              <div className="input-group last-span">
                <label htmlFor="phoneNumber">Phone</label>
                <input
                  type="text"
                  name="phoneNumber"
                  onChange={handleChange}
                  value={empDetails.phoneNumber}
                />
                <span className="material-symbols-outlined close-btn">
                  cancel
                </span>
                <p className="error-message">{errors.phoneNumber}</p>
              </div>
            </div>
            <div className="btn-group">
              <button type="submit">
                {empdata.value ? "Add Employee" : "Edit"}
              </button>
              <Link to="/dashboard">
                <button>Cancel</button>
              </Link>
            </div>
            <p>{authError}</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditEmployee;
