//Css
import "../../assets/styles/pages/clients.sass"

import Moment from 'moment'

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';

// Import Swiper styles
import "swiper/css";
import 'swiper/css/pagination';
import 'swiper/css/navigation';

//Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

//Components
import { Link, useNavigate, useParams} from "react-router-dom"
import Message from "../../components/message/message"
import {BsCalendar3, BsClock, BsPencilFill, BsTrash, BsCurrencyDollar, BsBoxArrowRight, BsPlus} from "react-icons/bs"
import CardServicesClient from "../../components/cards/cardServicesClient";
import Breadcrumbs from "../../components/breadcrumbs/breadcrumbs";

//Hooks
import {useState, useEffect, useRef} from "react"
import {useSelector, useDispatch} from "react-redux"

//Reducer
import {updateClient, getClientById, deleteClient, } from "../../slices/clientSlice"
import {getServiceClientById, updateServiceClient, updateFinishService, insertServiceClient, resetMessage, deleteServiceClient, deleteAllService, updateReceived,} from "../../slices/servClientSlice"
import {insertHistoric, getHistoricById} from "../../slices/historicSlice"


const AlterClient = () => {
    const dispatch = useDispatch()
    const {id} = useParams()
    const {client,} = useSelector((state) => state.client)
    const {services, loading, error, message} = useSelector((state) => state.service)
    const {user} = useSelector((state) => state.auth)
    const {historics} = useSelector((state) => state.historic)
    const userLocal = JSON.parse(localStorage.getItem("user"))
    const navigate = useNavigate()

    //Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true); 
    const [showClient, setShowClient] = useState(false);
    const handleCloseClient = () => setShowClient(false);
    const handleShowClient = () => setShowClient(true);

    //States
    const [nome, setName] = useState("")
    const [endereco, setEndereco] = useState("")
    const [telefone, setTelefone] = useState("")
    const [serviceId, setServiceId] = useState("")
    const [data, setData] = useState("")
    const [hora, setHora] = useState("")
    const [descricao, setDescricao] = useState("")
    const [valor, setValor] = useState("")
    const [finalizado, setFinalizado] = useState(false)
    const [alterBtn, setAlterBtn] = useState(false)
    const [finishBtn, setFinishBtn] = useState(false)


    //Refs
    const nomeRef = useRef(null)
    const endRef = useRef(null)
    const telRef = useRef(null)
    const readDataRef = useRef(null)
    const horaRef = useRef(null)
    const descRef = useRef(null)
    const valorRef = useRef(null)
    const submitRef = useRef(null)
    const btnAlter = useRef(null)
    const btnFinish = useRef(null)
    const submiClienttRef = useRef(null)
    const btnAlterClient = useRef(null)
    const submitInsert = useRef(null)
    const btnCadastro = useRef(null)
    const deleteService = useRef(null)

    useEffect(() => {
        dispatch(getClientById(id))
        dispatch(getServiceClientById(id))
        dispatch(getHistoricById(id))
    }, [dispatch, id])

    //Fill form with user data
    useEffect(() =>{
        if(client){
            setName(client.nome)
            setEndereco(client.endereco)
            setTelefone(client.telefone)
        }

    }, [client])

    useEffect(() => {
        if(services || services.length < 0){
            services.map((servico) => {
                if(!servico.finalizado && servico._id){
                    setData(servico.date)
                    setHora(servico.hora)
                    setDescricao(servico.descricaoServico)
                    setValor(servico.valorTotal) 
                    setAlterBtn(true)
                    setFinishBtn(true)
    
                    if(servico._id){
                        setServiceId(servico._id)
                    }  
                }

                if(servico.finalizado){
                    setFinalizado(true)
                }
            })
        }

    }, [services, dispatch])

    //Desabilitar a edição dos campos
    const alterHideAndDisabled = () => {
        nomeRef.current.setAttribute("disabled", "disabled")
        endRef.current.setAttribute("disabled", "disabled")
        telRef.current.setAttribute("disabled", "disabled")
        horaRef.current.setAttribute("disabled", "disabled")
        descRef.current.setAttribute("disabled", "disabled")
        valorRef.current.setAttribute("disabled", "disabled")
        readDataRef.current.setAttribute("disabled", "disabled")
    }

    //Limpar os campos
    const resetStatesServices = () => {
        setData("")
        setHora("")
        setDescricao("")
        setValor("")
        setServiceId("")
    }

    //Enviar o formuario de dados do clientes
    const handleSubmitClient = (e) => {
        e.preventDefault()

        const cliente = {
            nome,
            endereco,
            telefone,
            id: id
        }

        dispatch(updateClient(cliente))

        dispatch(getClientById(id))

        setTimeout(() => {
            dispatch(resetMessage())
        }, 2000)

        submiClienttRef.current.classList.toggle("hide")
        btnAlterClient.current.classList.toggle("hide")

        alterHideAndDisabled()

    }

    //Enviar o formulario de serviços
    const hendleSubmit = (e) => {
        e.preventDefault()

        //Finalizar o serviço
        if(e.nativeEvent.submitter.value === "Finalizar Serviço"){
            const service = {
                serviceId: serviceId,
                finalizado: true
            }

            dispatch(updateFinishService(service))

            alterHideAndDisabled()

            setFinishBtn(false)
            setAlterBtn(false)

            resetStatesServices()

            insertUserAlter("finalizou um serviço")
            
            setTimeout(() => {
                dispatch(resetMessage())
            }, 2000)
                        
            return

        }

        //Cadastrar o serviço
        if(e.nativeEvent.submitter.value === "Cadastrar"){

            handleInsertService()
                        
            return

        }

        //Atualizar o serviço
        const service = {
            serviceId: serviceId,
            clientId: id,
        }

        if(data){
            service.date = data
        }

        if(hora){
            service.hora = hora
        }

        if(descricao){
            service.descricaoServico = descricao
        }

        if(valor){
            service.valorTotal = valor
        }

        dispatch(updateServiceClient(service))

        setTimeout(() => {
            dispatch(resetMessage())
        }, 2000)

        alterHideAndDisabled()

        setFinishBtn(true)
        setAlterBtn(true)
        submitRef.current.classList.toggle("hide")

        insertUserAlter("alterou um serviço")

    }

    //Remover o disabled do formulario de dados do cliente
    const handleAlterClientData = () => {
        nomeRef.current.removeAttribute("disabled")
        endRef.current.removeAttribute("disabled")
        telRef.current.removeAttribute("disabled")

        if(submiClienttRef.current.classList.contains("hide")){
            submiClienttRef.current.classList.toggle("hide")
            btnAlterClient.current.classList.toggle("hide")
        }
    }

    //Tirar o disabled do formulario de serviços
    const handleAlterServiceData = (e) => {
        horaRef.current.removeAttribute("disabled")
        descRef.current.removeAttribute("disabled")
        valorRef.current.removeAttribute("disabled")
        readDataRef.current.removeAttribute("disabled")
        
        if(e.nativeEvent.srcElement.innerText === "Cadastrar serviço"){
            if(submitInsert.current.classList.contains("hide")){
                submitInsert.current.classList.toggle("hide")
                btnCadastro.current.classList.toggle("hide")
                setFinishBtn(false)
                return
            }
        }

        if(submitRef.current.classList.contains("hide")){
            submitRef.current.classList.toggle("hide")
            setAlterBtn(false)
            setFinishBtn(false)
        }
    }

    //Cadastrar um serviço
    const handleInsertService = () => {
        const service = {
            clientId: id,
            idMestre: userLocal.idMestre,
        }

        if(data){
            service.date = data
        }

        if(hora){
            service.hora = hora
        }

        if(descricao){
            service.descricaoServico = descricao
        }

        if(valor){
            service.valorTotal = valor
        }


        dispatch(insertServiceClient(service))

        insertUserAlter("cadastrou um serviço")

        setTimeout(() => {
            dispatch(resetMessage())
        }, 2000)

        alterHideAndDisabled()

        setFinishBtn(true)
        setAlterBtn(true)

    }

    //Deletar cadastro do cliente e todos os serviços vinculados ao cliente
    const handledelete = () => {
        dispatch(deleteAllService(id))
        dispatch(deleteClient(id))
        setTimeout(() => {
            dispatch(resetMessage())
        }, 2000)
        navigate("/clients/")
    }

    //Deletar somente o serviço que esta em aberto
    const handledeleteService = () => {
        dispatch(deleteServiceClient(serviceId))

        alterHideAndDisabled()

        setFinishBtn(false)
        setAlterBtn(false)

        resetStatesServices()

        insertUserAlter("excluiu um serviço")

        handleClose()

        setTimeout(() => {
            dispatch(resetMessage())
        }, 2000)
    }

    //Inserir o historico de alterações feita pelo usuario logado
    const insertUserAlter = (action) => {
        const moment = Moment()
        const historico = {
            nome: user.name,
            data: `${moment.date()}/${moment.month()}/${moment.year()}`,
            hora: `${moment.hour()}:${moment.minute()}`,
            acao: action,
            descricaoServico: descricao, 
            clientId: id,
        }

        dispatch(insertHistoric(historico))
    }

    //Informar que o valor do serviço foi recebido
    const handleValorRecebido = (e) => {

        const service = {
            serviceId: e.target.attributes[1].value,
            valorTotalRecebido: true
        }

        dispatch(updateReceived(service))

        e.target.classList.add("hide")

        insertUserAlter("recebeu o valor")
        
        setTimeout(() => {
            dispatch(resetMessage())
        }, 2000)

    }
    
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Deletar?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Deseja mesmo deletar esse serviço?</Modal.Body>
                <Modal.Footer className="justify-content-between">
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handledeleteService}>
                        Deletar
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showClient} onHide={handleCloseClient}>
                <Modal.Header closeButton>
                    <Modal.Title>Deletar?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Deseja mesmo deletar esse cliente?</Modal.Body>
                <Modal.Footer className="justify-content-between">
                    <Button variant="secondary" onClick={handleCloseClient}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handledelete}>
                        Deletar
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className="breadcrumbs">
                <Breadcrumbs/>
            </div>
            <Container>
                <Row>
                    <Col>
                        <div id="AlterClient">
                            <h1 className="title-main center">Cadastrar um Cliente</h1>
                            <Form onSubmit={handleSubmitClient} className="FormRegisterClient">
                                <div className="dataClient">
                                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
                                        <Form.Label column sm="2">Nome:</Form.Label>
                                        <Col sm="10">
                                            <Form.Control type="text" ref={nomeRef}  disabled placeholder="Nome do cliente" value={nome || ""}  onChange={(e) => setName(e.target.value)} />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextAddress">
                                        <Form.Label column sm="2">Endereço:</Form.Label>
                                        <Col sm="10">
                                            <Form.Control type="text" ref={endRef}  disabled placeholder="Endereço do cliente" value={endereco || ""}  onChange={(e) => setEndereco(e.target.value)} />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintextTelephone">
                                        <Form.Label column sm="2">Telefone:</Form.Label>
                                        <Col sm="10">
                                            <Form.Control type="tel" ref={telRef} disabled placeholder="Telefone do Cliente" value={telefone || ""} onChange={(e) => setTelefone(e.target.value)} />
                                        </Col>
                                    </Form.Group>
                                    {!loading && <input className="submitClient hide" ref={submiClienttRef}  type="submit" value="Atualizar" />}
                                    {loading && <input className="submitClient" type="submit" value="Aguarde..." disabled />}
                                </div>
                            </Form>
                            <div className="button-form-action gap-1" >
                                <Col lg={4}>
                                    <button ref={btnAlterClient} className="btn" onClick={handleAlterClientData}>Alterar <BsPencilFill/></button>
                                </Col>
                            </div>
                            <Form onSubmit={hendleSubmit} className="FormRegisterClient">
                                <h2 className="title-main center">Cadastrar um serviço</h2>
                                <div className="services">
                                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextDate">
                                        <Col sm="4" className="displayCalendarServices">
                                            <Form.Label column sm="2"><BsCalendar3/></Form.Label>
                                            <Form.Control type="text" ref={readDataRef}  disabled placeholder="Data do serviço"  value={data || ""} onChange={(e) => setData(e.target.value)} />
                                        </Col>
                                        <Col sm= {{ span: 4, offset: 4 }} className="displayClockServices" >
                                            <Form.Label column sm="2"><BsClock/></Form.Label>
                                            <Form.Control type="time" ref={horaRef} disabled placeholder="Horário do Serviço" value={hora || ""}  onChange={(e) => setHora(e.target.value)} />
                                        </Col>
                                    </Form.Group>
                                    <h2 className="title-main">Tipo de Serviço</h2>
                                    <Form.Group className="mb-3" controlId="formPlaintextDescription">
                                        <Form.Label column sm="2">Descrição do Serviço:</Form.Label>
                                        <Col>
                                            <Form.Control type="text" ref={descRef}  disabled as="textarea" placeholder="Descrição do Serviço a ser prestado" value={descricao || ""} onChange={(e) => setDescricao(e.target.value)} />
                                        </Col>
                                    </Form.Group>
                                    <h2 className="title-main">Valor</h2>
                                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextValue">
                                            <Col>
                                                <Form.Control type="number" ref={valorRef}  disabled placeholder="Valor total do serviço" value={valor || ""} onChange={(e) => setValor(e.target.value)} />
                                            </Col>
                                    </Form.Group>
                                    { finishBtn &&  
                                        <div className="button-finalizar" > 
                                            <input type="submit" className="submitClient" ref={btnFinish} value="Finalizar Serviço" />
                                        </div>
                                    }
                                    <div className="message">
                                        {error && <Message msg={error} type="error" /> }
                                        {message && <Message msg={message} type="success" /> }
                                    </div>
                                    {!loading && <input className="submitClient hide" ref={submitRef}  type="submit" value="Atualizar" />}
                                    {!loading && <input className="submitClient hide" ref={submitInsert}  type="submit" value="Cadastrar" />}
                                    {loading && <input className="submitClient" type="submit" value="Aguarde..." disabled />}
                                </div>
                            </Form>
                            <div className="button-form-action gap-1" >
                                <Col lg={4}>
                                    {alterBtn && <button onClick={handleShow} ref={deleteService} className="btn">Deletar Serviço <BsTrash/></button>}
                                </Col>
                                <Col lg={4}>
                                    {alterBtn && <button ref={btnAlter} className="btn" onClick={handleAlterServiceData}>Alterar Serviço <BsPencilFill/></button>}
                                    {!alterBtn && <button ref={btnCadastro} onClick={handleAlterServiceData} className="btn">Cadastrar serviço <BsPlus/></button>}
                                </Col>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div id="ServicesCliet">
                            {finalizado &&
                                <h2 className="title-main center pb-4 pt-4">Serviços Finalizados</h2>
                            }
                            <Swiper cssMode={true} navigation={true} pagination={true} mousewheel={true} keyboard={true} modules={[Navigation, Pagination, Mousewheel, Keyboard]} className="mySwiper">
                                { services || services.length > 0 ? (
                                        services.map((service) => (
                                            <>
                                                {service.finalizado &&
                                                    <SwiperSlide key={service._id}>
                                                        <div id='cardServices' >
                                                            <CardServicesClient descricao={service.descricaoServico} valorTotal={service.valorTotal} dataFinish={service.updatedAt}/>
                                                            {!service.valorTotalRecebido &&
                                                                <div className="btn-valor">
                                                                    <button className="btn btn-ValorRecebido" data-id={service._id} onClick={handleValorRecebido}>Valor Total Recebido <BsCurrencyDollar/></button>
                                                                </div>
                                                            }
                                                        </div>
                                                    </SwiperSlide>
                                                }
                                            </> 
                                        ))
                                    ) : (
                                        <SwiperSlide>
                                            <div id='cardServices' >
                                                <p>Nenhum serviço finalizado.</p>
                                            </div>
                                        </SwiperSlide>
                                    )
                                }
                            </Swiper>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className={user.perfil === "administrador" ? "btn-voltar-deletar" : "btn-voltar"} >
                            {user.perfil === "administrador" && <button onClick={handleShowClient} className="btn">Deletar cadastro do cliente <BsTrash/></button>}
                            <Link className="btn" to={`/clients/`}>Voltar <BsBoxArrowRight/></Link>
                        </div>
                    </Col>
                </Row>
            </Container>
            {historics.length > 0 && (
                <Container fluid>
                    <Row>
                        <Col className="mb-4 mt-4">
                            <div id="historic">
                                {historics.map((item) => (
                                    <p key={item._id}>{item.nome} {item.acao}, {item.descricaoServico}, dia {item.data} às {item.hora}</p>
                                ))}
                            </div>
                        </Col>
                    </Row>
                </Container>
            )}
        </>
    )
}

export default AlterClient