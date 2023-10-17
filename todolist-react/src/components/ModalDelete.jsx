import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

function ModalDelete({ handleClose, deleteTodo, show, item}) {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Advertencia!</Modal.Title>
            </Modal.Header>
            {/* PREGUNTAR CON ITEM? */}
            <Modal.Body>Estas seguro de querer eliminar la tarea <span className='fw-bold'>{item?.titulo}</span>?</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="danger" onClick={() => deleteTodo(item.id)}>
                    Eliminar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalDelete