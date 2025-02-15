import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Box, Input, Button, Heading } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Signup = () => {
    const { signup } = useAuth();
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      await signup(form.name, form.email, form.password);
      
    };
  
    return (
      <Box p={8} maxW="400px" mx="auto">
        <Heading mb={4}>Signup</Heading>
        <form onSubmit={handleSubmit}>
          <Input placeholder="Name" mb={3} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input placeholder="Email" type="email" mb={3} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <Input placeholder="Password" type="password" mb={3} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <Button type="submit" colorScheme="blue" w="full">Sign Up</Button>
        </form>
        <p>
        Already have a account?{" "}
        <Link
          as={RouterLink}
          to="/login"
          color="blue.500"
          fontWeight="bold"
          _hover={{ color: "blue.700" }}
        >
          login
        </Link>
      </p>
      </Box>
    );
  };
  
  export default Signup;