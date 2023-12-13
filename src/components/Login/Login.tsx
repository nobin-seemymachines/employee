import { useNavigate } from "react-router-dom";
import Home from "../../pages/Home";
import "./Login.css";
import { ChangeEvent, FormEvent, useState } from "react";
import { signIn } from "../../services/api";

interface FormData {
  userData: {
    email: string;
    password: string;
  };
  errors: {
    email: string;
    password: string;
  };
}

function Login() {
  const buttonText = false;

  const [formData, setFormData] = useState<FormData>({
    userData: {
      email: "",
      password: "",
    },
    errors: {
      email: "",
      password: "",
    },
  });

  const [authError, setAuthError] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      userData: {
        ...prevFormData.userData,
        [name]: value,
      },
      errors: {
        ...prevFormData.errors,
        [name]: "",
      },
    }));
  };

  const validateData = () => {
    let isValid = true;
    if (
      !formData.userData.email ||
      !/^\S+@\S+\.\S+$/.test(formData.userData.email)
    ) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        errors: {
          ...prevFormData.errors,
          email: "Invalid Email",
        },
      }));
      isValid = false;
    }

    if (!formData.userData.password) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        errors: {
          ...prevFormData.errors,
          password: "Password must be filled",
        },
      }));
      isValid = false;
    }
    return isValid;
  };

  const navigate = useNavigate();
  const Authenticate = async () => {
    try {
      const response = await signIn(formData.userData);

      if (response.status === 200) {
        navigate("/dashboard");
      } else {
        console.log("Authentication failed. Status code:", response.status);
      }
    } catch (error: any) {
      setAuthError(error.response.data.message);
    }
  };

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = validateData();
    if (isValid) {
      Authenticate();
    }
  };
  return (
    <div className="container">
      <Home buttonText={buttonText} />
      <div className="login-page">
        <form onSubmit={onFormSubmit}>
          <h2>Login</h2>
          <div className="input-group">
            <label htmlFor="email">Your Email</label>
            <input
              type="text"
              name="email"
              value={formData.userData.email}
              onChange={handleInputChange}
            />
            {/* <span className="material-symbols-outlined close-btn">
              close_small
            </span> */}
            <p className="error-message">{formData.errors.email}</p>
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={formData.userData.password}
              onChange={handleInputChange}
            />
            {/* <span className="material-symbols-outlined close-btn">
              close_small
            </span> */}
            <p className="error-message">{formData.errors.password}</p>
          </div>

          <button type="submit">Login</button>

          <p className="error-message">{authError}</p>
        </form>
      </div>
    </div>
  );
}

export default Login;
