import React, { useMemo, useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { BsBoxArrowInDownRight } from "react-icons/bs";

import { CustomTable } from "../CustomTable/CustomTable";
import { NumberRangeColumnFilter } from '../CustomTable/filters';

export const AdminBitacora = ({ allBitacoras }) => {
  const [show, setShow] = useState(false);
  const [currentBit, setCurrentBit] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = (e, value) => {
    const bitacora = allBitacoras.filter( bitacora => bitacora.ID_RegBitacora === value)[0];
    setCurrentBit(bitacora)
    setShow(true)
  };

  const columns = useMemo(() => [
    {
      Header: "Arbol (ID)",
      accessor: "NID",
      Filter: NumberRangeColumnFilter,
      filter: "between"
    },
    {
      Header: "Fecha de Reporte",
      accessor: "fechaReporte",
    },
    {
      Header: "Reportado Por",
      accessor: "reportadoPor",
    },
    {
      Header: "Tipo de Reporte",
      accessor: "tipoReporte",
    },
    {
      Header: "",
      accessor: "ID_RegBitacora",
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
      <CustomTable columns={columns} data={allBitacoras} />
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header>
          <Modal.Title>{currentBit ? (`Bitacora #${currentBit.ID_RegBitacora}`) : "Bitacora"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentBit ? (
            <Form>
              <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label column sm="4">
                  Arbol
                </Form.Label>
                <Col sm="8">
                  <Form.Control plaintext readOnly defaultValue={currentBit.NID} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formPlaintextPassword">
                <Form.Label column sm="4">
                  <b>Fecha de Reporte</b>
                </Form.Label>
                <Col sm="8">
                  <Form.Control plaintext readOnly defaultValue={currentBit.fechaReporte} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formPlaintextPassword">
                <Form.Label column sm="4">
                  Reportado por
                </Form.Label>
                <Col sm="8">
                  <Form.Control plaintext readOnly defaultValue={currentBit.reportadoPor} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formPlaintextPassword">
                <Form.Label column sm="4">
                  Tipo de Reporte
                </Form.Label>
                <Col sm="8">
                  <Form.Control plaintext readOnly defaultValue={currentBit.tipoReporte} />
                </Col>
              </Form.Group>
              <Form.Group className="admh-desc">
                <Form.Label>Descripción</Form.Label>
                <Form.Control as="textarea" rows={6} readOnly defaultValue={currentBit.descripcion}/>
              </Form.Group>
            </Form>
          ): null}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
