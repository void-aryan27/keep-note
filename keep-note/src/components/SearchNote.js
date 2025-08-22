import { IconButton, TextField, InputAdornment } from "@mui/material";
import { Clear as ClearIcon } from "@mui/icons-material";

export function SearchNote({ onSearchNotes, onClearNotes, searchTextBox }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", backgroundColor: "#fff", padding: "10px", borderRadius: "8px" }}>
      <TextField
        variant="outlined"
        placeholder="Search Notes"
        value={searchTextBox}
        onChange={onSearchNotes}
        fullWidth
        style={{ backgroundColor: "#fff" }} // Making sure the input has a light background
        InputProps={{
          style: {
            color: "#333", 
          },
          endAdornment: (
            <InputAdornment position="end">
              {searchTextBox && (
                <IconButton onClick={onClearNotes} edge="end">
                  <ClearIcon />
                </IconButton>
              )}
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
}
