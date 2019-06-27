import React from 'react'
import Navbar from 'react-bootstrap/Navbar'

export default props => (
    <Navbar bg="light" variant="light" fixed="bottom" className="justify-content-center">
        <Navbar.Brand href={props.website}>{props.title}</Navbar.Brand>
    </Navbar>
)