//css
import "../../assets/styles/pages/auth.sass"

//Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import { urlImage } from "../../utils/config";

//Google Auth
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode'

//components
import {Link} from "react-router-dom"
import Message from "../../components/message/message"

//Hooks
import {useState, useEffect} from "react"
import {useSelector, useDispatch} from "react-redux"

//Redux
import { login, reset, loginOAuth } from "../../slices/authSlice"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const {loading, error} = useSelector((state) => state.auth)

    const hendleSubmit = (e) => {
        e.preventDefault()

        const user = {
            email,
            password
        }

        dispatch(login(user))
    }

    const googleLogin = (credentialResponse) => {
        const credential = jwtDecode(credentialResponse.credential);

        const user = {
            email: credential.email,
            sub: credential.sub
        }

        dispatch(loginOAuth(user))
    }

    //Clean all auth states
    useEffect(() => {
        dispatch(reset())
    }, [dispatch])

    if(loading){
        return (
            <p>
                Carregando...
            </p>
        )
    }

    return(
        <>
            <GoogleOAuthProvider clientId="727667578818-nksncf8156d06mb7b0887tuol5j81fea.apps.googleusercontent.com">
                <Container>
                    <Row>
                        <Col lg={{ span: 4, offset: 4 }} md={{ span: 6, offset: 4 }}>
                            <div id="login">
                                <img src={`${urlImage}/logo-dia.png`} className="logo" alt="Logo Projeto D.I.A" />
                                <p className="subtitle" >Faça o login para genrenciar as suas tarefas. </p>
                                <div className="Oauth">
                                    <GoogleLogin size= "large"  onSuccess={credentialResponse => {googleLogin(credentialResponse);}} onError={() => {console.log('Login Failed');}}/>
                                </div>
                                <Form onSubmit={hendleSubmit} >
                                    <Form.Group className="mb-3" controlId="formPlaintextEmail">
                                        <Form.Label column >Email:</Form.Label>
                                        <Form.Control type="email" placeholder="Digite o Email..." value={email || ""} onChange={(e) => setEmail(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formPlaintextPassword">
                                        <Form.Label column >Email:</Form.Label>
                                        <Form.Control type="password" placeholder="Digite a Senha..." value={password || ""} onChange={(e) => setPassword(e.target.value)} />
                                    </Form.Group>
                                    {!loading && <input type="submit" value="Entrar" />}
                                    {loading && <input type="submit" value="Aguarde..." disabled />}
                                    {error && <Message msg={error} type="error" /> }
                                </Form>
                                <p>Não tem uma conta? <Link to="/register" >Cadastre-se aqui</Link></p>
                            </div>                   
                        </Col>
                    </Row>
                </Container>
            </GoogleOAuthProvider>
        </>
    )
}

export default Login