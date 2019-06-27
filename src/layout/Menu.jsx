import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export default props => (
    <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
            <Nav.Link href="/escola">Escolas</Nav.Link>
            <Nav.Link href="/turma">Turmas</Nav.Link>
        </Nav>
    </Navbar.Collapse>
)