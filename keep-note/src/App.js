import './App.css';
import React, { useEffect, useState } from 'react';  
import { Header } from './components/Header.js';
import { Footer } from './components/Footer.js';
import { SearchNote } from './components/SearchNote.js';
import axios from 'axios';
import styled from 'styled-components';
import { AddNoteForm } from './components/AddNoteForm.js';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { PageNotFound } from './components/PageNotFound.js';
import { LoginUser } from './components/Login.js';  // Assuming you have this component
import { Register } from './components/Register.js';  // Assuming you have this component
import { EditNote } from './components/EditNote.js';  // Assuming you have this component
import { NoteList } from './components/NoteList.js';  // Make sure this is imported

const AppContainer = styled.div`
  background-color: black;
  color: white;
`;

function App() {
  const [Notesdata, setNotesData] = useState([]);
  const [filteredNotesData, setFilteredNotesData] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/notes");
        setNotesData(res.data);
        const filtered = fetchFilterData(res.data, searchText);
        setFilteredNotesData(filtered);
      } catch (err) {
        console.log("Error fetching data:" + err);
      }
    };
    fetchData();
  }, [searchText]);

  async function addNotesFun(newNotes) {
    await axios.post("http://localhost:3000/notes", newNotes)
      .then(res => {
        setFilteredNotesData([...filteredNotesData, res.data]);
        alert("Data inserted successfully!");
      })
      .catch(error => {
        alert("Data insertion Failed!");
      });
  }

  function fetchFilterData(allData, searchText) {
    if (searchText) {
      let filteredNotes = allData.filter((x) =>
        x.title.toLowerCase().includes(searchText.toLowerCase()));
      return filteredNotes;
    } else {
      return allData;
    }
  }

  // Deleting the note from the list
  function handleDeleteNote(idToDelete) {
    axios.delete(`http://localhost:3000/notes/${idToDelete}`)
      .then(() => {
        // Fetch updated notes from backend
        axios.get("http://localhost:3000/notes")
          .then(res => {
            setNotesData(res.data);
            const filtered = fetchFilterData(res.data, searchText);
            setFilteredNotesData(filtered);
          });

        alert("Note deleted successfully!");
      })
      .catch(err => {
        console.error("Error during deletion:", err);
        alert("Failed to delete note.");
      });
  }

  // Editing the note
  async function handleEditNote(updatedNote) {
    try {
      const res = await axios.put(`http://localhost:3000/notes/${updatedNote.id}`, updatedNote);

      // Update Notesdata (original array)
      const updatedNotes = Notesdata.map(note =>
        note.id === updatedNote.id ? res.data : note
      );
      setNotesData(updatedNotes);

      // Update filteredNotesData (for search results)
      const updatedFilteredNotes = filteredNotesData.map(note =>
        note.id === updatedNote.id ? res.data : note
      );
      setFilteredNotesData(updatedFilteredNotes);

      console.log("Note updated successfully");
    } catch (err) {
      console.error("Failed to update note:", err);
      alert("Note update failed!");
    }
  }

  function searchFun(text) {
    setSearchText(text.target.value);
  }

  function clearFun() {
    setSearchText("");
  }

  return (
    <Router>
      <AppContainer>
        <Header>
          <SearchNote onSearchNotes={searchFun} onClearNotes={clearFun} searchTextBox={searchText} />
        </Header>
        <hr />
        <Routes>
          <Route path="/" element={<LoginUser />} />
          <Route path="/home" element={<Navigate to="/notes" replace />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/notes" 
            element={
              <>
                <AddNoteForm addnotes={addNotesFun} />
                <NoteList p2={filteredNotesData} onDeleteNote={handleDeleteNote} />
              </>
            }   
          />
          <Route path="/notes/:id" element={<EditNote onEditNote={handleEditNote} />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>

        <hr />
        <Footer />
      </AppContainer>
    </Router>
  );
}

export default App;
