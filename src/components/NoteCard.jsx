import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { deleteNote, createNote } from "../services/api";
import {
  Box,
  Button,
  Text,
  Input,
  IconButton,
  useClipboard,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Textarea,
  Image,
} from "@chakra-ui/react";
import { CopyIcon, EditIcon, StarIcon, DeleteIcon } from "@chakra-ui/icons";
import axios from "axios";

const NoteCard = ({ note, refreshNotes }) => {
  const { token } = useAuth();
  const { onCopy } = useClipboard(note.content);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newTitle, setNewTitle] = useState(note.title);
  const [newContent, setNewContent] = useState(note.content);
  const [isEditing, setIsEditing] = useState(false);
  const [isFavorited, setIsFavorited] = useState(note.isFavorite || false);
  const [image, setImage] = useState(note.image || null);

  const handleDelete = async () => {
    await deleteNote(token, note._id);
    refreshNotes();
  };

  const handleRename = async () => {
    await axios.put(`http://localhost:8080/api/notes/${note._id}`, { title: newTitle, content: newContent }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setIsEditing(false);
    refreshNotes();
  };

  const toggleFavorite = async () => {
    setIsFavorited(!isFavorited);
    await axios.put(`http://localhost:8080/api/notes/${note._id}`, { isFavorite: !isFavorited }, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    const res = await axios.post(`http://localhost:8080/api/upload`, formData, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
    });

    setImage(res.data.imageUrl);
    await axios.put(`http://localhost:8080/api/notes/${note._id}`, { image: res.data.imageUrl }, {
      headers: { Authorization: `Bearer ${token}` },
    });

    refreshNotes();
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="md" w="100%">
      <Text fontWeight="bold">{note.title}</Text>
      <Text>{note.content.substring(0, 50)}...</Text>

      <IconButton icon={<CopyIcon />} onClick={onCopy} aria-label="Copy" mr={2} />
      <IconButton icon={<EditIcon />} onClick={onOpen} aria-label="Edit" mr={2} />
      <IconButton icon={<DeleteIcon />} onClick={handleDelete} colorScheme="red" aria-label="Delete" mr={2} />
      <IconButton icon={<StarIcon />} onClick={toggleFavorite} colorScheme={isFavorited ? "yellow" : "gray"} aria-label="Favorite" />
      
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Note</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} mb={3} />
            <Textarea value={newContent} onChange={(e) => setNewContent(e.target.value)} />
            {image && <Image src={image} alt="Uploaded" mt={3} />}
            <Input type="file" accept="image/*" onChange={handleImageUpload} mt={3} />
            <Button onClick={handleRename} colorScheme="blue" mt={3}>Save</Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default NoteCard;
