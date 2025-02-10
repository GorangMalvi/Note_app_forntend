import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {Box, Input, Button, Heading} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { login } = useAuth();
    const [form, setForm] = useState({ email: "", password: "" });
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      await login(form.email, form.password);
      navigate("/dashboard");
    };
  
    return (
      <Box p={8} maxW="400px" mx="auto">
        <Heading mb={4}>Login</Heading>
        <form onSubmit={handleSubmit}>
          <Input placeholder="Email" type="email" mb={3} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <Input placeholder="Password" type="password" mb={3} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <Button type="submit" colorScheme="blue" w="full">Login</Button>
        </form>
      </Box>
    );
  };
  
  export default Login;