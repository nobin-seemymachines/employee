// Dashboard.tsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DeleteEmployee from "../components/Employee/DeleteEmployee";
import { getEmployeeList } from "../services/api";
import EmployeeList from "../components/Employee/EmployeList";

interface props {
  Employe: {
    setValue: any;
    setEmpId: any;
  };
}

interface deleteProps {
  empId: string;
  empName: string;
}

function Dashboard({ Employe }: props) {
  const [ShowDelete, setShowDelete] = useState<boolean>(false);
  const [employeeList, setEmployeeList] = useState<any[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [displayEmployeeList, setDisplayEmployeeList] = useState<any[]>([]);

  const navigate = useNavigate();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleSearchClick = () => {
    const filteredEmployeeList =
      searchInput.trim() === ""
        ? employeeList
        : employeeList.filter((employee) => {
            const fullName =
              `${employee.fname} ${employee.lname}`.toLowerCase();
            const email = employee.email.toLowerCase();
            const designation = employee.designation.toLowerCase();

            return (
              fullName.includes(searchInput.toLowerCase()) ||
              email.includes(searchInput.toLowerCase()) ||
              designation.includes(searchInput.toLowerCase())
            );
          });
    setDisplayEmployeeList(filteredEmployeeList);
  };

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const [id, setId] = useState<deleteProps>({
    empId: "",
    empName: "",
  });


  const DeleteEmp = (id: deleteProps) => {
    setId(id);
    setShowDelete(!ShowDelete);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEmployeeList();
        console.log(data.data.list);
        setEmployeeList(data.data.list);
      } catch (error) {
        console.log("Error fetching employee list:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [ShowDelete]);

  useEffect(() => {
    setDisplayEmployeeList(employeeList);
  }, [employeeList]);

  return (
    <div className="dashboard-container">
      <div className="navbar">
        <h2>Employee Dashboard</h2>
        <Link
          to="/employee"
          onClick={() => {
            Employe.setValue(true);
            Employe.setEmpId(null);
          }}
        >
          <button>Add Employee</button>
        </Link>

        <button onClick={logOut}>Logout</button>
      </div>
      <div className="header">
        <h1>Welcome to Employee Dashboard</h1>
      </div>
      <div className="search-bar">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search for employee name, email, or designation"
          value={searchInput}
          onChange={handleSearchChange}
        />
        <button onClick={handleSearchClick}>Search</button>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <EmployeeList
          displayEmployeeList={displayEmployeeList}
          Employe={Employe}
          DeleteEmp={DeleteEmp}
        />
      )}
      {ShowDelete && (
        <DeleteEmployee
          empId={id.empId}
          empName={id.empName}
          onClose={() => setShowDelete(false)}
        />
      )}
    </div>
  );
}

export default Dashboard;
