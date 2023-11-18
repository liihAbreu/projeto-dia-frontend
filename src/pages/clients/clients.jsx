//css
import "../../assets/styles/pages/employees.sass"

//Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

//Components
import { BsSearch, BsPlus, BsPencilFill } from 'react-icons/bs';
import { Link } from "react-router-dom";
import CardClient from "../../components/cards/cardClient";
import Breadcrumbs from "../../components/breadcrumbs/breadcrumbs";

//Hooks
import { useState, useEffect } from 'react';
import {useSelector, useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom"

//Redux
import { getAllClientById } from "../../slices/clientSlice"

const Clients = () => {
    const [query, setQuery] = useState("")
    const {clients} = useSelector((state) => state.client)
    const userLocal = JSON.parse(localStorage.getItem("user"))
    const dispatch = useDispatch()
    const navigate = useNavigate()  

    useEffect(() => {
        dispatch(getAllClientById(userLocal.idMestre))
    }, [dispatch, userLocal.idMestre])

    //Buscar clientes
    const handleSearch = (e) => {
        e.preventDefault()
        if(query){
          return navigate(`/search/?q=${query}`)
        }
    }

    return (
        <>
            <div className="breadcrumbs">
                <Breadcrumbs/>
            </div>
            <div id='employees'>
                <Container>
                    <Row>
                        <Col>
                            <h1 className='title-main'>Buscar um Cliente</h1>
                            <Form id="search-form" onSubmit={handleSearch}>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextSearch">
                                    <Col sm="12">
                                        <Form.Control type="text" placeholder="Pesquisar" onChange={(e) => setQuery(e.target.value)} />
                                        <button type='submit' className='btn'>Buscar <BsSearch/></button>
                                    </Col>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={4}>
                            <Link to="/clients/register" className="btn register-employees">Cadastrar Cliente <BsPlus/></Link>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {clients && clients.map((client) => (
                                <>
                                    <div className="cards">
                                        <CardClient nome={client.nome} endereco={client.endereco} telefone={client.telefone} id={client._id} data={client.date ? client.date : "" } hora={client.hora ? client.hora : "" } />
                                        <Link className="btn" to={`/clients/${client._id}`}>Alterar <BsPencilFill/></Link>
                                    </div>
                                </>
                            ))}
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default Clients