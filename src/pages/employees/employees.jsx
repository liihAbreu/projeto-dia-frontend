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
import CardEmployee from "../../components/cards/cardEmployee";
import Breadcrumbs from "../../components/breadcrumbs/breadcrumbs";

//Hooks
import { useState, useEffect } from 'react';
import {useSelector, useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom"

//Redux
import {getAllUsersById } from "../../slices/userSlice"

const Employess = () => {
    const [query, setQuery] = useState("")
    const {users, loading} = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()  
    const userLocal = JSON.parse(localStorage.getItem("user"))

    useEffect(() => {
        dispatch(getAllUsersById(userLocal.idMestre))
    }, [dispatch, userLocal.idMestre])

    //Buscar funcionarios
    const handleSearch = (e) => {
        e.preventDefault()
        if(query){
          return navigate(`/search/employees?q=${query}`)
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
                            <h1 className='title-main'>Buscar um Funcionário</h1>
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
                            <Link to="/employees/register" className="btn register-employees">Cadastrar Funcionário <BsPlus/></Link>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {loading && <p>Carregando...</p>}
                            {users && users.map((func) => (
                                <>
                                    <div className="cards">
                                        <CardEmployee name={func.name} email={func.email} perfil={func.perfil} id={func._id}/>
                                        <Link className="btn" to={`/users/${func._id}`}>Alterar <BsPencilFill/></Link>
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

export default Employess