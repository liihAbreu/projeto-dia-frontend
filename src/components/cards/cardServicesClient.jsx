import moment from 'moment'

//Components
import {BsCalendar3, BsCheckCircle} from "react-icons/bs"

//Bootstrap
import Card from 'react-bootstrap/Card';

const CardServicesClient = ({descricao, valorTotal, dataFinish}) => {
    return (
        <>
            <Card>
                <Card.Header>
                    <h3 >
                        <span><BsCheckCircle/></span> 
                        Finalizado
                    </h3>
                    <h3>
                        <span><BsCalendar3/></span>
                        {moment(dataFinish).format("DD/MM/YYYY")}
                    </h3>
                </Card.Header>
                <Card.Body>
                    <h4>Tipo de Serviço:</h4>
                    <p> {descricao} </p>
                    <h4>Valor Total:</h4>
                    <p>R$ {valorTotal} </p>                   
                </Card.Body>
            </Card>
        </>
    )
}

export default CardServicesClient