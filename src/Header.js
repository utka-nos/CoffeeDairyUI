import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';

export function Header({setAuthorities}, {authorities}) {

    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false)
    const [authorized, setAuthorized] = useState(false)

    useEffect(() => {
      if(localStorage.getItem("jwt_token") !== "") {
        setAuthorized(true);
        setIsAdmin(checkIsAdmin);
      } else {
        setAuthorized(false);
        setIsAdmin(false);
      }
    }, []);

    const checkIsAdmin = () => {
      fetch("http://localhost:8082/api/v1/users/authorities", {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("jwt_token")
        }
      })
        .then(response => {
          if (response.status !== 200) {
            setIsAdmin(false);
            setAuthorized(false);
            localStorage.setItem("id_token", "");
            localStorage.setItem("jwt_token", "")
          }
          return response.json();
        })
        .then(authoritiesFromServer => {
          setAuthorities(authoritiesFromServer)
          setIsAdmin(authoritiesFromServer.includes("ADMIN"))
        })
        .catch (err => console.error(err));
    }

    const onClickLogin = () => {
      navigate("/login")
    }

    const onCLickLogout = () => {
      window.location.assign("http://localhost:8082/api/v1/logout");
      localStorage.setItem("jwt_token", "");
      localStorage.setItem("id_token", "");
    }

    const isActive = (path) => {
      return path === "/" + window.location.pathname.split('/')[1]
    }

    const btnLoginLogout = () => {
      if (!authorized) return (
        <Button variant="outline-success" className="d-flex" onClick={onClickLogin}>login</Button>
      )
      else return (
        <Button variant="outline-success" className="d-flex" onClick={onCLickLogout}>logout</Button>
      )}

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="/home">CoffeeDairy</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                {/* home page */}
                <Nav.Link href="/home"    active={isActive("/home")} >home</Nav.Link>
                {/* users page */}
                <Nav.Link href="/users"   active={isActive("/users")}>users</Nav.Link>
                {/* my coffees page */}
                <Nav.Link href="/my-coffees"   active={isActive("/my-coffees")}>My coffees</Nav.Link>
                {/* profile page */}
                <Nav.Link href="/profile" active={isActive("/profile")} hidden={!authorized}>profile</Nav.Link>
                {/* admin page */}
                <NavDropdown title="admin" id="basic-nav-dropdown" active={isActive("/admin")} hidden={!isAdmin}>
                  <NavDropdown.Item href="/admin" active={"/admin" === window.location.pathname}>
                    Admin
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/admin/coffee-descriptions" active={"/admin/coffee-descriptions" === window.location.pathname}>
                    CoffeeDescriptions
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/admin/coffees" active={"/admin/coffees" === window.location.pathname}>
                    Coffees
                  </NavDropdown.Item>

                </NavDropdown>
              </Nav>

              {btnLoginLogout()}

            </Navbar.Collapse>
          </Container>
        </Navbar>
    );
}