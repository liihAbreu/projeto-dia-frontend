//css
import "../../assets/styles/pages/home.sass"

import moment from 'moment'

//Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';

// Import Swiper styles
import "swiper/css";
import 'swiper/css/pagination';
import 'swiper/css/navigation';

//Components
import { Link } from "react-router-dom"
import { BsCalendar3, BsPencilFill } from "react-icons/bs"


//Hooks
import { useEffect, useState } from "react"
import {useSelector, useDispatch} from "react-redux"

//Redux
import {getAllServices} from "../../slices/servClientSlice"


const Home = () => {
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.auth)
    const {services, loading,} = useSelector((state) => state.service)
    const [noService, setNoService] = useState(false)
    const [data, setdata] = useState()
    const [finalizado, setFinalizado] = useState()
    const userLocal = JSON.parse(localStorage.getItem("user"))

    //Load all services
    useEffect(() => {
        dispatch(getAllServices(userLocal.idMestre))
    }, [dispatch, userLocal.idMestre])

    useEffect(() => {
        if(services){
            services.map((service) => {
                if(!service.finalizado){
                    setNoService(false)
                    setFinalizado(true)
                }
                if(service.date == moment().format("DD/MM/YYYY")){
                    setdata(true)
                }
            })

            if(services.length === 0){
                setNoService(true)
            }
        }
    }, [services])


    if(loading){
        return <p className="center">Carregando...</p>
    }

    return (
        <>
            <div id="home">
                <Container>
                    <Row>
                        <Col>
                            <div id="user" className="mb-4">
                                <h2>Ola, {user.name},</h2>
                                <h2>Hoje é: {moment().format("DD/MM/YYYY")}</h2>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <div id="services">
                    <Container>
                        <Row>
                            <Col className="mt-4">
                                <h3 className="title-main center">Serviços agendados para hoje</h3>
                                {noService && !data &&
                                    <p className="center mb-4">
                                        Não há serviços agendados.
                                    </p>
                                }
                                {services && services.map((service) => (
                                    <>
                                        {!service.finalizado && service.date == moment().format("DD/MM/YYYY") && (
                                            <div className="cards">
                                                <Card>
                                                    <Card.Header>
                                                        <h3>
                                                            <span><BsCalendar3/></span>
                                                            {service.date} ás {service.hora}
                                                        </h3>
                                                    </Card.Header>
                                                    <Card.Body>
                                                        <h4>Tipo de Serviço:</h4>
                                                        <p> {service.descricaoServico} </p>
                                                        <h4>Valor Total:</h4>
                                                        <p>R$ {service.valorTotal} </p>                   
                                                    </Card.Body>
                                                </Card>
                                                <Link className="btn" to={`/clients/${service.clientId}`}>Alterar <BsPencilFill/></Link>
                                            </div>
                                        )}
                                    </>
                                ))}
                            </Col>
                        </Row>
                        <Row>
                            <Col className="mt-4 mb-4">
                                <h3 className="title-main center">Próximos serviços agendados</h3>
                                {noService && !finalizado &&
                                    <p className="center mb-4">
                                        Não há serviços agendados.
                                    </p>
                                }
                                <Swiper cssMode={true} navigation={true} pagination={true} mousewheel={true} keyboard={true} modules={[Navigation, Pagination, Mousewheel, Keyboard]} className="mySwiper">
                                    {services && services.map((service) => (
                                        <>
                                                {!service.finalizado && service.date !== moment().format("DD/MM/YYYY") && (
                                                    <SwiperSlide key={service._id}>
                                                        <div className="cards">
                                                            <Card>
                                                                <Card.Header>
                                                                    <h3>
                                                                        <span><BsCalendar3/></span>
                                                                        {service.date} ás {service.hora}
                                                                    </h3>
                                                                </Card.Header>
                                                                <Card.Body>
                                                                    <h4>Tipo de Serviço:</h4>
                                                                    <p> {service.descricaoServico} </p>
                                                                    <h4>Valor Total:</h4>
                                                                    <p>R$ {service.valorTotal} </p>                   
                                                                </Card.Body>
                                                            </Card>
                                                            <Link className="btn" to={`/clients/${service.clientId}`}>Alterar <BsPencilFill/></Link>
                                                        </div>
                                                    </SwiperSlide>
                                                )}
                                        </>
                                    ))
                                    }
                                </Swiper>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </>
    )
}

export default Home