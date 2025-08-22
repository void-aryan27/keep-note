import { NoteList } from "./NoteList";
import { Typography, Box } from "@mui/material";

export function NoteView({ p1, onDeleteNote }) { 
  return (
    <Box>
      <Typography variant="h5" align="center" gutterBottom>
        Checklist Chronicles: Conquering Tasks One Tick at a Time
      </Typography>
      <NoteList p2={p1} onDeleteNote={onDeleteNote} /> 
    </Box>
  );
}
