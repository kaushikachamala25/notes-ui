import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const AddEditModal = ({ 
            selectedNote,
            showModal,
            handleSubmit,
            setShowModal,
            setSelectedNote,
 }) => {
  const handleClose = () => {
    setShowModal(false);
    setSelectedNote(null);
  }
  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <h4>{selectedNote ? 'Edit Notes' : 'Add Notes'}</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="row">
        <div className="mb-3">
          <label className='col-md-6'>
            Title:
          </label>
          <input name="title"
            id="title"
            className="col-md-6"
            type="text" 
            value={selectedNote?.title} 
            onChange={ e => setSelectedNote({...selectedNote, title: e.target.value })}/>
        </div>

        <div className="mb-3">
          <label className="col-md-6">
            Description:
          </label>
          <input name="description" 
            id="description"
            className="col-md-6" 
            type="text" 
            value={selectedNote?.description} 
            onChange={ e => setSelectedNote({...selectedNote, description: e.target.value })} />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Save changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddEditModal