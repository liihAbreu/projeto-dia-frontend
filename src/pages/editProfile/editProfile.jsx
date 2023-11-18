import "../../assets/styles/pages/editProfile.sass"
import { uploads, urlImage } from "../../utils/config"

//Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

//Hooks
import { useEffect, useRef, useState } from "react"
import { useSelector, useDispatch } from "react-redux"

//Redux
import { deleteUser, profile, resetMessage, updateProfile } from "../../slices/userSlice"
import { logout } from "../../slices/authSlice";

//Components
import Message from "../../components/message/message"
import {BsPencilFill, BsTrash, BsCheckLg} from "react-icons/bs"
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/breadcrumbs/breadcrumbs";

const EditProfile = () => {
    const dispatch = useDispatch()
    const {user, message, error, loading} = useSelector((state) => state.user)
    const navigate = useNavigate()

    //Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);   

    //States
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [profileImage, setProfileImage] = useState("")
    const [perfil, setPerfil] = useState("")
    const [previewImage, setPreviewImage] = useState("")
    
    //Ref
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const perfilRef = useRef()
    const submitRef = useRef()
    const btnAlter = useRef()

    //Load user data
    useEffect(() => {
        dispatch(profile())
    }, [dispatch])

   //Fill form with user data
   useEffect(() =>{
    if(user){
        setName(user.name)
        setEmail(user.email)
        setPerfil(user.perfil)
    }
   }, [user])

   //Enviar formulario de alteração de usuario
    const hendleSubmit = async (e) => {
        e.preventDefault()

        //Gather user data from state
        const userData = {
            name,
        }

        if(profileImage){
            userData.profileImage = profileImage
        }

        if(perfil){
            userData.perfil = perfil
        }

        if(password){
            userData.password = password
        }

        submitRef.current.classList.toggle("hide")
        btnAlter.current.classList.toggle("hide")

        //Build form data
        const formData = new FormData()

        const userFormData = Object.keys(userData).forEach((key) => formData.append(key, userData[key]))

        formData.append("user", userFormData)

        await dispatch(updateProfile(formData))

        setTimeout(() => {
            dispatch(resetMessage())
        }, 2000)

        nameRef.current.setAttribute("disabled", "disabled")
        passwordRef.current.setAttribute("disabled", "disabled")
        perfilRef.current.setAttribute("disabled", "disabled")
    }

    //Alterar a imagem de perfil
    const hendleFile = (e) => {
        //image preview
        const image = e.target.files[0]
        setPreviewImage(image)

        //update image state
        setProfileImage(image)
    }

    //Remover o disabled dos campos do formulario
    const handleAlterUserData = () => {
        nameRef.current.removeAttribute("disabled")
        passwordRef.current.removeAttribute("disabled")
        if(user.perfil === "administrador"){
            perfilRef.current.removeAttribute("disabled")
        }
        submitRef.current.classList.toggle("hide")
        btnAlter.current.classList.toggle("hide")

    }

    //limpar as mensagens
    const resetComponentMessage = () => {
        setTimeout(() => {
            dispatch(resetMessage())
        }, 2000)
    }

    //Deletar cadastro do usuario logado
    const handleDelete = () => {
        dispatch(deleteUser(user._id))
        resetComponentMessage()
        dispatch(logout())
        navigate("/login")
    }

    return (
        <>  
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Deletar?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Deseja mesmo deletar esse perfil?</Modal.Body>
                <Modal.Footer className="justify-content-between">
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleDelete}>
                        Deletar
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className="breadcrumbs">
                <Breadcrumbs/>
            </div>
            <div id="edit-profile">
                <Container>
                    <Row>
                        <Col lg={2}>
                            {(user.profileImage || previewImage) ? (
                                <img className="profile-image" src={
                                    previewImage ? URL.createObjectURL(previewImage) : `${uploads}/users/${user.profileImage}`
                                } alt={user.name} />
                            ) : (
                                <img className="profile-image" src={`${urlImage}/image-profile-default.png`} alt={user.name} />
                            )}
                            <Form.Group as={Row} className="mb-3 alterImage" controlId="formPlaintextImage">
                                <Form.Label column sm="2" onClick={handleAlterUserData}>
                                    Alterar Foto
                                    <BsPencilFill/>
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control type="file" onChange={hendleFile}/>
                                </Col>
                            </Form.Group>
                        </Col>
                        <Col lg={10} className="inputName">
                            <Form.Control disabled ref={nameRef} type="text" placeholder="Nome" value={name || ""} onChange={(e) => setName(e.target.value)} />
                        </Col>
                        <Col>
                            <Form onSubmit={hendleSubmit} >
                                <div className="formUserData">
                                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                        <Form.Label column sm="2">Email:</Form.Label>
                                        <Col sm="10">
                                            <Form.Control ref={emailRef} type="email" placeholder="Email" disabled value={email || ""} />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                        <Form.Label column sm="2">Atualizar a sua senha:</Form.Label>
                                        <Col sm="10">
                                            <Form.Control ref={passwordRef} disabled type="password" placeholder="Digite a sua nova senha" value={password || ""} onChange={(e) => setPassword(e.target.value)}/>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextProfile">
                                        <Form.Label column sm="2">Perfil:</Form.Label>
                                        <Col sm="10">
                                            <Form.Control ref={perfilRef} disabled type="text" placeholder="Descrição do Perfil" value={perfil || ""} onChange={(e) => setPerfil(e.target.value)}/>
                                        </Col>
                                    </Form.Group>
                                    {error && <Message msg={error} type="error" /> }
                                    {message && <Message msg={message} type="success" />}
                                    {!loading && <button ref={submitRef} className="btn updateUser hide" type="submit">Atualizar <BsCheckLg/></button>}
                                    {loading && <button className="btn disabled" disabled>Aguarde...</button>}
                                </div>
                            </Form>
                            <div className="button-form-profile gap-1" >
                                <Col lg={4}>
                                    {user.perfil === "administrador" && <button onClick={handleShow} className="btn">Deletar <BsTrash/></button>}
                                </Col>
                                <Col lg={4}>
                                    <button ref={btnAlter} onClick={handleAlterUserData} className="btn">Alterar <BsPencilFill/></button>
                                </Col>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>                    
        </>
    )
}

export default EditProfile