import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Box, Typography } from "@mui/material";

export const EditNote = ({ onEditNote }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState({ title: "", content: "" });

  useEffect(() => {
    axios
      .get(`http://localhost:3000/notes/${id}`)
      .then((res) => {
        setNote(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch note:", err);
        alert("Could not load note.");
      });
  }, [id]);

  const editNote = async () => {
    try {
      const res = await axios.put(`http://localhost:3000/notes/${id}`, note);
      alert("Note updated successfully!");
      if (onEditNote) {
        onEditNote(res.data);
      }
      navigate("/notes");
    } catch (err) {
      console.error("Failed to update note:", err);
      alert("Update failed!");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 3,
        maxWidth: 500,
        mx: "auto",
        mt: 5,
        backgroundColor: "#fff", // white background to make everything visible
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h5" sx={{ color: "#333", textAlign: "center" }}>
        Edit Note
      </Typography>
      <TextField
        label="Title"
        value={note.title}
        onChange={(e) => setNote({ ...note, title: e.target.value })}
        fullWidth
        sx={{
          '& .MuiInputBase-root': {
            backgroundColor: '#f9f9f9', // light gray for visibility
          },
        }}
      />
      <TextField
        label="Content"
        value={note.content}
        onChange={(e) => setNote({ ...note, content: e.target.value })}
        fullWidth
        multiline
        rows={4}
        sx={{
          '& .MuiInputBase-root': {
            backgroundColor: '#f9f9f9', 
          },
        }}
      />
      <Button variant="contained" onClick={editNote}>
        Save Changes
      </Button>
    </Box>
  );
};
