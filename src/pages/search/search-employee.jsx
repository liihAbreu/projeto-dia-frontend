//css
import "../../assets/styles/pages/search.sass"

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
import CardEmployee from "../../components/cards/cardEmployee"
import {BsBoxArrowRight, BsPencilFill} from "react-icons/bs"
import Breadcrumbs from "../../components/breadcrumbs/breadcrumbs";

//Redux
import { searchEmployee } from "../../slices/userSlice"

const SearchEmployee = () => {
    const query = useQuery()
    const search = query.get("q")
    const dispatch = useDispatch()
    const {users, loading} = useSelector((state) => state.user)

    //Load employee
    useEffect(() => {
        dispatch(searchEmployee(search))
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
                            <h2 className="mb-5">Você esta buscando por: {search} </h2>
                            {users && users.map((user) => (
                                <div className="cards" key={user._id}>
                                    <CardEmployee name={user.name} email={user.email} perfil={user.perfil} id={user._id} />
                                    <Link className="btn btn-alter" to={`/users/${user._id}`}>Alterar <BsPencilFill/></Link>
                                </div>
                            ))}
                            {users && users.length === 0 && (
                                <p className="no-photos">
                                    Não foram encontrados resultados para a sua busca...
                                </p>
                            )}
                            <div className="btn-return">
                                <Link className="btn" to="/employess" >Voltar <BsBoxArrowRight/></Link>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default SearchEmployee