import React, { useMemo, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { BsBoxArrowInDownRight } from "react-icons/bs";

import { CustomTable } from "../CustomTable/CustomTable";
import { NumberRangeColumnFilter } from '../CustomTable/filters';

export const AdminTrees = ({ allTrees, allSpecies, allGardens }) => {
  const [show, setShow] = useState(false);
  const [editedTree, setEditedTree] = useState(null);
  const [diametroEdit, setDiametroEdit] = useState(null);
  const [alturaEdit, setAlturaEdit] = useState(null);
  const [valoracionEdit, setValoracionEdit] = useState(null);
  const [latitudEdit, setLatitudEdit] = useState(null);
  const [longitudEdit, setLongitudEdit] = useState(null);
  const [taxonomiaEdit, setTaxonomiaEdit] = useState(null);
  const [jardinEdit, setJardinEdit] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = (e, value) => {
    const tree = allTrees.filter( tree => tree.NID === value)[0];
    console.log(tree)
    setEditedTree(tree)
    setDiametroEdit(tree.Diametro)
    setAlturaEdit(tree.Altura)
    setValoracionEdit(tree.Valoracion)
    setLatitudEdit(tree.Latitud)
    setLongitudEdit(tree.Longitud)
    setTaxonomiaEdit(tree.id_taxonomia)
    setJardinEdit(tree.id_jardin)
    setShow(true)
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const modifiedTree = {
      "Altura": Number(alturaEdit),
      "Diametro": Number(diametroEdit),
      "ID_Historico": Number(editedTree.ID_Historico),
      "Latitud": latitudEdit,
      "Longitud": longitudEdit,
      "NID": Number(editedTree.NID),
      "Plantado": Number(editedTree.Plantado),
      "Valoracion": Number(valoracionEdit),
      "id_jardin": Number(jardinEdit),
      "id_nodo": editedTree.id_nodo,
      "id_taxonomia": Number(taxonomiaEdit),
      "imagen": editedTree.imagen,
      "isActive": editedTree.isActive
    }
    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(modifiedTree)
    };
    fetch(`http://papvidadigital-test.com/V2021API/api/arboles/inventario/${editedTree.NID}`, options).then(res => res.json())
      .then(res => {
        setShow(false);
        window.location.reload();
      });
  }

  const columns = useMemo(() => [
    {
      Header: "NID",
      accessor: "NID",
      Filter: NumberRangeColumnFilter,
      filter: "between"
    },
    {
      Header: "Taxonomia",
      accessor: "id_taxonomia",
      Cell: ({ value }) => {
        const specie = allSpecies.filter( specie => specie['id_taxonomia'] === value)
        return (
          <div>{specie[0].nombre}</div>
        )
      }
    },
    {
      Header: "Jardín",
      accessor: "id_jardin",
      Cell: ({ value }) => {
        const garden = allGardens.filter( garden => garden['id_jardin'] === value)
        return (
          <div>{garden[0].nombre}</div>
        )
      }
    },
    {
      Header: "Nodo (ID)",
      accessor: "id_nodo",
    },
    {
      Header: "Año Plantado",
      accessor: "Plantado",
      Filter: NumberRangeColumnFilter,
      filter: "between"
    },
    {
      Header: "Diametro",
      accessor: "Diametro",
      Filter: NumberRangeColumnFilter,
      filter: "between"
    },
    {
      Header: "Altura",
      accessor: "Altura",
      Filter: NumberRangeColumnFilter,
      filter: "between"
    },
    {
      Header: "Valoración",
      accessor: "Valoracion",
      Filter: NumberRangeColumnFilter,
      filter: "between"
    },
    {
      Header: " ",
      accessor: "NID",
      id: "edit",
      Cell: ({ value }) => {
        return (
          <Button
            variant="secondary"
            onClick={(e) => {
              e.preventDefault();
              handleShow(e, value)
            }}
          >
            <BsBoxArrowInDownRight />
          </Button>
        )
      },
      disableSortBy: true,
      disableFilters: true
    }
  ])

  return (
    <div>
      <CustomTable columns={columns} data={allTrees} />
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header>
          <Modal.Title>Editar Árbol</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editedTree ? (
            <Form className="admt-modal-body">
              <Form.Group className="admt-modal-group">
                <Form.Label>NID</Form.Label>
                <Form.Control
                  placeholder="NID"
                  value={editedTree.NID}
                  readOnly
                />
              </Form.Group>
              <Form.Group className="admt-modal-group">
                <Form.Label>Nodo (ID)</Form.Label>
                <Form.Control
                  placeholder="Nodo (ID)"
                  value={editedTree.id_nodo}
                  readOnly
                />
              </Form.Group>
              <Form.Group className="admt-modal-group">
                <Form.Label>Año Plantado</Form.Label>
                <Form.Control
                  placeholder="Año Plantado"
                  value={editedTree.Plantado}
                  readOnly
                />
              </Form.Group>
              <Form.Group className="admt-modal-group">
                <Form.Label>Diametro</Form.Label>
                <Form.Control
                  placeholder="Diametro"
                  value={diametroEdit}
                  onChange={(e) => setDiametroEdit(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="admt-modal-group">
                <Form.Label>Altura</Form.Label>
                <Form.Control
                  placeholder="Altura"
                  value={alturaEdit}
                  onChange={(e) => setAlturaEdit(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="admt-modal-group">
                <Form.Label>Valoración</Form.Label>
                <Form.Control
                  placeholder="Valoración"
                  value={valoracionEdit}
                  onChange={(e) => setValoracionEdit(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="admt-modal-group">
                <Form.Label>Latitud</Form.Label>
                <Form.Control
                  placeholder="Latitud"
                  value={latitudEdit}
                  onChange={(e) => setLatitudEdit(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="admt-modal-group">
                <Form.Label>Longitud</Form.Label>
                <Form.Control
                  placeholder="Longitud"
                  value={longitudEdit}
                  onChange={(e) => setLongitudEdit(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="admt-modal-group">
                <Form.Label>Taxonomía</Form.Label>
                <Form.Control
                  as="select"
                  value={taxonomiaEdit}
                  onChange={(e) => setTaxonomiaEdit(e.target.value)}
                >
                  {allSpecies.map( specie => (
                      <option value={specie.id_taxonomia}>{specie.nombre}</option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group className="admt-modal-group">
                <Form.Label>Jardín</Form.Label>
                <Form.Control
                  as="select"
                  value={jardinEdit}
                  onChange={(e) => setJardinEdit(e.target.value)}
                >
                  {allGardens.map( garden => (
                      <option value={garden.id_jardin}>{garden.nombre}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form>
          ) : 
            "Error: Información no Disponible"}
        </Modal.Body>
        <Modal.Footer className="admt-modal-footer">
            <div>
              <Button className="admt-btn" variant="danger" onClick={handleClose}>
                Dar de baja
              </Button>
            </div>
            <div>
              <Button className="admt-btn" variant="secondary" onClick={handleClose}>
                Cancelar
              </Button>
              <Button className="admt-btn" ariant="primary" onClick={handleFormSubmit}>
                Guardar Cambios
              </Button>
            </div>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
