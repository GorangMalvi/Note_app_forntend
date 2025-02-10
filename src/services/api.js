import axios from "axios";

const API_URL = "https://note-app-1g0c.onrender.com/api";

export const fetchNotes = async (token) => {
  const res = await axios.get(`${API_URL}/notes`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const createNote = async (token, note) => {
  await axios.post(`${API_URL}/notes`, note, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteNote = async (token, noteId) => {
  await axios.delete(`${API_URL}/notes/${noteId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
