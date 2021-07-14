import React, { useState } from 'react'
import { Form, Modal } from 'react-bootstrap';

import './GardenSelection.css'

const GardenSelection = ({ show, onHide, allGardens, handleGardenSelection, selectedGardens }) => {
  const [currentSelection, setCurrentSelection] = useState(selectedGardens);

  const handleToggleChange = (e) => {
    const { id, checked } = e.target;
    currentSelection[id-1] = checked
    setCurrentSelection([...currentSelection]);
  }

  const onSearch = () => {
    handleGardenSelection(currentSelection);
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="md"
      animation={false}
      centered
    >
      <Modal.Header>
        <Modal.Title>
          Filtrar por Jardín
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="gs-modal__body">
        <Form className="modal-form">
          {allGardens.map((jardin, key) => {
            return (
              <Form.Check
                key={key}
                id={jardin.id_jardin+1}
                label={jardin.nombre}
                onChange={handleToggleChange}
                checked={currentSelection[key]}
              />
            )
          })}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="btn btn-success"
          onClick={onSearch}
        >
          Buscar
        </button>
      </Modal.Footer>
    </Modal>
  )
}

export default GardenSelection;