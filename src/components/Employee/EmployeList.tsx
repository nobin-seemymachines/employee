// EmployeeTable.tsx

import { Link } from "react-router-dom";
import { dateConvert } from "../../services/dateConvert";

interface deleteProps {
  empId: string;
  empName: string;
}

interface EmployeeTableProps {
  displayEmployeeList: any[];
  Employe: {
    setValue: any;
    setEmpId: any;
  };
  DeleteEmp: (id: deleteProps) => void;
}

function EmployeeList({ displayEmployeeList, Employe, DeleteEmp }: EmployeeTableProps) {
  return (
    <div className="employee-list">
      {Array.isArray(displayEmployeeList) && displayEmployeeList.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Designation</th>
              <th>Date of Joining</th>
              <th>Experience</th>
              <th>Email Address</th>
              <th>Date of Birth</th>
              <th>Phone Number</th>
              <th className="action-head">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayEmployeeList.map((employee) => (
              <tr key={employee.employeeId}>
                <td>{`${employee.fname} ${employee.lname}`}</td>
                <td>{employee.designation}</td>
                <td>{dateConvert(employee.doj)}</td>
                <td>{employee.experience}</td>
                <td>{employee.email}</td>
                <td>{dateConvert(employee.dob)}</td>
                <td>{employee.phoneNumber}</td>
                <td className="action-btn">
                  <Link
                    to="/employee"
                    onClick={() => {
                      Employe.setValue(false);
                      Employe.setEmpId(employee.employeeId);
                    }}
                    className="edit-btn"
                  >
                    <span>Edit</span>
                  </Link>
                  <span onClick={() => DeleteEmp({
                    empId: employee.employeeId,
                    empName: `${employee.fname} ${employee.lname}`,
                  })}>Delete</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <tr>
          <td colSpan={8}>No employees found</td>
        </tr>
      )}
    </div>
  );
}

export default EmployeeList;
