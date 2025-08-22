import { Box } from "@mui/material";
import { NoteCard } from "./NoteCard";

export function NoteList({ p2, onDeleteNote }) {
  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
      gap={2.5}
      padding={2.5}
    >
      {p2.map((record) => (
        <NoteCard key={record.id} p3={record} onDeleteNote={onDeleteNote} />
      ))}
    </Box>
  );
}
