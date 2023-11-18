//Css
import "../../assets/styles/pages/auth.sass"

//Google Auth
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode'

//Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import { urlImage } from "../../utils/config"

//Components
import {Link} from "react-router-dom"
import Message from "../../components/message/message"

//Hooks
import {useState, useEffect} from "react"
import {useSelector, useDispatch} from "react-redux"

//Reducer
import { register, registerAuth, reset } from "../../slices/authSlice"

const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const dispatch = useDispatch()
    const {loading, error} = useSelector((state) => state.auth)

    const hendleSubmit = (e) => {
        e.preventDefault()

        const user = {
            name,
            email,
            password,
            confirmPassword,
            perfil: "administrador",
        }

        dispatch(register(user))
    }

    //Clean all auth states
    useEffect(() => {
        dispatch(reset())
    }, [dispatch])

    const googleRegister = (credentialResponse) => {
        const credential = jwtDecode(credentialResponse.credential);

        const user = {
            name: credential.name,
            email: credential.email,
            sub: credential.sub,
            perfil: "administrador",
        }

        dispatch(registerAuth(user))
    }

    return (
        <>
            <GoogleOAuthProvider clientId="727667578818-nksncf8156d06mb7b0887tuol5j81fea.apps.googleusercontent.com">
                <Container>
                    <Row>
                        <Col lg={{ span: 4, offset: 4 }} md={{ span: 6, offset: 3 }}>
                            <div id="register">
                                <img src={`${urlImage}/logo-dia.png`} className="logo" alt="Logo Projeto D.I.A" />
                                <p className="subtitle" >Registre-se para utilizar o sistema.</p>
                                <div className="Oauth">
                                    <GoogleLogin size= "large"  onSuccess={credentialResponse => {googleRegister(credentialResponse);}} onError={() => {console.log('Login Failed');}}/>
                                </div>
                                <Form onSubmit={hendleSubmit} >
                                    <Form.Group className="mb-3" controlId="formPlaintextName">
                                        <Form.Label column >Nome:</Form.Label>
                                        <Form.Control type="text" placeholder="Digite o Nome..." value={name || ""} onChange={(e) => setName(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formPlaintextEmail">
                                        <Form.Label column >Email:</Form.Label>
                                        <Form.Control type="email" placeholder="Digite o E-mail..." value={email || ""} onChange={(e) => setEmail(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formPlaintextPassword">
                                        <Form.Label column >Senha:</Form.Label>
                                        <Form.Control type="password" placeholder="Digite a Senha..." value={password || ""} onChange={(e) => setPassword(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formPlaintextConfirmPassword">
                                        <Form.Label column>Confirme a senha:</Form.Label>
                                        <Form.Control type="password" placeholder="Digite a senha novamente..." value={confirmPassword || ""} onChange={(e) => setConfirmPassword(e.target.value)} />
                                    </Form.Group>
                                    {!loading && <input type="submit" value="Cadastrar" />}
                                    {loading && <input type="submit" value="Aguarde..." disabled />}
                                    {error && <Message msg={error} type="error" /> }
                                </Form>
                                <p>Ja tem conta? <Link to="/login" >Faça o login aqui.</Link> </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </GoogleOAuthProvider>
        </>
    )
}

export default Register