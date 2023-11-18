//Css
import "../../assets/styles/pages/auth.sass";
import "../../assets/styles/pages/employees.sass"

//Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

//Components
import Message from "../../components/message/message"
import Breadcrumbs from "../../components/breadcrumbs/breadcrumbs";
import { useNavigate } from "react-router-dom";


//Hooks
import {useState, useEffect} from "react"
import {useSelector, useDispatch} from "react-redux"

//Reducer
import { reset, registerEmployee } from "../../slices/authSlice"

const RegisterEmployee = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [perfil, setPerfil] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user,loading, error, message} = useSelector((state) => state.auth)

    //Enviar formulario de cadastro de funcionario
    const hendleSubmit = (e) => {
        e.preventDefault()

        const newUser = {
            name,
            email,
            password,
            confirmPassword,
            perfil,
            idMestre: user.idMestre
        }

        dispatch(registerEmployee(newUser))
       
        navigate("/employess/")
    }

    //Clean all auth states
    useEffect(() => {
        dispatch(reset())
    }, [dispatch])

    const handlePerfil = (e) => {
        e.preventDefault()
        setPerfil(e.target.value)
    }

    return (
        <>
            <div className="breadcrumbs">
                <Breadcrumbs/>
            </div>
            <Container>
                <Row>
                    <Col lg={{ span: 4, offset: 4 }} md={{ span: 6, offset: 4 }}>
                        <div id="register">
                            <p className="subtitle" >Cadastre seu(s) fincionário(s).</p>
                            <Form onSubmit={hendleSubmit} className="formRegisterEmployee">
                                <Form.Group className="mb-3" controlId="formPlaintextName">
                                    <Form.Label column sm="2">Nome:</Form.Label>
                                    <Form.Control type="text" placeholder="Digite o Nome..." value={name || ""} onChange={(e) => setName(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formPlaintextEmail">
                                    <Form.Label column sm="2">Email:</Form.Label>
                                    <Form.Control type="email" placeholder="Digite o E-mail..." value={email || ""}  onChange={(e) => setEmail(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column sm="2">Senha:</Form.Label>
                                    <Form.Control type="password" placeholder="Digite a Senha..." value={password || ""} onChange={(e) => setPassword(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formPlaintextConfirmPassword">
                                    <Form.Label column sm="2">Confirme a Senha:</Form.Label>
                                    <Form.Control type="password" placeholder="Digite novamente a senha..." value={confirmPassword || ""} onChange={(e) => setConfirmPassword(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3 checkPerfil" controlId="formPlaintextEmail">
                                    <Form.Label column sm="2">Perfil do usuário:</Form.Label>
                                    <Form.Check type={"radio"} id={"admin"} label={"Administrador"} name="perfil" value="administrador" onChange={handlePerfil} />
                                    <Form.Check type={"radio"} id={"func"} label={"Funcionário"} name="perfil" value="funcionário" onChange={handlePerfil} />
                                </Form.Group>
                                {error && <Message msg={error} type="error" /> }
                                {message && <Message msg={message} type="success" /> }
                                {!loading && <input type="submit" value="Cadastrar" />}
                                {loading && <input type="submit" value="Aguarde..." disabled />}
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default RegisterEmployee