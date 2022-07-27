import React, { useContext } from "react";
import { Button, Container } from "react-bootstrap";
import Navbar from 'react-bootstrap/Navbar'
import {Offcanvas,Nav,NavDropdown,Form,FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const MainHeader = () => {
  const {loggedin} = useContext(AuthContext);
  return (
    <>
      {["lg"].map((expand) => (
        <Navbar key={expand}  expand={expand} className="mb-3 ">
          <Container>
            <Navbar.Brand className="logo-cls" href="#"><img src="../assets/logotoolbar.png"/></Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Link className="nav-link"  to="/" >Home</Link>
                  <Link className="nav-link"  to="/labs" >Labs</Link>
                  <Link className="nav-link"  to="/booktest">Book A Test</Link>
                  <Link className="nav-link"  to="/labreports">Lab Reports</Link>
                  {!loggedin && <Link className="nav-link"  to="/login">Login</Link> }
                  {loggedin && <NavDropdown
                    title="My Profile"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                      <Link className="dropdown-item"  to="/profile" >View Profile</Link>
                      <Link className="dropdown-item"  to="/profile" >Edit Profile</Link>
                    <NavDropdown.Divider />
                    <Link className="dropdown-item"  to="/logout" >Log out</Link>
                    
                  </NavDropdown>}
                </Nav>
                <Form className="d-flex">
                  <FormControl
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-light">Search</Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
};
