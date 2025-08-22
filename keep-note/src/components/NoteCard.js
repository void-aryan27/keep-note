import { Card, CardContent, Typography, IconButton, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export function NoteCard({ p3, onDeleteNote }) {
  const isCompleted = p3.status === "completed";
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/notes/${p3.id}`);
  };

  const handleDeleteClick = () => {
    onDeleteNote(p3.id); 
  };
  

  return (
    <Card
      sx={{
        backgroundColor: isCompleted ? "aqua" : "#ffffff",
        color: isCompleted ? "#000407" : "#101010",
        borderRadius: 2,
        boxShadow: 3,
        transition: "transform 0.2s ease-in-out",
        textAlign: "center",
        padding: 2,
        "&:hover": {
          transform: "scale(1.02)",
        },
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          {p3.title}
        </Typography>
        <Typography variant="body1">{p3.content}</Typography>
        <Box mt={2} display="flex" justifyContent="center" gap={1}>
          <IconButton onClick={handleEditClick}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={handleDeleteClick}>
            <DeleteIcon />
          </IconButton>
          <IconButton>
            <NotificationsIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
}
