import CardClient from "../../components/cards/cardClient"

//Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//Hooks
import { useEffect } from "react"
import {useSelector, useDispatch} from "react-redux"
import { useQuery } from "../../hooks/useQuery"

//Components
import { Link } from "react-router-dom"
import { BsBoxArrowRight, BsPencilFill } from "react-icons/bs"
import Breadcrumbs from "../../components/breadcrumbs/breadcrumbs";


//Redux
import {searchClient} from "../../slices/clientSlice"

const Search = () => {
    const query = useQuery()
    const search = query.get("q")
    const dispatch = useDispatch()
    const {clients, loading} = useSelector((state) => state.client)

    //Load clients
    useEffect(() => {
        dispatch(searchClient(search))
    }, [dispatch, search])


    if(loading){
        return <p>Carregando...</p>
    }

    return (
        <>
            <div className="breadcrumbs">
                <Breadcrumbs/>
            </div>
            <Container>
                <Row>
                    <Col>
                        <div id="search">
                            <h2>Você esta buscando por: {search} </h2>
                            {clients && clients.map((client) => (
                                <div className="cards" key={client._id}>
                                    <CardClient nome={client.nome} endereco={client.endereco} telefone={client.telefone} id={client._id} data={client.date ? client.date : "" } hora={client.hora ? client.hora : "" } />
                                    <Link className="btn" to={`/clients/${client._id}`}>Alterar <BsPencilFill/></Link>
                                </div>
                            ))}
                            {clients && clients.length === 0 && (
                                <p className="no-photos">
                                    Não foram encontrados resultados para a sua busca...
                                </p>
                            )}
                            <div className="btn-voltar">
                                <Link className="btn" to={`/clients/`}>Voltar <BsBoxArrowRight/></Link>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Search