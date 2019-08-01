import React, { Component } from 'react'
import { Modal } from "react-bootstrap";

export default class TelaModal extends Component {
    render() {
        return (
            <Modal show={this.props.show}>
                <Modal.Header>
                    <Modal.Title>Meu Consagrado</Modal.Title>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </Modal.Header>
                <Modal.Body>{this.props.msg}</Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-secondary" data-dismiss="modal"
                        onClick={this.props.hide}>Não</button>
                    <button type="button" className="btn btn-danger"
                        onClick={() => this.props.confirm(this.props.obj)}
                        data-dismiss="modal">Sim</button>
                </Modal.Footer>
            </Modal>
        )
    }
}
