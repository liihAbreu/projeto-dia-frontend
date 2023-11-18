//css
import "../../assets/styles/components/footer.sass"

//Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//Components
import { Link } from "react-router-dom";
import {BsWhatsapp, BsEnvelope} from "react-icons/bs"

//Hooks
import {useAuth} from "../../hooks/useAuth"

import { urlImage } from "../../utils/config"

const Footer = () => {
    const {auth} = useAuth()
    const userLocal = JSON.parse(localStorage.getItem("user"))
    
    return (
        <>
            <footer id="footer" className="mt-4">
                <Container>
                    <Row>
                        <Col lg={4}>
                            <div className="logo">
                                <img src={`${urlImage}/logo-dia-branco.png`} alt="Logo Projeto D.I.A" />
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className="links-footer">
                                {auth ? (
                                    <>
                                        <Link to={`/`}>Home</Link>
                                        <Link to={`/clients/`}>Clientes</Link>
                                        {userLocal && userLocal.perfil === "administrador" &&
                                            <>
                                                <Link to={`/report/`}>Relatórios</Link>
                                                <Link to={`/employess/`}>Funcionários</Link>
                                            </>
                                        }
                                        <Link to="/profile">Perfil</Link>
                                    </>
                                ) : (
                                    <>
                                        <Link to="/login">Entrar</Link>
                                        <Link to="/register">Cadastrar</Link>
                                    </>
                                )}
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className="contact-footer">
                                <p>Precisa de ajuda? Entre em contato conosco</p>
                                <p>
                                    <span>
                                        <BsWhatsapp/>
                                    </span>
                                    11 95487-7201
                                </p>
                                <Link to={`mailto:liih_nsf@hotmail.com?subject="contato Projeto D.I.A"`}>
                                    <span>
                                        <BsEnvelope/>
                                    </span>
                                    liih_nsf@hotmail.com
                                </Link>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </>
    )
}

export default Footer