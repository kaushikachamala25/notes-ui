import React, { useState, useEffect, useCallback } from 'react';
import { Button, Card, Table } from 'react-bootstrap';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import AddNotesModal from './AddNotesModal'

const Notes = (props) => {

  const [data, setData] = useState()
  const [showModal, setShowModal] = useState(false)
  const [selectedNote, setSelectedNote] = useState(null);

  const handleAddNotes = () => {
    setShowModal(true);
  }

  const handleSubmit = () => {
    var title= document.getElementById("title").value;
    var description= document.getElementById("description").value;
    if(selectedNote){
      editNotes(selectedNote.id, title, description)
    } else {
      addNotes(title, description)
    }
    setShowModal(false)
  }

  const handleEditNotes = (note) => {
    setSelectedNote(note);
    setShowModal(true);
  }

  const handleDeleteNotes = (note) => {
    deleteNotes(note.id)
  }


  const getNotes = useCallback(() => {
    fetch('https://localhost:7119/api/Notes', {
      method: "GET",
      headers: { 'Content-Type': 'application/json' }
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setData(data)
      })
  }, []);

  useEffect(() => {
    getNotes();
  }, []);

  const addNotes = useCallback((title, description) => {
    const data = { title: title, description: description }
    fetch('https://localhost:7119/api/Notes', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(function (response) {
      getNotes();
    })
  }, []);

  const editNotes = useCallback((id, title, description) => {
    const data = { id: id, title: title, description: description }
    fetch(`https://localhost:7119/api/Notes/${id}`, {
      method: "PUT",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(function (response) {
        getNotes();
      })
      
  }, []);

  const deleteNotes = useCallback((id) => {
    fetch(`https://localhost:7119/api/Notes/${id}`, {
      method: "DELETE",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(function (response) {
      getNotes();
    })
  }, []);



  const listNotes = data?.map((i) => {
    return <tr>
      <td key={i?.title}>{i?.title}</td>
      <td>{i?.description}</td>
      <td><Button variant="outline-primary" size="sm" onClick={() => handleEditNotes(i)}>Edit</Button></td>
      <td><Button variant="outline-danger" size="sm" onClick={() => handleDeleteNotes(i)}>Delete</Button></td>
    </tr>
  })

  return (
    <Card>
      <div className="m-5">
        <div>
          <div>
            <h1>Notes App</h1>
          </div>
          <div>
            <Button className="float-end mb-5" variant="success" onClick={handleAddNotes}>Add Note</Button>
          </div>
        </div>
        <div>
          <AddNotesModal
            selectedNote={selectedNote}
            showModal={showModal}
            handleSubmit={handleSubmit}
            setShowModal={setShowModal}
            setSelectedNote={setSelectedNote}
          />
        </div>
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Title</th><th>Note</th><th>Edit</th><th>Delete</th>
              </tr>
            </thead>

            {listNotes}
          </Table>
        </div>
      </div>
    </Card>
  )
}

export default Notes;