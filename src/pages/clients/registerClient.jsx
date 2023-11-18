//Css
import "../../assets/styles/pages/clients.sass"

//Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

//Components
import {useNavigate} from "react-router-dom"
import Message from "../../components/message/message"
import Breadcrumbs from "../../components/breadcrumbs/breadcrumbs";

//Hooks
import {useState, useEffect} from "react"
import {useSelector, useDispatch} from "react-redux"
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage"

//Reducer
import { reset } from "../../slices/authSlice"
import {insertClient} from "../../slices/clientSlice"

const RegisterClient = () => {
    const [nome, setName] = useState("")
    const [endereco, setEndereco] = useState("")
    const [telefone, setTelefone] = useState("")


    const dispatch = useDispatch()
    const navigate = useNavigate()
    const resetMessage = useResetComponentMessage(dispatch)
    const {loading, error, message} = useSelector((state) => state.client)
    const userLocal = JSON.parse(localStorage.getItem("user"))

    //Enviar o formulario de cadastro do cliente
    const hendleSubmit = (e) => {
        e.preventDefault()

        const cliente = {
            nome,
            endereco,
            telefone,
            idMestre: userLocal.idMestre
        }

        dispatch(insertClient(cliente))

        setName("")
        setEndereco("")
        setTelefone("")

        setTimeout(() => {
            dispatch(resetMessage())
        }, 2000)

        navigate("/clients/")
    }

    //Clean all auth states
    useEffect(() => {
        dispatch(reset())
    }, [dispatch])

    return (
        <>
            <div className="breadcrumbs">
                <Breadcrumbs/>
            </div>
            <Container>
                <Row>
                    <Col>
                        <div id="registerClient">
                            <h1 className="title-main center">Cadastrar um Cliente</h1>
                            <Form onSubmit={hendleSubmit} className="FormRegisterClient">
                                <div className="dataClient">
                                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
                                        <Form.Label column sm="2">Nome:</Form.Label>
                                        <Col sm="10">
                                            <Form.Control type="text" placeholder="Nome do cliente" value={nome || ""}  onChange={(e) => setName(e.target.value)} />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextAddress">
                                        <Form.Label column sm="2">Endereço:</Form.Label>
                                        <Col sm="10">
                                            <Form.Control type="text" placeholder="Endereço do cliente" value={endereco || ""}  onChange={(e) => setEndereco(e.target.value)} />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextTelephone">
                                        <Form.Label column sm="2">Telefone:</Form.Label>
                                        <Col sm="10">
                                            <Form.Control type="tel" placeholder="Telefone do Cliente" value={telefone || ""} onChange={(e) => setTelefone(e.target.value)} />
                                        </Col>
                                    </Form.Group>
                                </div>
                                {error && <Message msg={error} type="error" /> }
                                {message && <Message msg={message} type="success" /> }
                                <Col lg={{ span: 4, offset: 4 }}>
                                    {!loading && <input className="submitClient" type="submit" value="Cadastrar" />}
                                    {loading && <input className="submitClient" type="submit" value="Aguarde..." disabled />}
                                </Col>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default RegisterClient