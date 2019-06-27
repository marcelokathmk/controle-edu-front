import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Menu from './Menu';

export default props => (
    <Navbar bg="primary" variant="dark" fixed="top">
        <Navbar.Brand href="/">{props.title}</Navbar.Brand>
        <Menu/>
    </Navbar>
)