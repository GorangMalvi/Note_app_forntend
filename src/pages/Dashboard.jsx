import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchNotes } from "../services/api";
import { Box, Button, Heading, Input, VStack } from "@chakra-ui/react";
import NoteCard from "../components/NoteCard";
import CreateNote from "../components/CreateNote";

const Dashboard = () => {
  const { token, logout } = useAuth();
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  const loadNotes = async () => {
    const data = await fetchNotes(token);
    setNotes(data);
  };

  useEffect(() => {
    loadNotes();
  }, [token]);

  const filteredNotes = notes
    .filter((note) => note.title.includes(search) || note.content.includes(search))
    .sort((a, b) => (sortOrder === "newest" ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date)));

  return (
    <Box p={8}>
      <Heading mb={4}>Your Notes</Heading>
      <Input placeholder="Search Notes..." mb={3} onChange={(e) => setSearch(e.target.value)} />
      <Button onClick={() => setSortOrder(sortOrder === "newest" ? "oldest" : "newest")}>
        Sort: {sortOrder === "newest" ? "Oldest First" : "Newest First"}
      </Button>

      <CreateNote refreshNotes={loadNotes} />

      <VStack mt={4} spacing={4}>
        {filteredNotes.map((note) => (
          <NoteCard key={note._id} note={note} refreshNotes={loadNotes} />
        ))}
      </VStack>

      <Button mt={4} colorScheme="red" onClick={logout}>Logout</Button>
    </Box>
  );
};

export default Dashboard;
