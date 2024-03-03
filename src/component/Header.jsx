



import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../images/abc-high-resolution-logo-transparent.png';
import 'bootstrap/dist/css/bootstrap.min.css'; 

function Header() {
  return (
    <div>
      <Navbar bg="light" expand="lg"> 
        <Container>
          <Navbar.Brand href="#home">
            <img
              className='ms-5'
              style={{ width: '60px' }}
              src={Logo}
              alt="Company Logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto ps-5 fw-bolder  " style={{ color: 'black' }}>
              <Nav.Link href="#doctor"><i className="fa-solid fa-notes-medical"></i> Find a Doctor</Nav.Link>
              <Nav.Link href="/departmentdetails"><i className="fa-solid fa-suitcase-medical"></i> Medical Services</Nav.Link>
              <Nav.Link href="https://www.google.com/maps"><i className="fa-regular fa-hospital"></i> Hospital & Directions</Nav.Link>
              <Nav.Link href="/login"><i className="fa-regular fa-calendar-check"></i> Book an Appointment</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;

