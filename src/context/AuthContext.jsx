import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || "");
  
    useEffect(() => {
      if (token) {
        axios
          .get("https://note-app-1g0c.onrender.com/api/notes", {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => setUser(res.data.user))
          .catch(() => logout());
      }
    }, [token]);
  
    const login = async (email, password) => {
      const res = await axios.post("https://note-app-1g0c.onrender.com/api/login", { email, password });
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
    };
  
    const signup = async (name, email, password) => {
      await axios.post("http://localhost:8080/api/signup", { name, email, password });
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