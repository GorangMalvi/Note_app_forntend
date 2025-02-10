import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { createNote } from "../services/api";
import { Box, Button, Input, Textarea, VStack } from "@chakra-ui/react";

const CreateNote = ({ refreshNotes }) => {
  const { token } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState(null);

  const handleCreate = async () => {
    if (!title.trim() || !content.trim()) return;
    await createNote(token, { title, content });
    setTitle("");
    setContent("");
    refreshNotes();
  };

  const startRecording = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Your browser does not support voice recording!");
      return;
    }
    const speechRecognition = new window.webkitSpeechRecognition();
    speechRecognition.continuous = false;
    speechRecognition.interimResults = false;
    speechRecognition.lang = "en-US";
    speechRecognition.start();

    speechRecognition.onstart = () => setIsRecording(true);
    speechRecognition.onresult = (event) => {
      setContent(event.results[0][0].transcript);
      setIsRecording(false);
    };
    speechRecognition.onerror = () => setIsRecording(false);
    speechRecognition.onend = () => setIsRecording(false);

    setRecognition(speechRecognition);
  };

  const stopRecording = () => {
    if (recognition) {
      recognition.stop();
      setIsRecording(false);
    }
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="md">
      <VStack spacing={3}>
        <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Textarea placeholder="Write your note..." value={content} onChange={(e) => setContent(e.target.value)} />
        <Button onClick={handleCreate} colorScheme="blue">Create Note</Button>
        <Button onClick={isRecording ? stopRecording : startRecording} colorScheme={isRecording ? "red" : "green"}>
          {isRecording ? "Stop Recording" : "Record Voice"}
        </Button>
      </VStack>
    </Box>
  );
};

export default CreateNote;
