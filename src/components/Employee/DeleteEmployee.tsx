import { useState } from "react";
import { deleteEmployee } from "../../services/api";
import "./Employee.css";
import { useNavigate } from "react-router-dom";

interface props {
  empId: string;
  empName: string;
  onClose: () => void;
}

function DeleteEmployee({  empId, empName, onClose }: props) {
  const [authError, setAuthError] = useState<string>("");
  const navigate = useNavigate();


  //confirm delete
  const deleEmp = async () => {
    try {
      const response = await deleteEmployee({ employeeId: empId });

      if (response.status === 201) {
        onClose()
        alert(response.data.message);
        navigate("/dashboard");
      } else {
        console.log("Authentication failed. Status code:", response.status);
      }
    } catch (error: any) {
      setAuthError(error.response.data.message);
    }
  };

  return (
    <div className="delete-container">
      <div className="delete-box">
        <h1>Confirm Deletion</h1>
        <p>Are you sure you want to delete employee "{empName}"</p>
        <div className="delete-btn">
          <button onClick={deleEmp}>Confirm</button>
          <button onClick={onClose}>Cancel</button>
        </div>
        <p>{authError}</p>
      </div>
    </div>
  );
}
export default DeleteEmployee;
