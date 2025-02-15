import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const API_BASE_URL = import.meta.env.VITE_API_URL;
console.log("API Base URL:", API_BASE_URL); // Debugging

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const navigate = useNavigate();

    useEffect(() => {
      if (token) {
        axios
          .get(`${API_BASE_URL}/api/notes`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            console.log("User data:", res.data.user); // Debugging
            setUser(res.data.user);
          })
          .catch(() => logout());
      }
    }, [token]);
  
    const login = async (email, password) => {
      try {
        console.log("Sending Login Data:", { email, password }); // Debugging
    
        const res = await axios.post(`${API_BASE_URL}/api/login`, { email, password });
    
        console.log("Login Response:", res.data); // Debugging
    
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
      } catch (error) {
        console.error("Login Error:", error.response?.data || error.message);
        alert(error.response?.data?.message || "Login failed. Please check your credentials.");
      }
    };
  
    const signup = async (name, email, password) => {
      await axios.post(`${API_BASE_URL}/api/signup`, { name, email, password });
      navigate("/login"); 
    };
  
    const logout = () => {
      setUser(null);
      setToken("");
      localStorage.removeItem("token");
    };
  
    return (
      <AuthContext.Provider value={{ user, token, login, signup, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
export const useAuth = () => useContext(AuthContext);
