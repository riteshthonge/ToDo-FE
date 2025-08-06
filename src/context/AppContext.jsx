import { useState, createContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData")) || null
  );

  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("token")) || null
  );

  const [allTasks, setAllTasks] = useState(
    JSON.parse(localStorage.getItem("allTasks")) || []
  );

  const backendUrl = "https://todo-be-6j1j.onrender.com";
  // const backendUrl = "http://localhost:4000";

  const getUserData = async () => {
    try {
     
      const { data } = await axios.get(`${backendUrl}/api/user/get-user-Data`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.success) {
         setUserData(data.userData);
        localStorage.setItem("userData", JSON.stringify(data.userData));
        await getAllTasks();
        navigate("/user");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getAllTasks = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/get-all-tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.success) {
        setAllTasks(data.data || []);
        localStorage.setItem("allTasks", JSON.stringify(data.data || []));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
  const savedToken = JSON.parse(localStorage.getItem("token"));
  if (savedToken) {
    setToken(savedToken);
  }
}, []);

useEffect(() => {
  if (token) {
    getUserData();
  }
}, [token]);


  return (
    <AppContext.Provider
      value={{
        navigate,
        userData,
        backendUrl,
        getUserData,
        token,
        setToken,
        allTasks,
        getAllTasks,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
