//css
import "../../assets/styles/components/navbar.sass"

//Bootstrap
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Offcanvas from 'react-bootstrap/Offcanvas'

import { urlImage } from "../../utils/config"

//components
import {BsPersonCircle} from "react-icons/bs"

//Hooks
import { useEffect } from "react"
import {useAuth} from "../../hooks/useAuth"
import {useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom"

//Redux
import { logout, reset } from "../../slices/authSlice"
import { profile } from "../../slices/userSlice"

const NavBar = () => {
    const {auth} = useAuth()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userLocal = JSON.parse(localStorage.getItem("user"))

    useEffect(() => {
        dispatch(profile())
    }, [dispatch])


    //Deslogar o usuario
    const hendleLogout = () => {
        dispatch(logout())

        navigate("/login")

        dispatch(reset())
    }

    return(
        <>
            <Navbar expand="lg" className="bg-body-tertiary mb-3" id="nav">
                <Container fluid>
                    <Row>
                        <Col xs={9} lg={3}>
                            <Navbar.Brand href="/" className="logo">
                                <img src={`${urlImage}/logo-dia.png`} className="d-inline-block align-top" alt="Logo Projeto D.I.A"/>
                            </Navbar.Brand>
                        </Col>
                        <Col xs={3} lg={9}>
                            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
                            <Navbar.Offcanvas id={`offcanvasNavbar-expand-lg`} aria-labelledby={`offcanvasNavbarLabel-expand-lg`} placement="end">
                                <Offcanvas.Header closeButton/>
                                <Offcanvas.Body>
                                    <Nav className="flex-grow-1">
                                    {auth ? (
                                        <>
                                            {userLocal && userLocal.perfil === "administrador" ? (
                                                <>
                                                    <Col className="menu-list">
                                                        <Nav.Link href="/">Home</Nav.Link>
                                                        <Nav.Link href={`/clients/`}>Clientes</Nav.Link>
                                                        <Nav.Link href={`/report/`}>Relatórios</Nav.Link>
                                                        <Nav.Link href={`/employess/`}>Funcionários</Nav.Link>
                                                    </Col>
                                                </>
                                            ) : (
                                                <>                                                          
                                                    <Col className="menu-list-employee">
                                                        <Nav.Link href="/">Home</Nav.Link>
                                                        <Nav.Link href={`/clients/`}>Clientes</Nav.Link>
                                                    </Col>
                                                </>
                                            )}
                                            <Col lg={1}>
                                                <NavDropdown title={<BsPersonCircle/>} id={`offcanvasNavbarDropdown-expand-lg`} className="perfil">
                                                    <NavDropdown.Item href="/profile">Editar Perfil</NavDropdown.Item>
                                                    <NavDropdown.Item onClick={hendleLogout}>Sair</NavDropdown.Item>
                                                </NavDropdown>
                                            </Col>
                                        </>
                                    ) : (
                                        <Col className="menu-list menu-list-logout">
                                            <Nav.Link href="/login">Entrar</Nav.Link>
                                            <Nav.Link href='/register'>Cadastrar</Nav.Link>
                                        </Col>
                                    )}
                                    </Nav>
                                </Offcanvas.Body>
                            </Navbar.Offcanvas>
                        </Col>
                    </Row>
                </Container>
            </Navbar>
        </>
    )
}

export default NavBar