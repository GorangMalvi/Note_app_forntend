import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchNotes = async (token) => {
  const res = await axios.get(`${API_URL}/api/notes`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const createNote = async (token, note) => {
  await axios.post(`${API_URL}/api/notes`, note, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteNote = async (token, noteId) => {
  await axios.delete(`${API_URL}/api/notes/${noteId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
