import axios from "axios";

const baseUrl = "http://localhost:8000/api";

export const signUp = (data: object) => {
  return axios.post(`${baseUrl}/users/signup`, data).then((response) => {
    return response;
  });
};

export const signIn = (data: object) => {
  return axios.post(`${baseUrl}/users/login`, data).then((response) => {
    if (response.data.data.token) {
      localStorage.setItem("token", response.data.data.token);
    }
    return response;
  });
};

export const addEmployee = (data: object) => {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: token,
  };
  return axios
    .post(`${baseUrl}/employee/register`, data, { headers })
    .then((reponse) => {
      return reponse;
    });
};

export const editEmployee = (data: object) => {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: token,
  };
  return axios
    .put(`${baseUrl}/employee/edit`, data, { headers })
    .then((response) => {
      return response;
    });
};

export const getEmployeeList = () => {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: token,
  };
  return axios.get(`${baseUrl}/employee/list`, { headers }).then((response) => {
    return response.data;
  });
};

export const getEmployee = (empId: string) => {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: token,
  };
  return axios
    .get(`${baseUrl}/employee/getEmployeeById?employeeId=${empId}`, { headers })
    .then((response) => {
      return response;
    });
};

export const deleteEmployee = (data: object) => {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: token,
  };
  return axios
    .delete(`${baseUrl}/employee/delete`, { headers, data })
    .then((response) => {
      return response;
    });
};
